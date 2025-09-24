// 获取DOM元素
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("results");
const searchResults = document.getElementById("searchResults"); // 新增父容器

// 搜索函数
function search() {
  const keyword = searchInput.value.trim();
  results.innerHTML = ""; // 清空旧结果

  if (keyword === "") {
    searchResults.style.display = "none";
    return;
  }

  // 过滤匹配结果
  const matched = data.filter(item =>
    item.title.includes(keyword) || item.desc.includes(keyword)
  );

  if (matched.length === 0) {
    searchResults.style.display = "block";
    results.innerHTML = "<li>没有找到匹配的内容。</li>";
    return;
  }

  // 插入搜索结果
  matched.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a><p>${item.desc}</p>`;
    results.appendChild(li);
  });

  searchResults.style.display = "block"; // 有结果时显示
}

// 清除函数
function clearSearch() {
  searchInput.value = "";
  results.innerHTML = "";
  searchResults.style.display = "none"; // 清除时隐藏
}
