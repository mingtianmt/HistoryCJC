// =================  search.js  =================
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');
  const clearBtn    = document.getElementById('clearBtn');
  const resultsBox  = document.getElementById('searchResults');
  const resultsList = document.getElementById('results');
  const grid        = document.getElementById('assignmentGrid');

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
      { title: '报刊与体育救国论：奥运首秀与中国报界的“体育救国”思潮 (2024-06）', link: 'I.html'},
      { title: '报刊阅读与市民生活：从传统报刊到新媒体矩阵（2019-10）', link: 'J.html'},
      { title: '见证中国革命的西方记者：“密苏里新闻帮”——活跃在近代中国西方新闻力量（2024-02）', link: 'K.html'},
      { title: '见证中国革命的西方记者：史沫特莱的来华初衷与报道成果（2024-14）', link: 'L.html'},
      { title: '报刊与体育救国论：1932年刘长春参加洛杉矶奥运会报道与“体育救国”思潮（2024-05）', link: 'M.html'},
      { title: '报刊阅读与市民生活：从《良友》画报中看近代中国社会生活的变迁（2019-13）', link: 'N.html'},
      { title: '党报理论与实践：被遗忘的新闻巨擎秦邦宪（2019-15）', link: 'O.html'},
      { title: '党报理论与实践：大跃进时期的”舆论“之论（2020-18）', link: 'P.html'},
      { title: '党报理论与实践：大跃进时期的《人民日报》的报道特征与成因（2019-07）', link: 'Q.html'},
      { title: '见证中国革命的西方记者：“密苏里新闻帮”与中国的对外宣传（2024-12）', link: 'R.html'},
      { title: '见证中国革命的西方记者：埃德加·斯诺与同时期西方来华记者群（2023-04）', link: 'S.html'},
      { title: '见证中国革命的西方记者：世界上第一双了解中国革命的眼睛——埃德加·斯诺（2023-04）', link: 'T.html'},
      { title: '见证中国革命的西方记者：西方来华记者史沫特莱（2023-08）', link: 'U.html'},
      { title: '近代职业记者群的崛起：“尽了几分天职”的女记者浦熙修（2023-10）', link: 'V.html'},
      { title: '近代职业记者群的崛起：“说人话说真话”的记者林白水研究综述(2020-04)', link: 'W.html'},
      { title: '近代职业记者群的崛起：中国首位战地女记者——张郁廉（2020-16）', link: 'X.html'},
      { title: '抗战与媒介：抗战时期中国共产党的宣传策略（2024-10）', link: 'Y.html'},
      { title: '抗战与媒介：抗战时期中国共产党在国统区的宣传策略（2020-14）', link: 'Z.html'},
      { title: '抗战与媒介：重庆大轰炸中的《重庆各报联合报》发行与终结探讨（2020-7）', link: 'AA.html'},
      { title: '女性与报刊：民国时期宋美龄媒介形象探讨（2020-03）', link: 'AB.html'},
      { title: '女性与报刊：晚清民国时期女性报刊发展评述（2020-05）', link: 'AC.html'},
      { title: '晚清报人的新闻思想与政治实践：康有为与梁启超的新闻思想比较（2019-12）', link: 'AD.html'},
      { title: '晚清报人的新闻思想与政治实践：王韬的“新报”论（2024-07）', link: 'AE.html'},
      { title: '晚清新旧报刊里的“太平天国”（2024-13）', link: 'AF.html'},
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

  // ① 隐藏卡片
  grid.style.display = 'none';
  // ② 结果块塞进原来卡片的位置（复制节点避免移动）
  const clone = resultsBox.cloneNode(true);
  clone.style.display = 'block';
  grid.parentNode.insertBefore(clone, grid.nextSibling);
}

  /* ---------- 3. 清除 ---------- */
  function clearSearch() {
    searchInput.value = '';
    resultsList.innerHTML = '';
  // ③ 拿掉临时结果
    const temp = grid.parentNode.querySelector('#searchResults');
    if (temp && temp !== resultsBox) temp.remove();

  // ④ 恢复卡片
    grid.style.display = 'grid';
    resultsBox.style.display = 'none';
  }

  /* ---------- 4. 事件绑定 ---------- */
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') performSearch(); });
  clearBtn.addEventListener('click', clearSearch);
});