// =================  search.js  =================
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');
  const clearBtn    = document.getElementById('clearBtn');
  const resultsBox  = document.getElementById('searchResults');
  const resultsList = document.getElementById('results');

  /* ---------- 1. 采集可搜索数据 ---------- */
  function collectData() {
    const data = [];

    /* 1.1 翻转课堂 */
    document.querySelectorAll('.assignment-card').forEach(card => {
      const h3  = card.querySelector('h3');
      const a   = card.querySelector('a');
      if (h3 && a) {
        data.push({
          title: h3.textContent.trim(),
          link: a.href
        });
      }
    });
    return data;
  }

  /* ---------- 2. 执行搜索 ---------- */
  function performSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) { alert('请输入关键词'); return; }

    const data = collectData();
    const hits = data.filter(item => item.title.toLowerCase().includes(keyword));

    resultsList.innerHTML = '';
    if (hits.length === 0) {
      resultsList.innerHTML = '<li>没有找到相关结果</li>';
    } else {
      hits.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>[${item.type}]</strong> <a href="${item.link}" target="_blank">${item.title}</a>`;
        resultsList.appendChild(li);
      });
    }
    resultsBox.style.display = 'block';
  }

  /* ---------- 3. 清除 ---------- */
  function clearSearch() {
    searchInput.value = '';
    resultsList.innerHTML = '';
    resultsBox.style.display = 'none';
  }

  /* ---------- 4. 事件绑定 ---------- */
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') performSearch(); });
  clearBtn.addEventListener('click', clearSearch);
});