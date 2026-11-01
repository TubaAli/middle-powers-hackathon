"""Create the initial native Google Docs drafts in the authorised team folder.

Run with Sava's existing Python environment and approved Workspace bindings.
Stops if a same-name draft exists: subsequent edits must keep the existing ID.
"""
import json
import os
import re
from pathlib import Path

from sava.capabilities.gdocs import _drive_service, _docs_service

ROOT = Path(__file__).resolve().parent
FOLDER = os.environ['HACKATHON_DRAFT_FOLDER_ID']
DRAFTS = [
    ('submission-draft.md', 'DRAFT - Before Geneva - Hackathon submission'),
    ('demo-video-script.md', 'DRAFT - Before Geneva - Demo video script'),
]


def length(text):
    return len(text.encode('utf-16-le')) // 2


def main():
    drive, docs = _drive_service(), _docs_service()
    files = drive.files().list(
        q=f"'{FOLDER}' in parents and trashed=false",
        fields='files(id,name),nextPageToken', pageSize=100,
    ).execute()
    if files.get('nextPageToken'):
        raise RuntimeError('Folder listing requires pagination; stop before creating files.')
    existing = {x['name'] for x in files['files']}
    if any(title in existing for _, title in DRAFTS):
        raise RuntimeError('Draft already exists. Update its existing document instead.')

    receipts = []
    for filename, title in DRAFTS:
        text, headings, position = '', [], 1
        for line in (ROOT / filename).read_text().splitlines():
            style = None
            if line.startswith('# '):
                line, style = line[2:], 'TITLE'
            elif line.startswith('## '):
                line, style = line[3:], 'HEADING_1'
            line += '\n'
            if style:
                headings.append((position, position + length(line), style))
            text += line
            position += length(line)

        created = drive.files().create(
            body={'name': title, 'mimeType': 'application/vnd.google-apps.document',
                  'parents': [FOLDER]},
            fields='id,name,webViewLink,parents', supportsAllDrives=True,
        ).execute()
        doc_id = created['id']
        # Record each created ID before editing, so a failure cannot hide a draft.
        receipts.append(created)
        (ROOT / 'drive-receipt.json').write_text(json.dumps(receipts, indent=2) + '\n')
        revision = docs.documents().get(documentId=doc_id).execute()['revisionId']
        requests = [
            {'insertText': {'location': {'index': 1}, 'text': text}},
            {'updateTextStyle': {
                'range': {'startIndex': 1, 'endIndex': position},
                'textStyle': {'weightedFontFamily': {'fontFamily': 'Arial'},
                              'fontSize': {'magnitude': 11, 'unit': 'PT'}},
                'fields': 'weightedFontFamily,fontSize',
            }},
        ]
        for start, end, style in headings:
            requests.append({'updateParagraphStyle': {
                'range': {'startIndex': start, 'endIndex': end},
                'paragraphStyle': {'namedStyleType': style, 'keepWithNext': True},
                'fields': 'namedStyleType,keepWithNext',
            }})
        for match in re.finditer(r'https://\S+', text):
            url = match.group().rstrip('.')
            start = 1 + length(text[:match.start()])
            requests.append({'updateTextStyle': {
                'range': {'startIndex': start, 'endIndex': start + length(url)},
                'textStyle': {'link': {'url': url}}, 'fields': 'link',
            }})
        docs.documents().batchUpdate(documentId=doc_id, body={
            'writeControl': {'requiredRevisionId': revision}, 'requests': requests,
        }).execute()
        result = docs.documents().get(documentId=doc_id).execute()
        paragraphs = [x['paragraph'] for x in result['body']['content'] if 'paragraph' in x]
        actual = ''.join(e.get('textRun', {}).get('content', '')
                         for p in paragraphs for e in p['elements'])
        assert actual.rstrip() == text.rstrip(), 'Read-back text mismatch'
        actual_headings = sum(p.get('paragraphStyle', {}).get('namedStyleType')
                              in ['TITLE', 'HEADING_1'] for p in paragraphs)
        assert actual_headings == len(headings), 'Heading styles mismatch'
        meta = drive.files().get(fileId=doc_id, fields='id,parents,permissions(type,role,emailAddress)',
                                 supportsAllDrives=True).execute()
        assert FOLDER in meta['parents']
        created['verified'] = {'text': True, 'headings': actual_headings,
                               'folder': True, 'characters': len(text)}
        (ROOT / 'drive-receipt.json').write_text(json.dumps(receipts, indent=2) + '\n')
        print(json.dumps(created))


if __name__ == '__main__':
    main()
