"""Read public inputs; retain only derived facts and byte-hash receipts, not reports.

Run with installed Python. 'workbooks' mode additionally uses an already-running
Chrome CDP context and installed Playwright to retrieve a public World Bank ZIP.
No authentication, cookies, private browser content or packages are accessed.
"""
import asyncio, base64, csv, gzip, hashlib, io, json, pathlib, re, sys
import urllib.request, zipfile, xml.etree.ElementTree as ET

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OBSERVED = '2026-10-31'
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
RID = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'
routes = json.loads((ROOT / 'data/routes-quantitative.json').read_text())['routes']
COUNTRIES = sorted({c for r in routes for c in r['countries']} -
                   {'EU institutions', 'EU participating states', 'EuroHPC participating states'})
ALIASES = {'Korea': 'South Korea', 'Korea, Rep.': 'South Korea', 'Korea, Republic of': 'South Korea',
           'Czechia': 'Czech Republic', 'UK': 'United Kingdom', 'United Arab Emirates': 'UAE',
           'Viet Nam': 'Vietnam', 'United States of America': 'United States',
           'Taiwan, China': 'Taiwan', 'Turkiye': 'Türkiye', 'Turkey': 'Türkiye'}
def country(s): return ALIASES.get(s.strip(), s.strip())
def write(name, data): (HERE / name).write_text(json.dumps(data, indent=2, ensure_ascii=False)+'\n')
def table(name, rows):
    if not rows: return
    cols = list(dict.fromkeys(k for r in rows for k in r))
    with (HERE/name).open('w', newline='') as f:
        w=csv.DictWriter(f, fieldnames=cols);w.writeheader();w.writerows(rows)
def receipt(id, url, b, **extra):
    r={'id': id, 'url':url, 'retrieved':OBSERVED, 'sha256':hashlib.sha256(b).hexdigest(),
       'byteLength':len(b), 'hashScope':'complete response bytes', **extra}
    p=HERE/'receipts.json'; old=json.loads(p.read_text()) if p.exists() else []
    old=[x for x in old if x['id']!=id];old.append(r);write('receipts.json',old)
    return r
def fetch(id,url):
    with urllib.request.urlopen(url,timeout=60) as r: b=r.read();final=r.url
    receipt(id,url,b,finalUrl=final,method='Python urllib public HTTP');return b
def sheets(b):
    z=zipfile.ZipFile(io.BytesIO(b))
    shared=[''.join(s.itertext()) for s in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',NS)] if 'xl/sharedStrings.xml' in z.namelist() else []
    rels={r.attrib['Id']:r.attrib['Target'] for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
    out={}
    for s in ET.fromstring(z.read('xl/workbook.xml')).findall('m:sheets/m:sheet',NS):
        path=rels[s.attrib[RID]];path=path.lstrip('/') if path.startswith('/') else 'xl/'+path
        rows=[]
        for row in ET.fromstring(z.read(path)).findall('.//m:sheetData/m:row',NS):
            r={}
            for c in row:
                ref=c.attrib.get('r','');col=re.sub(r'\d','',ref)
                if not col:continue
                v=c.findtext('m:v','',NS);t=c.attrib.get('t')
                if t=='s' and v:v=shared[int(v)]
                elif t=='inlineStr':v=''.join(c.find('m:is',NS).itertext())
                r[col]=v
            if r:rows.append((row.attrib.get('r'),r))
        out[s.attrib['name']]=rows
    return out

def dgi():
    ss=sheets(fetch('method-input-dgi','https://stat.link/32clen'));rows=[]
    for rn,r in ss['g1-2']:
        if country(r.get('B','')) in COUNTRIES and r.get('C'):
            rows.append({'country':country(r['B']),'source_country':r['B'],'iso3':r['C'],
                         'DGI_2023':r.get('D',''),'DGI_2025':r.get('E',''),
                         'locator':f'g1-2!B{rn}:E{rn}'})
    table('dgi-country.csv',rows)
    return rows

def govtech():
    url='https://datacatalogfiles.worldbank.org/ddh-published/0037889/DR0095721/WBG_GovTech_Dataset_Dec2025.xlsx'
    ss=sheets(fetch('method-input-govtech',url))
    definitions=[]
    for rn,r in ss['Metadata']:
        if re.match(r'^I-\d',r.get('A','')) and re.search(r'cloud|procurement|data protection|privacy|artificial intelligence|incident|cybersecurity|cyber security',r.get('B',''),re.I):
            definitions.append({'variable':r['A'],'definition':r.get('B',''),'coding':r.get('C',''),'locator':f'Metadata!A{rn}:C{rn}'})
    selected={d['variable'] for d in definitions}
    raw=[];headers=ss['GTMI_Data'][0][1]
    for rn,r in ss['GTMI_Data'][1:]:
        if r.get('A')=='2025' and country(r.get('C','')) in COUNTRIES:
            out={'country':country(r['C']),'iso3':r['B'].strip(),'year':'2025','locator':f'GTMI_Data!row{rn}'}
            out.update({v:r.get(k,'') for k,v in headers.items() if v in selected});raw.append(out)
    table('govtech-items-country.csv',raw);write('govtech-item-definitions.json',definitions)
    groups=[]
    for rn,r in ss['GTMI_Groups'][1:]:
        if r.get('A')=='2025' and country(r.get('C','')) in COUNTRIES:
            groups.append({'country':country(r['C']),'iso3':r['B'].strip(),'year':'2025',
                **{k:r.get(c,'') for k,c in [('GTMI','E'),('CGSI','G'),('PSDI','I'),('DCEI','K'),('GTEI','M')]},'locator':f'GTMI_Groups!row{rn}'})
    table('govtech-indices-country.csv',groups)
    # Only short source/coding notes, not the complete README/report.
    notes=[{'locator':f'README!row{rn}','text':' '.join(r.values())} for rn,r in ss['README'] if re.search(r'197|198|survey|June|December|July|September|November', ' '.join(r.values()),re.I)]
    write('govtech-extraction-notes.json',{'raw2025Economies':len({r.get('B','').strip() for _,r in ss['GTMI_Data'] if r.get('A')=='2025' and len(r.get('B','').strip())==3}),
        'group2025Economies':len({r.get('B','').strip() for _,r in ss['GTMI_Groups'] if r.get('A')=='2025' and len(r.get('B','').strip())==3}), 'notes':notes[:5]})

def inventories():
    specs=[('pstw','https://interoperable-europe.ec.europa.eu/sites/default/files/custom-page/attachment/2026-09/pstw_dataset.csv',
        'Geographical coverage (country)',['PSTW ID','Name','Geographical coverage (country)','Responsible organisation',' Status','Start Year','End Year','Primary Technology','Source','Date updated']),
      ('clusters','https://epoch.ai/data/gpu_clusters.csv','Country',
        ['Name','Country','Owner','Status','First Operational Date','H100 equivalents','Possible Duplicate','Possible Duplicate Of','Superseded by','Decommissioned Date (if applicable)','Include in Standard Analysis','Source 1']),
      ('models','https://epoch.ai/data/notable_ai_models.csv','Country (of organization)',
        ['Model','Country (of organization)','Organization','Publication date','Confidence','Frontier model','Base model','Training compute (FLOP)','Link'])]
    counts=[]
    for id,url,cf,fields in specs:
        rows=list(csv.DictReader(io.StringIO(fetch('method-input-'+id,url).decode('utf-8-sig'))));derived=[]
        for i,r in enumerate(rows,2):
            cs={country(s) for s in re.split(r',|;',r.get(cf,''))} if id=='models' else {country(r.get(cf,''))}
            matches=sorted(cs.intersection(COUNTRIES))
            if matches:derived.append({'matched_route_countries':';'.join(matches),'source_row':i,**{k:r.get(k,'') for k in fields}})
        table(id+'-rows.csv',derived)
        for c in COUNTRIES:counts.append({'country':c,'dataset':id,'rows':sum(c in r['matched_route_countries'].split(';') for r in derived),'interpretation':'matched disclosure records, not population/adoption or safety denominator'})
    table('inventory-country-counts.csv',counts)

def surveys():
    u='https://extdataportal.worldbank.org/api/esapi/GetTopicIndicatorData/topicid/26/subtopicid/58/regionid/0/cutsId/-1/colstartindex/0?lang=en'
    d=json.loads(fetch('method-input-es-public-procurement',u));print('ES structure',{k:(len(v),str(v[:1])[:2000]) if isinstance(v,list) else str(v)[:300] for k,v in d.items()})
    rows=[]
    for r in d.get('table1',[]):
        if country(r.get('economy','')) in COUNTRIES and r.get('isLatestYear')==1 and r.get('economyType')=='Economy':
            rows.append({'country':country(r['economy']),**r})
    table('enterprise-surveys-country.csv',rows)
    # Keep metadata defining the published variables, not repeated global values.
    definitions=[]
    for tid in [24,26]:
        url=f'https://extdataportal.worldbank.org/api/esapi/GetEconomyIndicatorData/economyid/20/topicid/{tid}/year/2025?lang=en'
        defs=json.loads(fetch('method-input-es-definitions-'+str(tid),url))
        definitions += [{k:r.get(k) for k in ['indicatorId','indicator','queryFieldName','unit','subtopicID','indicatorDefinition']} for r in defs]
    write('enterprise-surveys-metadata.json',[r for r in definitions if r['queryFieldName']=='bready_comp9' or r in definitions[:12]])
    url='https://extdataportal.worldbank.org/api/esapi/GetTopicIndicatorData/topicid/24/subtopicid/0/regionid/0/cutsId/-1/colstartindex/0?lang=en'
    d=json.loads(fetch('method-input-es-regulations',url)); out=[]
    for r in d.get('table1',[]):
        if country(r.get('economy','')) in COUNTRIES and r.get('isLatestYear')==1 and r.get('economyType')=='Economy':
            out.append({'country':country(r['economy']),'year':r['year'],'economyId':r['economyId'],
                        **{k:v for k,v in r.items() if '|' in k}})
    table('enterprise-surveys-regulations-country.csv',out)

async def workbooks():
    from playwright.async_api import async_playwright
    u='https://www.worldbank.org/content/dam/sites/b-ready/documents/excel/B-READY_ALL_DATA_2025.zip'
    async with async_playwright() as p:
        b=await p.chromium.connect_over_cdp('http://localhost:9222');page=await b.contexts[0].new_page()
        try:
            await page.goto('https://www.worldbank.org/en/businessready/publications',wait_until='domcontentloaded')
            x=await page.evaluate("""async u=>{let r=await fetch(u),a=new Uint8Array(await r.arrayBuffer()),s='';for(let i=0;i<a.length;i+=32768)s+=String.fromCharCode(...a.subarray(i,i+32768));return {status:r.status,data:btoa(s)}}""",u)
            assert x['status']==200
            data=base64.b64decode(x['data']);receipt('method-input-bready-zip',u,data,method='public browser fetch via existing CDP context')
            z=zipfile.ZipFile(io.BytesIO(data));n='02_B-READY-2025-EconomyAnswer.xlsx';bb=z.read(n);ss=sheets(bb)
            receipt('method-input-bready-answers',u,bb,hashScope='uncompressed ZIP member bytes',member=n)
            print('BREADY SHEETS',[(k,len(v)) for k,v in ss.items()])
            for k,rs in ss.items():
                if 'Market' in k or 'MC'==k or 'Competition' in k:
                    print('BREADY TARGET',k)
                    for rn,r in rs[:6]:print(rn,str(r)[:8000])
                    write('bready-extraction-inspection.json',{'sheet':k,'headerRows':[{'row':rn,'cells':r} for rn,r in rs[:4]]})
                    defs={r.get('B'):r.get('C') for _,r in rs if r.get('B','').startswith('MCP')}
                    print('PROCUREMENT DEFINITIONS',json.dumps(defs,ensure_ascii=False))
                    selected={v for v,q in defs.items() if re.search(r'days|time|payment|sign|award|electronic|implement|complaint',q,re.I)}
                    rr=[]
                    for rn,r in rs:
                        if country(r.get('A','')) in COUNTRIES and r.get('B') in selected:
                            rr.append({'country':country(r['A']),'variable':r['B'],'response':r.get('D',''),'data_source':r.get('E',''),'locator':f'{k}!B{rn}:E{rn}'})
                    table('bready-procurement-country.csv',rr)
                    write('bready-selected-fields.json',[{'variable':v,'definition':defs[v]} for v in sorted(selected)])
                    write('bready-country-coverage.json',{'countries':sorted({country(r.get('A','')) for _,r in rs[1:]}),'edition':'2025','sheet':k})
        finally:await page.close()

def ocds():
    u='https://data.open-contracting.org/en/publication/64/download?name=2025.jsonl.gz'
    with urllib.request.urlopen(u,timeout=60) as response:
        f=gzip.GzipFile(fileobj=response);raw=[];events=[];scanned=0
        for i in range(500):
            line=f.readline()
            if not line:break
            raw.append(line);r=json.loads(line);scanned+=1
            if r.get('awards') or r.get('contracts'):
                for c in r.get('contracts',[]) or [{}]:
                    awards=r.get('awards',[]);a=next((a for a in awards if str(a.get('id'))==str(c.get('awardID'))),{})
                    events.append({'ocid':r['ocid'],'release_date':r.get('date'),'buyer':r.get('buyer',{}).get('name'),
                        'award_id':a.get('id'),'award_date':a.get('date'),'contract_id':c.get('id'),
                        'awardID':c.get('awardID'),'dateSigned':c.get('dateSigned'),'contractStatus':c.get('status'),
                        'contractPeriod':c.get('period'),'implementation':{k:c.get('implementation',{}).get(k) for k in ['milestones','transactions']},
                        'all_award_dates':[{'id':a.get('id'),'date':a.get('date')} for a in awards]})
            if len(events)>=12:break
    receipt('method-input-ocds-sample',u,b''.join(raw),hashScope='concatenated first N decompressed JSONL lines, not complete gzip',lines=scanned,method='streamed public gzip')
    # Reduce implementation records to date/status fields; avoid retaining narrative reports.
    for e in events:
        imp=e['implementation']
        imp['milestones']=[{k:m.get(k) for k in ['id','title','code','type','status','dueDate','dateMet','dateModified']} for m in imp.get('milestones') or []]
        imp['transactions']=[{k:t.get(k) for k in ['id','date','value']} for t in imp.get('transactions') or []]
    write('ocds-event-sample.json',{'scannedFirstLines':scanned,'sampling':'first 500 at most, stop after at least 12 award/contract records; not random', 'records':events})

if __name__=='__main__':
    modes=sys.argv[1:] or ['dgi','govtech','inventories','surveys','ocds']
    for mode in modes:
        if mode=='workbooks':asyncio.run(workbooks())
        else:globals()[mode]()
