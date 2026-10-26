const state = { data: null, page: 'overview', search: '', sourceFilter: 'all', claimFilter: 'all', articleSlug: null, entityId: null, theme: localStorage.getItem('gmr-theme') || 'light' };
const app = document.querySelector('#app');
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function esc(value = '') { return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;'); }
function norm(value) { return String(value ?? '').toLocaleLowerCase(); }
function searchMatch(...values) { if (!state.search.trim()) return true; const q = norm(state.search.trim()); return values.flat(Infinity).some(v => norm(v).includes(q)); }
function byId(list, key, value) { return list.find(item => item[key] === value); }
function sourcesFor(ids = []) { return ids.map(id => byId(state.data.sources, 'source_id', id)).filter(Boolean); }
function claimsFor(ids = []) { return ids.map(id => byId(state.data.claims, 'claim_id', id)).filter(Boolean); }
function statusClass(status = '') { const s = status.toLowerCase(); if (s.includes('conflict')) return 'conflicted'; if (s.includes('unknown')) return 'unknown'; if (s.includes('community') || s.includes('taxonomy')) return 'community'; if (s.includes('lead')) return 'lead'; if (s.includes('verified')) return 'verified'; if (s === 'extracted') return 'extracted'; return ''; }
function badge(status, cls = statusClass(status)) { return `<span class="status-pill ${cls}">${esc(String(status).replaceAll('_',' '))}</span>`; }
function pageHeader(eyebrow, title, description = '') { return `<div class="page-wrap"><div class="hero hero-small"><div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1>${description ? `<p>${esc(description)}</p>` : ''}</div></div>`; }
function sourceCountByState() { return state.data.sources.reduce((out, source) => { out[source.research_state] = (out[source.research_state] || 0) + 1; return out; }, {}); }
function gapCount() { return state.data.gaps.filter(g => ['OPEN','CONFLICTED'].includes(g.state)).length; }

function renderOverview() {
  const d = state.data;
  const stateCounts = sourceCountByState();
  const extracted = stateCounts.EXTRACTED || 0;
  const readyArticles = d.articles.filter(a => ['RECONCILED_FIRST_PASS','READY_FOR_SITE','RESEARCH_LEAD_REGISTERED'].includes(a.research_status)).length;
  const slotConflict = d.claims.filter(c => c.attribute_path === 'unit_slots.general_max');
  const routeConflict = d.claims.filter(c => c.status === 'CONFLICTED_SCOPE_DISTINCT_ROUTES');
  const gaps = d.gaps.slice(0,3);
  const rows = ['EXTRACTED','REVIEWED','DISCOVERED','RECONCILED','PUBLISHED'].filter(s => (stateCounts[s] || 0) > 0).map(status => {
    const count = stateCounts[status]; const width = d.sources.length ? Math.round(count / d.sources.length * 100) : 0;
    return `<div class="progress-row"><div class="progress-label"><i class="progress-swatch"></i>${esc(status.toLowerCase())}</div><div class="track"><div class="fill" style="width:${width}%"></div></div><div class="progress-count">${count} / ${d.sources.length}</div></div>`;
  }).join('');
  const conflictCards = [
    ...(slotConflict.length ? [{title:'General slot maximum',text:'Official guide: 7. Community reference: 8. Current cap needs patch evidence.',tag:'CONFLICTED'}] : []),
    ...(routeConflict.length ? [{title:'Starting quest route',text:'Official Hanyang I Yul-bok sequence and Beginner Camp walkthrough are not yet reconciled.',tag:'ROUTE GAP'}] : [])
  ];
  return `${pageHeader('Research ledger / 01','A living map of GeoSang','A Korean-first reference for the systems behind The Great Merchant — built from guides, official tables and patch-aware evidence.')}
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-label">Guide sources</div><div class="kpi-value">${d.sources.length}</div><div class="kpi-note">${extracted} extracted · ${stateCounts.REVIEWED || 0} reviewed</div></div>
      <div class="kpi"><div class="kpi-label">Site articles</div><div class="kpi-value">${readyArticles}</div><div class="kpi-note">Evidence-backed pages published</div></div>
      <div class="kpi"><div class="kpi-label">Evidence claims</div><div class="kpi-value">${d.claims.length}</div><div class="kpi-note">${d.claims.filter(c => c.status.includes('CONFLICT')).length} conflicts · ${d.claims.filter(c => c.status === 'UNKNOWN').length} unknowns</div></div>
      <div class="kpi alert"><div class="kpi-label">Open gaps</div><div class="kpi-value">${gapCount()}</div><div class="kpi-note">P0 queue · source universe not defined</div></div>
    </div>
    <div class="section-heading"><div><h2>Evidence coverage</h2><p>Counts come from registered source states; percentages are not shown because the P0 source universe is unknown.</p></div><span class="section-label">${d.entities.length} entities indexed</span></div>
    <div class="overview-grid">
      <section class="panel"><div class="panel-title"><div><h3>Source review states</h3><p>One row per canonical source record</p></div><span class="mini-label">${d.sources.length} TOTAL</span></div><div class="source-progress">${rows}</div><div class="denominator">OVERALL COMPLETION: NOT MEASURED · GUIDE INDEXES ARE NOT COUNTED AS FACT CONFIRMATION</div></section>
      <section class="panel"><div class="panel-title"><div><h3>Needs reconciliation</h3><p>Visible contradictions and route differences</p></div><span class="mini-label">${conflictCards.length} ITEMS</span></div><div class="signal-list">${conflictCards.map(c => `<div class="signal"><strong>${esc(c.title)}</strong><p>${esc(c.text)}</p><span class="tag amber">${esc(c.tag)}</span></div>`).join('') || `<div class="empty-state"><strong>No open conflicts</strong><p>New evidence will appear here.</p></div>`}</div></section>
    </div>
    <div class="section-heading"><div><h2>Next research passes</h2><p>Guide-first work still open in the P0 backlog</p></div><button class="text-link" data-go="gaps">View all gaps →</button></div>
    <div class="backlog-grid">${gaps.map((g,i) => `<div class="backlog-card"><div class="backlog-num">0${i+1}</div><div><h4>${esc(g.topic)}</h4><p>${esc(g.description)}</p></div></div>`).join('')}</div>
    <div class="callout" style="margin-top:14px"><strong>Research boundary:</strong> Korea is canonical. Guide facts without a patch stamp stay marked UNKNOWN; current community build recommendations are not treated as official mechanics. No third-party screenshots, client files, music or other media are stored.</div>
  </div>`;
}

function renderArticleList() {
  const articles = state.data.articles.filter(a => searchMatch(a.title,a.title_original,a.summary,a.source_ids,a.claim_ids));
  return `${pageHeader('Knowledge base / 02','Guide encyclopedia','Reader-first dossiers that synthesize guide sections into linked claims, source records and explicit unknowns.')}
    <div class="filter-row"><select class="filter-select" id="article-priority"><option value="all">All priorities</option><option value="P0">P0</option></select><span class="result-count">${articles.length} ARTICLES IN THIS BUILD</span></div>
    ${articles.length ? `<div class="card-grid">${articles.map(article => `<article class="article-card"><div class="article-card-top"><span class="tag green">${esc(article.priority)}</span>${badge(article.research_status)}</div><h3>${esc(article.title)}</h3><div class="original">${esc(article.title_original)}</div><p>${esc(article.summary)}</p><div class="card-meta"><span>${article.claim_ids.length} claims</span><span>${article.source_ids.length} sources</span><button class="text-link" data-article="${esc(article.slug)}">Open dossier →</button></div></article>`).join('')}</div>` : `<div class="empty-state"><strong>No matching article</strong><p>Try a Korean alias, topic or source ID.</p></div>`}
  </div>`;
}

function inlineMd(value) {
  let safe = esc(value);
  safe = safe.replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');
  safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return safe;
}
function renderMarkdown(markdown) {
  const text = markdown.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^\s*# [^\n]+\n/, '').replace(/\r/g,'');
  const lines = text.split('\n'); let html = ''; let paragraph = []; let list = null; let table = [];
  const flushParagraph = () => { if (paragraph.length) { html += `<p>${inlineMd(paragraph.join(' '))}</p>`; paragraph = []; } };
  const flushList = () => { if (list) { html += `<${list.type}>${list.items.map(item=>`<li>${inlineMd(item)}</li>`).join('')}</${list.type}>`; list = null; } };
  const flushTable = () => { if (!table.length) return; const rows = table.map(line => line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim())); const dataRows=rows.filter(row=>!row.every(cell=>/^:?-{3,}:?$/.test(cell))); if(dataRows.length){html += `<table><thead><tr>${dataRows[0].map(cell=>`<th>${inlineMd(cell)}</th>`).join('')}</tr></thead><tbody>${dataRows.slice(1).map(row=>`<tr>${dataRows[0].map((_,i)=>`<td>${inlineMd(row[i]||'')}</td>`).join('')}</tr>`).join('')}</tbody></table>`;} table=[]; };
  for (let i=0;i<lines.length;i++) {
    const line=lines[i];
    if (line.trim().startsWith('|')) { flushParagraph(); flushList(); table.push(line); continue; } else flushTable();
    if (!line.trim()) { flushParagraph(); flushList(); continue; }
    const heading=line.match(/^(#{1,6})\s+(.*)$/); if(heading){flushParagraph();flushList();const level=Math.min(heading[1].length+1,6);html+=`<h${level}>${inlineMd(heading[2])}</h${level}>`;continue;}
    if (/^---+$/.test(line.trim())) { flushParagraph();flushList();html+='<hr>';continue; }
    const quote=line.match(/^>\s?(.*)$/); if(quote){flushParagraph();flushList();html+=`<blockquote>${inlineMd(quote[1])}</blockquote>`;continue;}
    const ordered=line.match(/^\s*\d+\.\s+(.*)$/); const unordered=line.match(/^\s*[-*]\s+(.*)$/);
    if(ordered||unordered){flushParagraph();const type=ordered?'ol':'ul';if(list&&list.type!==type)flushList();if(!list)list={type,items:[]};list.items.push((ordered||unordered)[1]);continue;}
    flushList(); paragraph.push(line.trim());
  }
  flushParagraph();flushList();flushTable();return html;
}
async function renderArticle(slug) {
  const article=byId(state.data.articles,'slug',slug); if(!article){app.innerHTML=`<div class="page-wrap"><div class="empty-state"><strong>Article not found</strong><p>Choose an article from the encyclopedia.</p></div></div>`;return;}
  app.innerHTML=`<div class="page-wrap"><button class="back-button" data-page="articles">← BACK TO ENCYCLOPEDIA</button><div class="article-layout"><article class="article-body"><div class="eyebrow">${esc(article.priority)} / FIRST-PASS SYNTHESIS</div><h1>${esc(article.title)}</h1><div class="original">${esc(article.title_original)} · checked ${esc(article.last_reviewed)}</div><div class="article-content"><div class="loading">Opening dossier…</div></div></article><aside class="article-aside"><section class="panel"><div class="panel-title"><div><h3>Evidence sources</h3><p>${article.source_ids.length} linked records</p></div></div><div class="source-link-list">${sourcesFor(article.source_ids).map(s=>`<a class="source-link" href="${esc(s.canonical_url)}" target="_blank" rel="noopener noreferrer"><strong>${esc(s.title)}</strong><small>${esc(s.source_id)} · ${esc(s.research_state)} · ${esc(s.patch_id)}</small></a>`).join('')}</div></section><section class="panel"><div class="panel-title"><div><h3>Claims in this dossier</h3><p>${article.claim_ids.length} linked claim records</p></div></div><div class="claim-list">${claimsFor(article.claim_ids).slice(0,10).map(c=>`<div class="claim-mini"><strong>${esc(c.claim_id)} · ${esc(c.status)}</strong><span>${esc(c.statement)}</span></div>`).join('')}${article.claim_ids.length>10?`<button class="text-link" data-page="evidence">Open all claims →</button>`:''}</div></section><section class="panel"><div class="panel-title"><div><h3>Research state</h3><p>Draft status, not a verified current game build</p></div></div><div style="margin-top:12px">${badge(article.research_status)}</div><p style="font-size:10px;color:#8b9691;margin:10px 0 0">Patch context: ${esc(article.patch_id || 'UNKNOWN')}</p></section></aside></div></div>`;
  try { let markdown=state.data.article_bodies?.[slug]; if(!markdown){const response=await fetch(`./data/articles/${encodeURIComponent(slug)}.md`); if(!response.ok)throw new Error('Article body unavailable'); markdown=await response.text();} const content=$('.article-content'); if(content)content.innerHTML=renderMarkdown(markdown); }
  catch { const content=$('.article-content');if(content)content.innerHTML='<div class="empty-state"><strong>Dossier body unavailable</strong><p>Refresh the site after the next build.</p></div>'; }
}

function renderEntities() {
  if(state.entityId) return renderEntityDetail(state.entityId);
  const entities=state.data.entities.filter(e=>searchMatch(e.entity_id,e.entity_type,e.canonical_korean_name,e.english_name,e.aliases));
  return `${pageHeader('Index / 03','Entity atlas','Stable IDs link Korean names, aliases, claims and source records. A type is an organizing key, not a claim that every relationship is complete.')}
    <div class="filter-row"><span class="tag blue">${state.data.entities.length} indexed entities</span><span class="result-count">${entities.length} MATCHING THIS VIEW</span></div>
    ${entities.length?`<div class="entity-grid">${entities.map(e=>`<article class="entity-card" data-entity="${esc(e.entity_id)}"><div class="entity-id">${esc(e.entity_id)}</div><h3>${esc(e.canonical_korean_name)}</h3><div class="alias">${esc(e.english_name)}</div><div class="entity-card-foot"><span>${esc(e.entity_type.replaceAll('_',' '))}</span><span>${e.source_ids.length} sources →</span></div></article>`).join('')}</div>`:`<div class="empty-state"><strong>No matching entity</strong><p>Try a Korean name, English alias or entity ID.</p></div>`}
  </div>`;
}
function renderEntityDetail(entityId) {
  const entity=byId(state.data.entities,'entity_id',entityId);if(!entity)return renderEntities();
  const claims=state.data.claims.filter(c=>c.entity_id===entityId);
  return `${pageHeader('Entity record / 03',entity.canonical_korean_name,`${entity.english_name} · ${entity.entity_type.replaceAll('_',' ')}`)}<div class="page-wrap" style="padding-top:0"><button class="back-button" data-page="entities">← BACK TO ENTITY ATLAS</button><div class="overview-grid"><section class="panel"><div class="panel-title"><div><h3>Identity</h3><p>${esc(entity.entity_id)}</p></div></div><p style="font-size:12px;color:#70807a">Aliases: ${entity.aliases.map(esc).join(' · ')}</p><div class="section-label">Linked source records</div><div class="source-link-list">${sourcesFor(entity.source_ids).map(s=>`<a class="source-link" href="${esc(s.canonical_url)}" target="_blank" rel="noopener noreferrer"><strong>${esc(s.title)}</strong><small>${esc(s.source_id)} · ${esc(s.research_state)}</small></a>`).join('')}</div></section><section class="panel"><div class="panel-title"><div><h3>Linked evidence</h3><p>${claims.length} claim records</p></div></div><div class="claim-list">${claims.map(c=>`<div class="claim-mini"><strong>${esc(c.claim_id)} · ${esc(c.status)}</strong><span>${esc(c.statement)}</span></div>`).join('')||'<div class="empty-state"><strong>No claims yet</strong><p>Relationships are added as guides are processed.</p></div>'}</div></section></div></div></div>`;
}

function renderSources() {
  const states=[...new Set(state.data.sources.map(s=>s.research_state))].sort();
  const sources=state.data.sources.filter(s=>(state.sourceFilter==='all'||s.research_state===state.sourceFilter)&&searchMatch(s.source_id,s.title,s.title_original,s.author,s.canonical_url,s.topics,s.patch_id,s.review_scope));
  return `${pageHeader('Provenance / 04','Source registry','Guide-first discovery and reading state. A source enters “extracted” only when the reviewed section has been synthesized into claim records.')}
    <div class="filter-row"><select class="filter-select" id="source-filter"><option value="all">All reading states</option>${states.map(s=>`<option value="${esc(s)}" ${state.sourceFilter===s?'selected':''}>${esc(s)}</option>`).join('')}</select><span class="result-count">${sources.length} / ${state.data.sources.length} SOURCE RECORDS</span></div>
    ${sources.length?`<div class="data-table-wrap"><table class="data-table"><thead><tr><th>Source</th><th>Language / type</th><th>Server / patch</th><th>Research state</th><th>Reading scope</th></tr></thead><tbody>${sources.map(s=>`<tr><td><strong><a href="${esc(s.canonical_url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a></strong><span class="small">${esc(s.source_id)} · ${esc(s.title_original || '')}</span><span class="small">${esc(s.author || 'Author unknown')} · ${esc(s.publication_date || 'date unknown')}</span></td><td>${esc(s.language)}<span class="small">${esc(s.source_type.replaceAll('_',' '))}</span></td><td>${esc(s.game_server)}<span class="small">${esc(s.patch_id)}</span></td><td>${badge(s.research_state)}</td><td>${esc(s.review_scope)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty-state"><strong>No source matches</strong><p>Clear a filter or search for a topic, author or source ID.</p></div>`}
  </div>`;
}

function renderEvidence() {
  const statuses=[...new Set(state.data.claims.map(c=>c.status))].sort();
  const claims=state.data.claims.filter(c=>(state.claimFilter==='all'||c.status===state.claimFilter)&&searchMatch(c.claim_id,c.entity_id,c.attribute_path,c.statement,c.scope?.patch_id,c.scope?.conditions));
  return `${pageHeader('Evidence ledger / 05','Claims & evidence','Atomic statements keep server, patch, conditions, source sections and confidence separate. Unknowns are searchable records too.')}
    <div class="filter-row"><select class="filter-select" id="claim-filter"><option value="all">All claim statuses</option>${statuses.map(s=>`<option value="${esc(s)}" ${state.claimFilter===s?'selected':''}>${esc(s.replaceAll('_',' '))}</option>`).join('')}</select><span class="result-count">${claims.length} / ${state.data.claims.length} CLAIMS</span></div>
    ${claims.length?`<div class="data-table-wrap"><table class="data-table"><thead><tr><th>Claim / entity</th><th>Statement</th><th>Patch scope</th><th>Status</th><th>Evidence</th></tr></thead><tbody>${claims.map(c=>`<tr><td><strong>${esc(c.claim_id)}</strong><span class="small">${esc(c.entity_id)}<br>${esc(c.attribute_path)}</span></td><td>${esc(c.statement)}<span class="small">${esc(c.scope?.conditions||'')}</span></td><td>${esc(c.scope?.server||'Unknown')}<span class="small">${esc(c.scope?.patch_id||'UNKNOWN')}</span></td><td>${badge(c.status)}</td><td>${c.evidence_refs.map(ref=>{const src=byId(state.data.sources,'source_id',ref.source_id);return src?`<a href="${esc(ref.url||src.canonical_url)}" target="_blank" rel="noopener noreferrer">${esc(ref.source_id)} ↗</a><span class="small">${esc(ref.section||'source page')}</span>`:''}).join('')}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty-state"><strong>No matching claims</strong><p>Try an entity ID or status.</p></div>`}
  </div>`;
}

function renderGaps() {
  const gaps=state.data.gaps.filter(g=>searchMatch(g.topic,g.description,g.priority,g.state,g.source_ids));
  return `${pageHeader('Research queue / 06','Gaps & conflicts','Unresolved questions stay visible so a reader can see what the current evidence cannot support.')}
    <div class="filter-row"><span class="tag amber">${gapCount()} open or conflicted</span><span class="result-count">${gaps.length} / ${state.data.gaps.length} TRACKED GAPS</span></div>
    <div class="gap-list">${gaps.map(g=>`<article class="gap-card"><div class="gap-priority">${esc(g.priority)}</div><div><h3>${esc(g.topic)}</h3><p>${esc(g.description)}</p><div class="gap-links">SOURCES: ${g.source_ids.map(id=>`<button class="text-link" data-source-filter="${esc(id)}">${esc(id)}</button>`).join(' · ')}</div></div>${badge(g.state,g.state==='CONFLICTED'?'conflicted':'unknown')}</article>`).join('')}</div>
    <div class="callout" style="margin-top:14px">No percentages are reported for the research backlog because the complete P0 guide universe has not been enumerated.</div>
  </div>`;
}

function renderAudio() {
  const entries=state.data.audio||[];
  const leads=entries.filter(a=>searchMatch(a.title_original,a.title_translation,a.context,a.composition_brief,a.source_ids));
  const concertCount=entries.filter(a=>a.confidence==='CONCERT_PROGRAM_METADATA').length;
  const leadCount=entries.filter(a=>a.confidence==='LEAD_ONLY').length;
  const verifiedCount=entries.filter(a=>a.confidence==='VERIFIED_MAPPING').length;
  const cards=leads.map(a=>{
    const confidence=a.confidence==='CONCERT_PROGRAM_METADATA'?'CONCERT METADATA':String(a.confidence||'UNKNOWN').replaceAll('_',' ');
    const sourceLinks=sourcesFor(a.source_ids).map(src=>`<a href="${esc(src.canonical_url)}" target="_blank" rel="noopener noreferrer">${esc(src.source_id)} ↗</a>`).join(' · ');
    return `<article class="audio-card"><div class="audio-glyph" aria-hidden="true">♫</div><div><div class="section-label">${esc(a.server)} · ${esc(a.patch_id)}</div><h3>${esc(a.title_translation)}</h3><p>${esc(a.title_original)} · ${esc(a.context)}<br>Rights: ${esc(a.rights_status)}</p><p style="margin-top:8px">Future offline brief: ${esc(a.composition_brief)}</p>${sourceLinks?`<p class="audio-sources">Sources: ${sourceLinks}</p>`:''}</div><span class="audio-state">${esc(confidence)}</span></article>`;
  }).join('');
  return `${pageHeader('Sound research / 07','Audio catalog','Concert-program metadata and community leads are kept separate from verified in-game track mappings. No protected recording is embedded.')}
    <div class="callout">Verified original game track-to-location mappings: <strong>${verifiedCount}</strong>. Concert-program metadata records: <strong>${concertCount}</strong>. Metadata-only community leads: <strong>${leadCount}</strong>. Concert titles and press-reported contexts are not confirmed original game asset names or current map mappings.</div>
    ${cards||`<div class="empty-state"><strong>No matching audio metadata</strong><p>Try a region, concert title, source ID or status.</p></div>`}
    <div class="section-heading"><div><h2>Catalog fields to verify</h2><p>Each track or sound event needs evidence before it receives a location or action mapping.</p></div></div>
    <div class="backlog-grid"><div class="backlog-card"><div class="backlog-num">01</div><div><h4>Track identity</h4><p>Original title, arrangement/version and source uploader.</p></div></div><div class="backlog-card"><div class="backlog-num">02</div><div><h4>In-game context</h4><p>Region, map, action, event, patch and date range.</p></div></div><div class="backlog-card"><div class="backlog-num">03</div><div><h4>Rights and storage</h4><p>Link-only by default; store media only when permission allows.</p></div></div></div>
  </div>`;
}

function render() {
  document.body.classList.toggle('dark',state.theme==='dark');
  $$('.nav-item').forEach(item=>{item.classList.toggle('active',item.dataset.page===state.page);if(item.dataset.page===state.page)item.setAttribute('aria-current','page');else item.removeAttribute('aria-current');});
  if(state.page==='overview') app.innerHTML=renderOverview();
  else if(state.page==='articles') {if(state.articleSlug){renderArticle(state.articleSlug);return;} app.innerHTML=renderArticleList();}
  else if(state.page==='entities') app.innerHTML=renderEntities();
  else if(state.page==='sources') app.innerHTML=renderSources();
  else if(state.page==='evidence') app.innerHTML=renderEvidence();
  else if(state.page==='gaps') app.innerHTML=renderGaps();
  else if(state.page==='audio') app.innerHTML=renderAudio();
}
function setPage(page) { state.page=page;state.articleSlug=null;state.entityId=null;render();window.scrollTo({top:0,behavior:'smooth'}); }

document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-page]'); if(nav){event.preventDefault();setPage(nav.dataset.page);return;}
  const go=event.target.closest('[data-go]');if(go){setPage(go.dataset.go);return;}
  const article=event.target.closest('[data-article]');if(article){state.page='articles';state.articleSlug=article.dataset.article;render();window.scrollTo({top:0,behavior:'smooth'});return;}
  const entity=event.target.closest('[data-entity]');if(entity){state.entityId=entity.dataset.entity;render();window.scrollTo({top:0,behavior:'smooth'});return;}
  const sourceFilter=event.target.closest('[data-source-filter]');if(sourceFilter){state.page='sources';state.search=sourceFilter.dataset.sourceFilter;$('#global-search').value=state.search;state.sourceFilter='all';render();return;}
});
document.addEventListener('change',event=>{
  if(event.target.id==='source-filter'){state.sourceFilter=event.target.value;render();}
  if(event.target.id==='claim-filter'){state.claimFilter=event.target.value;render();}
  if(event.target.id==='article-priority'){render();}
});
$('#global-search').addEventListener('input',event=>{state.search=event.target.value;state.articleSlug=null;state.entityId=null;render();});
$('#theme-toggle').addEventListener('click',()=>{state.theme=state.theme==='light'?'dark':'light';localStorage.setItem('gmr-theme',state.theme);render();});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#global-search').focus();}});

function base64Bytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function decryptResearch(password, vault) {
  if (vault.version !== 1 || vault.algorithm !== 'AES-GCM' || vault.kdf?.name !== 'PBKDF2') {
    throw new Error('Unsupported encrypted bundle.');
  }
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: base64Bytes(vault.salt), iterations: vault.kdf.iterations, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  const clear = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64Bytes(vault.iv), tagLength: 128 },
    key,
    base64Bytes(vault.sealed)
  );
  return JSON.parse(new TextDecoder().decode(clear));
}

function showResearchLoadError() {
  app.innerHTML='<div class="page-wrap"><div class="empty-state"><strong>Research data could not be loaded</strong><p>Refresh the site after the latest build has completed.</p></div></div>';
}

if (window.GMR_ENCRYPTED_MODE === true) {
  const authScreen = $('#auth-screen');
  const appFrame = $('#app-frame');
  const passwordInput = $('#owner-password');
  const feedback = $('#auth-feedback');
  const submitButton = $('#auth-form button[type="submit"]');
  let vault = null;

  appFrame.hidden = true;
  authScreen.hidden = false;
  $('#logout-button').hidden = false;

  $('#auth-form').addEventListener('submit', async event => {
    event.preventDefault();
    submitButton.disabled = true;
    feedback.textContent = 'Unlocking…';
    try {
      if (!vault) {
        const response = await fetch('./data/vault.json', { cache: 'no-store' });
        if (!response.ok) throw new Error('Encrypted research bundle unavailable.');
        vault = await response.json();
      }
      const data = await decryptResearch(passwordInput.value, vault);
      if (!Array.isArray(data.sources) || !Array.isArray(data.articles) || !data.article_bodies) {
        throw new Error('Encrypted research bundle is incomplete.');
      }
      state.data = data;
      $('#updated-date').textContent = data.updated_at;
      authScreen.hidden = true;
      appFrame.hidden = false;
      feedback.textContent = '';
      passwordInput.value = '';
      render();
    } catch {
      feedback.textContent = 'That password could not unlock the research library.';
      passwordInput.select();
    } finally {
      submitButton.disabled = false;
    }
  });

  $('#logout-button').addEventListener('click', () => {
    state.data = null;
    appFrame.hidden = true;
    authScreen.hidden = false;
    feedback.textContent = 'Research locked.';
    passwordInput.value = '';
    passwordInput.focus();
  });
} else {
  fetch('./data/research.json').then(response=>{if(!response.ok)throw new Error('Research dataset unavailable');return response.json();}).then(data=>{state.data=data;$('#updated-date').textContent=data.updated_at;render();}).catch(showResearchLoadError);
}
