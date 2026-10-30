const filterButtons = document.querySelectorAll(".filter-chip");
const categoryLinks = document.querySelectorAll("[data-category-link]");
const articleCards = [...document.querySelectorAll(".article-card")];
const articleGrid = document.querySelector("#article-grid");

function filterArticles(category) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  articleCards.forEach((card) => {
    card.hidden = category !== "全部" && card.dataset.category !== category;
  });

  const noResults = articleGrid.querySelector(".no-results");
  const hasVisibleArticles = articleCards.some((card) => !card.hidden);
  if (!hasVisibleArticles && !noResults) {
    const message = document.createElement("p");
    message.className = "no-results";
    message.textContent = "目前沒有符合分類的文章，請稍後再回來看看。";
    articleGrid.append(message);
  } else if (hasVisibleArticles && noResults) {
    noResults.remove();
  }
}

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  button.addEventListener("click", () => filterArticles(button.dataset.category));
});

categoryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    filterArticles(link.dataset.categoryLink);
    document.querySelector(".main-nav").classList.remove("open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  });
});

const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.querySelector(".main-nav").classList.toggle("open", isOpen);
});

const searchToggle = document.querySelector(".search-toggle");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector("#site-search");

searchToggle.addEventListener("click", () => {
  const isOpen = searchBar.classList.toggle("open");
  if (isOpen) searchInput.focus();
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLocaleLowerCase();
  articleCards.forEach((card) => {
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase();
    card.hidden = query.length > 0 && !searchableText.includes(query);
  });

  const noResults = articleGrid.querySelector(".no-results");
  const hasVisibleArticles = articleCards.some((card) => !card.hidden);
  if (!hasVisibleArticles && !noResults) {
    const message = document.createElement("p");
    message.className = "no-results";
    message.textContent = "找不到相關文章，試試其他關鍵字吧。";
    articleGrid.append(message);
  } else if (hasVisibleArticles && noResults) {
    noResults.remove();
  }

  filterButtons.forEach((button) => {
    const isAll = button.dataset.category === "全部";
    button.classList.toggle("active", isAll);
    button.setAttribute("aria-pressed", String(isAll));
  });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) filterArticles("全部");
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.querySelector("#email");
  const message = document.querySelector(".form-message");

  if (!emailInput.checkValidity()) {
    message.textContent = "請輸入有效的電子郵件地址。";
    message.classList.add("error");
    emailInput.focus();
    return;
  }

  message.textContent = "訂閱成功！下一期玩家通信即將送達。";
  message.classList.remove("error");
  emailInput.value = "";
});
