

const RESULTS = document.getElementById('results');
const ALLLIST = document.getElementById('all-list');
const INPUT = document.getElementById('searchInput');
const BTN = document.getElementById('searchBtn');
const CLEAR = document.getElementById('clearBtn');

let indexData = [];

// 加载 index.json 并渲染总列表
async function loadIndex() {
  try {
    const res = await fetch('assignments/index.json', {cache: "no-cache"});
    if (!res.ok) throw new Error('无法加载索引');
    indexData = await res.json();
    renderAll();
  } catch (e) {
    ALLLIST.innerHTML = '<li>未找到 assignments/index.json（尚未生成或未上传）</li>';
    console.error(e);
  }
}

function renderAll() {
  ALLLIST.innerHTML = '';
  if (!indexData.length) {
    ALLLIST.innerHTML = '<li>暂无作业</li>';
    return;
  }
  for (const item of indexData) {
    const li = document.createElement('li');
    li.innerHTML = `<a class="link" href="${item.url}" target="_blank">${escapeHtml(item.title)}</a>
                    <div class="result-excerpt">${escapeHtml(item.excerpt)}</div>`;
    ALLLIST.appendChild(li);
  }
}

function doSearch() {
  const q = INPUT.value.trim().toLowerCase();
  RESULTS.innerHTML = '';
  if (!q) {
    RESULTS.innerHTML = '<li>请输入关键词后搜索。</li>';
    return;
  }
  const hits = indexData.filter(item =>
    (item.title && item.title.toLowerCase().includes(q)) ||
    (item.excerpt && item.excerpt.toLowerCase().includes(q))
  );
  if (!hits.length) {
    RESULTS.innerHTML = '<li>未找到相关作业</li>';
    return;
  }
  for (const item of hits) {
    const li = document.createElement('li');
    li.innerHTML = `<a class="link" href="${item.url}" target="_blank">${escapeHtml(item.title)}</a>
                    <div class="result-excerpt">${highlight(escapeHtml(item.excerpt), q)}</div>
                    <div><small>路径: <code>${escapeHtml(item.url)}</code></small></div>`;
    RESULTS.appendChild(li);
  }
}

// 简单高亮（在 excerpt 中）
function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(escapeRegExp(q), 'ig');
  return text.replace(re, m => `<mark>${m}</mark>`);
}

function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

BTN.addEventListener('click', doSearch);
INPUT.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
CLEAR.addEventListener('click', () => { INPUT.value=''; RESULTS.innerHTML=''; });

// load on start
loadIndex();
