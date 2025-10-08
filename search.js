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

    /* 1.2 翻转课堂，更多的标题（手动添加） */
    const moreAssignments = [
      { title: '报刊与体育救国论：奥运首秀与中国报界的“体育救国”思潮 (2024-06）', link: 'A.html'},
      { title: '报刊阅读与市民生活：从传统报刊到新媒体矩阵（2019-10）', link: 'B.html'},
      { title: '见证中国革命的西方记者：“密苏里新闻帮”——活跃在近代中国西方新闻力量（2024-02）', link: 'C.html'},
      { title: '见证中国革命的西方记者：史沫特莱的来华初衷与报道成果（2024-14）', link: 'D.html'},
    ];
    data.push(...moreAssignments);

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
        li.className = 'search-item';  // 给每个 li 添加 class
        li.style.padding = '8px 12px';
        li.style.marginBottom = '8px';
        li.style.borderRadius = '4px';
        li.style.transition = 'background 0.3s, transform 0.2s';

        li.addEventListener('mouseover', () => {
          li.style.background = 'rgba(155, 29, 43, 0.1)';  // 浅红色悬停
          li.style.transform = 'translateX(4px)';
        });
        li.addEventListener('mouseout', () => {
          li.style.background = 'transparent';
          li.style.transform = 'translateX(0)';
        });

        li.innerHTML = `<a href="${item.link}" target="_blank" style="text-decoration:none;color:#555;font-weight:500;">${item.title}</a>`;

        resultsList.appendChild(li);
      });
    }
    resultsBox.style.display = 'block';
    resultsBox.style.display = 'none';
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