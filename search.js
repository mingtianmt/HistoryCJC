// 模拟数据：课堂作业 + 翻转课堂文章
const data = [
  {
    title: "作业一：新闻思想",
    url: "hw1.html",
    desc: "探讨中国近代新闻思想的形成与发展。"
  },
  {
    title: "作业二：报刊史料",
    url: "hw2.html",
    desc: "分析近代报刊中的史料价值和研究方法。"
  },
  {
    title: "作业三：传播实践",
    url: "hw3.html",
    desc: "关注新闻传播的实际应用和影响。"
  },
  {
    title: "晚清报人的新闻思想与政治实践：梁启超的“新报”论（2024-01）",
    url: "article1.html",
    desc: "探讨梁启超在新闻传播中的思想与实践。"
  },
  {
    title: "近代来华传教士的多重身份：走近美国传教士与“汉学之父”卫三畏（2023-09）",
    url: "article2.html",
    desc: "研究传教士在宗教、教育和学术方面的多重角色。"
  },
  {
    title: "近代职业记者群的崛起：烽火玫瑰胡济邦（2024-08）",
    url: "article3.html",
    desc: "剖析胡济邦在新闻报道中的贡献。"
  },
  {
    title: "近代职业记者群的崛起：民国女性新闻从业者的困境与出路（2023-02）",
    url: "article4.html",
    desc: "聚焦民国女性记者的生存环境。"
  }
];

// 获取DOM元素
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("results");

// 搜索函数
function search() {
  const keyword = searchInput.value.trim();
  results.innerHTML = ""; // 清空旧结果

  if (keyword === "") {
    results.innerHTML = "<li>请输入关键词进行搜索。</li>";
    return;
  }

  // 过滤匹配结果
  const matched = data.filter(item =>
    item.title.includes(keyword) || item.desc.includes(keyword)
  );

  if (matched.length === 0) {
    results.innerHTML = "<li>没有找到匹配的内容。</li>";
    return;
  }

  // 插入搜索结果
  matched.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a><p>${item.desc}</p>`;
    results.appendChild(li);
  });
}

// 清除函数
function clearSearch() {
  searchInput.value = "";
  results.innerHTML = "";
}

// 事件绑定
searchBtn.addEventListener("click", search);
clearBtn.addEventListener("click", clearSearch);

// 回车触发搜索
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search();
  }
});
