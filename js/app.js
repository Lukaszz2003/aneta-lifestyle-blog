/* ==========================================================================
   1. OBSŁUGA MOTYWU (DARK / LIGHT MODE)
   ========================================================================== */

function syncTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (!themeToggle || !themeIcon) return;

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun theme-btn-icon sun-icon';
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'fa-solid fa-moon theme-btn-icon moon-icon';
    }
}

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

/* ==========================================================================
   2. RENDEROWANIE KART ARTYKUŁÓW NA STRONIE GŁÓWNEJ
   ========================================================================== */

function renderLatestStories() {
    const container = document.getElementById("stories-container");
    if (!container) return;

    container.innerHTML = "";

    if (typeof articles === 'undefined') {
        console.error("Błąd: Tablica 'articles' nie została odnaleziona.");
        return;
    }

    articles.forEach(article => {
        let tagClass = "tag-style";
        let displayCategory = "Styl";

        if (article.category === "podroze") {
            tagClass = "tag-breaks";
            displayCategory = "Breaks";
        } else if (article.category === "aktywnie") {
            tagClass = "tag-zdrowo";
            displayCategory = "Zdrowo";
        }

        const cardHTML = `
            <article class="story-card" onclick="openArticle('${article.id}')">
                <div class="story-img-wrapper">
                    <img src="${article.image}" alt="${article.title}" class="story-img">
                    <span class="story-category ${tagClass}">${displayCategory}</span>
                </div>
                <div class="story-content">
                    <span class="story-date">${article.date}</span>
                    <h3 class="story-title">${article.title}</h3>
                    <p class="story-excerpt">${article.excerpt}</p>
                    <span class="story-read-more">Czytaj artykuł <i class="fa-solid fa-arrow-right-long"></i></span>
                </div>
            </article>
        `;

        container.innerHTML += cardHTML;
    });
}

/* ==========================================================================
   3. RENDEROWANIE PODSTRON KATEGORII Z SYSTEMEM ZAKŁADEK
   ========================================================================== */

function renderCategoryPage(catKey, selectedSubcat = "Wszystko") {
    if (typeof categoryData === 'undefined' || typeof articles === 'undefined') return;
    
    const data = categoryData[catKey];
    if (!data) return;

    // Pobieranie elementów nagłówka
    const titleEl = document.getElementById('cat-page-title');
    const descEl = document.getElementById('cat-page-description');
    
    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.description;

    // Generowanie przełączników zakładek (Tabs)
    const tabsContainer = document.getElementById('cat-page-tabs');
    if (tabsContainer) {
        tabsContainer.innerHTML = '';
        data.tabs.forEach(tabName => {
            const tab = document.createElement('span');
            // Nadajemy klasy stylów dla zakładek (załóż klasę 'tab' i 'active' w CSS)
            tab.className = `tab ${tabName === selectedSubcat ? 'active' : ''}`;
            tab.style.cursor = 'pointer';
            tab.style.padding = '8px 20px';
            tab.style.borderBottom = tabName === selectedSubcat ? '2px solid var(--text-main, #000)' : 'none';
            tab.innerText = tabName;
            tab.onclick = () => renderCategoryPage(catKey, tabName);
            tabsContainer.appendChild(tab);
        });
    }

    // Filtrowanie oraz renderowanie artykułów z bazy danych
    const articlesContainer = document.getElementById('cat-articles-container');
    if (!articlesContainer) return;
    articlesContainer.innerHTML = '';

    const filteredArticles = articles.filter(art => {
        if (art.category !== catKey) return false;
        if (selectedSubcat === "Wszystko") return true;
        return art.subcategory === selectedSubcat;
    });

    if (filteredArticles.length === 0) {
        articlesContainer.innerHTML = `<p style="text-align:center; color: #888; padding: 40px 0; width: 100%;">W tej podkategorii nie ma jeszcze artykułów. Nowe wpisy pojawią się już wkrótce!</p>`;
        return;
    }

    filteredArticles.forEach(art => {
        const articleBlock = document.createElement('article');
        articleBlock.className = 'article-long';
        articleBlock.style.marginBottom = '60px';
        articleBlock.innerHTML = art.htmlContent;
        articlesContainer.appendChild(articleBlock);
    });
}

/* ==========================================================================
   4. SYSTEM OTWIERANIA POJEDYNCZYCH ARTYKUŁÓW (CZYTNIK)
   ========================================================================== */

function openArticle(articleId) {
    if (typeof articles === 'undefined') return;

    const article = articles.find(art => art.id === articleId);
    if (!article) return;

    const categoryNames = {
        moda: "Moda & Lifestyle",
        podroze: "City Breaks",
        aktywnie: "Active Self-care"
    };

    const viewCategory = document.getElementById("post-view-category");
    const viewDate = document.getElementById("post-view-date");
    const viewTitle = document.getElementById("post-view-title");
    const viewBody = document.getElementById("post-view-body");

    if (viewCategory) viewCategory.innerText = categoryNames[article.category] || article.category;
    if (viewDate) viewDate.innerText = article.date;
    if (viewTitle) viewTitle.innerText = article.title;
    if (viewBody) viewBody.innerHTML = article.htmlContent;

    // Chowanie standardowych widoków SPA
    const homePage = document.getElementById('page-home');
    const templatePage = document.getElementById('category-template-page');
    const articleView = document.getElementById("page-article-view");
    const instaFeed = document.getElementById('insta-feed-section');

    if (homePage) homePage.style.display = "none";
    if (templatePage) templatePage.style.display = "none";
    if (instaFeed) instaFeed.style.display = "none";
    
    if (articleView) {
        articleView.style.display = "block";
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
}

function closeArticle() {
    const homePage = document.getElementById('page-home');
    const articleView = document.getElementById("page-article-view");
    const instaFeed = document.getElementById('insta-feed-section');

    if (articleView) articleView.style.display = "none";
    if (homePage) homePage.style.display = "block";
    if (instaFeed) instaFeed.style.display = "block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   5. ROUTER STRONY SPA (PRZEŁĄCZANIE STRON GŁÓWNYCH)
   ========================================================================== */

function showPage(pageId) {
    const articleView = document.getElementById("page-article-view");
    if (articleView) articleView.style.display = "none";

    const homePage = document.getElementById('page-home');
    const coopPage = document.getElementById('page-wspolpraca');
    const templatePage = document.getElementById('category-template-page');
    const instaFeed = document.getElementById('insta-feed-section');

    if (homePage) homePage.style.display = 'none';
    if (coopPage) coopPage.style.display = 'none';
    if (templatePage) templatePage.style.display = 'none';
    
    if (pageId === 'home') {
        if (homePage) homePage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'block';
    } else if (pageId === 'wspolpraca') {
        if (coopPage) coopPage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'none';
    } else {
        // Dynamiczne wywołanie szablonu podstrony dla: 'moda', 'podroze', 'aktywnie'
        if (templatePage) templatePage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'none';
        renderCategoryPage(pageId, "Wszystko");
    }

    // Podświetlanie linków w menu nawigacyjnym
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    
    const activeLink = Array.from(links).find(link => link.getAttribute('onclick')?.includes(`'${pageId}'`));
    if (activeLink) activeLink.classList.add('active');
    
    const navMenu = document.getElementById('navMenu');
    if (navMenu) navMenu.classList.remove('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   6. MENU MOBILNE & DOM CONTENT LOADED
   ========================================================================== */

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    syncTheme();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            syncTheme();
        });
    }

    // Wygeneruj karty na stronie głównej przy starcie
    renderLatestStories();
});