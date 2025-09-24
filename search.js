document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const searchResults = document.getElementById("searchResults");
  const resultsList = document.getElementById("results");

  function performSearch() {
    const keyword = searchInput.value.trim();
    resultsList.innerHTML = "";

    if (keyword) {
      // 模拟搜索结果
      const li = document.createElement("li");
      li.textContent = `搜索结果：包含 “${keyword}” 的相关内容`;
      resultsList.appendChild(li);

      searchResults.style.display = "block";
    }
  }

  function clearSearch() {
    searchInput.value = "";
    resultsList.innerHTML = "";
    searchResults.style.display = "none";
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });
  clearBtn.addEventListener("click", clearSearch);
});
