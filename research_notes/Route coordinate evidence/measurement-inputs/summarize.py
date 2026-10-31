"""Rebuild derived coverage, missingness, event-duration and integrity summaries."""
import csv, hashlib, json, pathlib, re
from datetime import datetime
from retrieve import HERE, COUNTRIES, table, write

def rows(name): return list(csv.DictReader((HERE/name).open()))
def numeric(v): return bool(re.fullmatch(r'-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?',v or ''))
def per_country(name): return {r['country']:r for r in rows(name)}
dgi=per_country('dgi-country.csv');gt=per_country('govtech-indices-country.csv')
gti=per_country('govtech-items-country.csv');es=per_country('enterprise-surveys-regulations-country.csv')
esc=per_country('enterprise-surveys-country.csv');br=rows('bready-procurement-country.csv')
inv={(r['country'],r['dataset']):int(r['rows']) for r in rows('inventory-country-counts.csv')}
out=[]
for c in COUNTRIES:
    b=[r for r in br if r['country']==c]
    out.append({'country':c,'scope':'US comparator' if c=='United States' else '33-country target',
        'DGI_2025':'observed' if dgi.get(c,{}).get('DGI_2025') else 'absent in inspected workbook',
        'DGI_2023':'observed' if dgi.get(c,{}).get('DGI_2023') else 'absent in inspected workbook',
        'GovTech_2025':'observed' if c in gt else 'absent in inspected workbook',
        'BREADY_2025':'observed' if b else 'absent in inspected edition',
        'BREADY_duration_numeric_cells':sum(numeric(r['response']) for r in b if r['variable'].startswith('MCP_29')),
        'ES_latest_year':es.get(c,{}).get('year',''),
        'ES_payment_days_status':'numeric' if numeric(es.get(c,{}).get('24|bready_reg9')) else 'missing in inspected API' if c not in es else 'published n.a.',
        'ES_payment_days':es.get(c,{}).get('24|bready_reg9',''),
        'ES_tender_difficulty_status':'numeric' if numeric(esc.get(c,{}).get('26|bready_comp9')) else 'missing in inspected API' if c not in esc else 'published n.a.',
        **{k+'_matched_rows':inv.get((c,k),0) for k in ['pstw','clusters','models']}})
table('country-coverage.csv',out)

# Strictly numeric duration answers are separated from annotated or skipped answers.
dur=[]
for r in br:
    if r['variable'].startswith('MCP_29'):
        dur.append({**r,'numeric_days':r['response'] if numeric(r['response']) else '',
            'parse_status':'plain numeric expert answer' if numeric(r['response']) else 'annotated/skip response retained verbatim; not coerced'})
table('bready-duration-inputs.csv',dur)

o=json.loads((HERE/'ocds-event-sample.json').read_text());event=[]
for e in o['records']:
    a,s=e['award_date'],e['dateSigned']
    days=(datetime.fromisoformat(s.replace('Z','+00:00'))-datetime.fromisoformat(a.replace('Z','+00:00'))).days if a and s else None
    event.append({'ocid':e['ocid'],'award_id':e['award_id'],'contract_id':e['contract_id'],
        'release_date':e['release_date'],'award_date':a,'dateSigned':s,'award_to_signing_days':days,
        'chronology':'negative interval: reject pending original-source verification' if days is not None and days<0 else 'chronologically nonnegative; unverified source semantics',
        'milestones':len(e['implementation']['milestones']),
        'milestones_with_dateMet':sum(bool(m.get('dateMet')) for m in e['implementation']['milestones']),
        'transactions':len(e['implementation']['transactions']),
        'transactions_with_date':sum(bool(t.get('date')) for t in e['implementation']['transactions'])})
table('ocds-duration-audit.csv',event)
milestone_rows=[]
for e in o['records']:
    for m in e['implementation']['milestones']:
        if not m.get('dateMet'):continue
        days=(datetime.fromisoformat(m['dateMet'].replace('Z','+00:00'))-datetime.fromisoformat(e['dateSigned'].replace('Z','+00:00'))).days
        milestone_rows.append({'ocid':e['ocid'],'milestone_id':m['id'],'title':m.get('title'),
            'code':m.get('code'),'status':m['status'],'dateSigned':e['dateSigned'],
            'dueDate':m['dueDate'],'dateMet':m['dateMet'],'signing_to_dateMet_days':days,
            'chronology':'negative: exclude pending verification' if days<0 else 'nonnegative, event semantics need verification',
            'planned_equals_actual':m['dueDate']==m['dateMet']})
table('ocds-milestone-duration-audit.csv',milestone_rows)

metadata=json.loads((HERE/'enterprise-surveys-metadata.json').read_text())
metadata=[m for m in metadata if m['queryFieldName'] in {k.split('|',1)[1] for r in es.values() for k in r if '|' in k} | {'bready_comp9'}]
write('enterprise-surveys-metadata.json',metadata)
write('variable-definitions.json',{
 'DGI':{'fields':['DGI_2023','DGI_2025'],'type':'publisher composite index, not calibrated route score','unit':'publisher 0–1 index',
 'referencePeriod':'2025 DGI: 2023-01-01 through 2024-12-31, except Indonesia and Thailand: 2022-01-01 through 2023-12-31',
 'edition':'2025 DGI reported in OECD 2026 outlook; includes comparator 2023 edition','locator':'g1-2!A24:A25; row29 headers'},
 'GovTech':{'indices':{'GTMI':'GovTech Maturity Index','CGSI':'Core Government Systems Index','PSDI':'Public Service Delivery Index','DCEI':'Digital Citizen Engagement Index','GTEI':'GovTech Enablers Index'},
 'type':'publisher composite indices plus unrescaled coded survey/remote-review responses',
 'unit':'indices 0–1; other fields use item-specific codes, years, names or URLs',
 'edition':'December 2025 workbook; survey March–June 2025, validation July–October 2025',
 'definitions':'govtech-item-definitions.json',
 'coverageReconciliation':'198 country-code rows including Nicaragua placeholder with hyphens; 197 assessed economies. All 33 target countries plus US have rows.',
 'sourceMethod':'158 participating economies surveyed; 39 remotely collected. Workbook reports use of generative AI for validation and remote collection; not independent audited operational efficacy.'},
 'BREADY':{'edition':'2025 interim edition, 101 economies','definitionFile':'bready-selected-fields.json',
 'type':'expert answers (including binary regulatory provisions and durations), not transaction events',
 'durationUnit':'calendar days except MCP_29_3 labelled days',
 'numericRule':'Only plain numeric strings copied into numeric_days; annotations and Skip Logic retained without conversion',
 'dates':'Publication edition established; specific item collection dates not included in extracted answer rows'},
 'EnterpriseSurveys':{'edition':'Latest published economy wave in API at retrieval; year retained per row',
 'definitions':'enterprise-surveys-metadata.json','type':'published aggregate survey indicators; not microdata',
 'bready_reg9':'Average days to receive payment under government contract; current API code differs from older reg9',
 'limits':'API definition field returns placeholder text for some indicators; detailed denominator/SE/sample counts not returned by these endpoints. Twelve regulation indicators and one tender-difficulty index retained.',
 'missing':'n.a. is missing, never zero. UAE absent from inspected latest-economy API; this is not a claim no UAE surveys exist.'},
 'Inventories':{'type':'source-row extracts with country alias matching, no population weights','counts':'diagnostic record presence only',
 'PSTW':'All technology/status rows retained for targets, not solely operational AI',
 'Epoch':'Published inventory includes planned/existing and revisions; no deduplication or global-capacity denominator imposed',
 'aliases':'retrieve.py ALIASES; US retained only as a separately labelled comparator'},
 'OCDS':{'award_date':'awards.date for award linked through contract.awardID','dateSigned':'contracts.dateSigned',
 'release_date':'compiled release update timestamp, not event occurrence',
 'contractPeriod':'scheduled/contractual period, not proof of actual implementation completion',
 'dateMet':'milestone actual completion field; eight inspected milestones populated, all identical to their dueDate; verify reported actuals against original evidence',
 'durationRule':'ISO dateSigned minus matching awards.date; negative results flagged; no empirical probability inferred'}
})
targets=[r for r in out if r['scope']=='33-country target']
summary={
 'targetCountries':33,'USComparatorSeparate':True,
 'countryCoverage':{k:sum(r[k]=='observed' for r in targets) for k in ['DGI_2025','DGI_2023','GovTech_2025','BREADY_2025']},
 'ES_latest_countries':sum(bool(r['ES_latest_year']) for r in targets),
 'ES_numeric_payment_days_countries':sum(r['ES_payment_days_status']=='numeric' for r in targets),
 'ES_numeric_tender_difficulty_countries':sum(r['ES_tender_difficulty_status']=='numeric' for r in targets),
 'fieldCounts':{'DGI_edition_indices':2,'GovTech_composite_indices':5,'GovTech_mixed_coded_and_text_fields':len(json.loads((HERE/'govtech-item-definitions.json').read_text())),
 'BREADY_selected_expert_questions':len({r['variable'] for r in br}),'BREADY_duration_questions':5,'ES_published_indicators':len(metadata)},
 'BREADY_duration_cells':{'allIncludingUS':len(dur),'plainNumericIncludingUS':sum(bool(r['numeric_days']) for r in dur),
 'targets':sum(r['country']!='United States' for r in dur),'targetPlainNumeric':sum(r['country']!='United States' and bool(r['numeric_days']) for r in dur)},
 'inventoryRowsIncludingUS':{k:len(rows(k+'-rows.csv')) for k in ['pstw','clusters','models']},
 'inventoryTargetPresence':{k:sum(r[k+'_matched_rows']>0 for r in targets) for k in ['pstw','clusters','models']},
 'ocds':{'scanned':o['scannedFirstLines'],'contracts':len(event),'nonnegativeIntervals':sum(r['award_to_signing_days'] is not None and r['award_to_signing_days']>=0 for r in event),
 'negativeIntervals':sum(r['award_to_signing_days'] is not None and r['award_to_signing_days']<0 for r in event),
 'implementationDatedMilestones':sum(r['milestones_with_dateMet'] for r in event),
 'nonnegativeSigningToMilestone':sum(r['signing_to_dateMet_days']>=0 for r in milestone_rows),
 'negativeSigningToMilestone':sum(r['signing_to_dateMet_days']<0 for r in milestone_rows),
 'allDatedMilestonesEqualDueDate':all(r['planned_equals_actual'] for r in milestone_rows),
 'datedTransactions':sum(r['transactions_with_date'] for r in event)},
 'remainingGaps':['Raw per-question DGI questionnaire not recovered; workbook contains two composites only',
 'BREADY per-item data collection dates not present in answer extract; annotated duration responses require methodology clarification',
 'ES standard errors, respondent counts and detailed denominator definitions not supplied in fetched endpoints',
 'OCDS populated completion dates require source verification: all eight equal dueDate, three precede signing; one award-sign chronology also negative',
 'No calibrated implementation probability or cross-route causal safety effect established']}
write('summary.json',summary)
manifest=[]
for p in sorted(HERE.iterdir()):
    if p.is_file() and p.name!='manifest.json':
        b=p.read_bytes();manifest.append({'file':p.name,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)})
write('manifest.json',manifest)
print(json.dumps(summary,indent=2))
