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
   2. RENDEROWANIE KART ARTYKUŁÓW NA STRONIE GŁÓWNEJ (NAJNOWSZE WPISY)
   ========================================================================== */

function renderLatestStories() {
    const container = document.getElementById("stories-container");
    if (!container) return;

    container.innerHTML = "";

    if (typeof articles === 'undefined') {
        console.error("Błąd: Tablica 'articles' nie została odnaleziona.");
        return;
    }

    // Na stronie głównej pokazujemy po jednym, NAJNOWSZYM artykule z każdej kategorii
    const categoriesToRender = ["moda", "podroze", "aktywnie"];

    categoriesToRender.forEach(cat => {
        const catArticles = articles.filter(art => art.category === cat);
        if (catArticles.length === 0) return;

        // Pobieramy najnowszy (ostatni w tablicy)
        const article = catArticles[catArticles.length - 1];

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
   3. RENDEROWANIE PODSTRON KATEGORII Z PAGINACJĄ (STRONICOWANIEM)
   ========================================================================== */

// Globalne zmienne do śledzenia stanu paginacji w SPA
let currentPage = 1; 
const articlesPerPage = 1; // Żądanie: 1 artykuł na podstronę

function renderCategoryPage(catKey, selectedSubcat = "Wszystko", page = 1) {
    if (typeof categoryData === 'undefined' || typeof articles === 'undefined') return;
    
    const data = categoryData[catKey];
    if (!data) return;

    currentPage = page;

    // 1. Aktualizacja nagłówków strony
    const titleEl = document.getElementById('cat-page-title');
    const descEl = document.getElementById('cat-page-description');
    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.description;

    // 2. Generowanie przełączników zakładek (Tabs)
    const tabsContainer = document.getElementById('cat-page-tabs');
    if (tabsContainer) {
        tabsContainer.innerHTML = '';
        data.tabs.forEach(tabName => {
            const tab = document.createElement('span');
            tab.className = `tab ${tabName === selectedSubcat ? 'active' : ''}`;
            tab.style.cursor = 'pointer';
            tab.style.padding = '8px 20px';
            tab.style.borderBottom = tabName === selectedSubcat ? '2px solid var(--text-main, #000)' : 'none';
            tab.innerText = tabName;
            // Przy zmianie zakładki resetujemy paginację do 1. strony
            tab.onclick = () => renderCategoryPage(catKey, tabName, 1);
            tabsContainer.appendChild(tab);
        });
    }

    // 3. Filtrowanie artykułów i odwrócenie kolejności (żeby najnowsze były jako pierwsze na stronie 1)
    const filteredArticles = articles
        .filter(art => {
            if (art.category !== catKey) return false;
            if (selectedSubcat === "Wszystko") return true;
            return art.subcategory === selectedSubcat;
        })
        .reverse(); // Nowa Praga będzie pierwsza, starszy Londyn drugi!

    const articlesContainer = document.getElementById('cat-articles-container');
    if (!articlesContainer) return;
    articlesContainer.innerHTML = '';

    if (filteredArticles.length === 0) {
        articlesContainer.innerHTML = `<p style="text-align:center; color: #888; padding: 40px 0; width: 100%;">W tej podkategorii nie ma jeszcze artykułów. Nowe wpisy pojawią się już wkrótce!</p>`;
        return;
    }

    // 4. LOGIKA PAGINACJI
    const totalArticles = filteredArticles.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
    // Obliczamy indeksy dla uciętej podstrony
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    // Renderujemy artykuł przypisany do danej podstrony z AUTOMATYCZNYM przypisywaniem zdjęcia
    articlesToShow.forEach(art => {
        const articleBlock = document.createElement('article');
        articleBlock.className = 'article-long-wrapper';
        articleBlock.style.marginBottom = '60px';
        articleBlock.style.width = '100%';
        
        // Dynamiczna struktura - automatycznie wstrzykuje unikalne zdjęcie z bazy danych dla każdego artykułu
        articleBlock.innerHTML = `
            <div class="story-image-wrapper" onclick="openArticle('${art.id}')" style="cursor: pointer; margin-bottom: 25px; overflow: hidden; width: 100%; max-height: 500px;">
                <img src="${art.image}" alt="${art.title}" class="story-img" style="width: 100%; height: auto; object-fit: cover; display: block;">
            </div>
            <div class="story-meta" style="margin-bottom: 12px; font-size: 0.9rem; color: #666; display: flex; gap: 15px;">
                <span class="story-category" style="font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${art.subcategory}</span>
                <span class="story-date">${art.date}</span>
            </div>
            <h2 class="story-title" onclick="openArticle('${art.id}')" style="cursor: pointer; font-size: 2rem; margin-bottom: 15px; font-family: inherit;">
                ${art.title}
            </h2>
            <p class="story-excerpt" style="font-size: 1.1rem; color: #444; line-height: 1.6; margin-bottom: 20px;">
                ${art.excerpt}
            </p>
            <button class="btn-read-more" onclick="openArticle('${art.id}')" style="background: none; border: none; border-bottom: 1px solid #000; padding: 5px 0; font-weight: 600; cursor: pointer; font-size: 1rem;">
                Czytaj artykuł <i class="fa-solid fa-arrow-right-long" style="margin-left: 5px;"></i>
            </button>
        `;
        articlesContainer.appendChild(articleBlock);
    });

    // 5. GENEROWANIE PANELU PAGINACJI NA DOLE STRONY
    renderPaginationControls(totalPages, catKey, selectedSubcat);
}

// Pomocnicza funkcja generująca przyciski stron (1, 2, 3...) na dole
function renderPaginationControls(totalPages, catKey, selectedSubcat) {
    // Szukamy istniejącego kontenera paginacji lub tworzymy nowy pod artykułami
    let paginationContainer = document.getElementById('pagination-controls');
    
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'pagination-controls';
        document.getElementById('cat-articles-container').after(paginationContainer);
    }
    
    paginationContainer.innerHTML = '';
    paginationContainer.className = 'pagination-wrapper';
    
    // Jeśli jest tylko jedna strona, ukrywamy kontrolki
    if (totalPages <= 1) return;

    // Przycisk "Poprzednia"
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn prev-next';
        prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i> Poprzednia`;
        prevBtn.onclick = () => renderCategoryPage(catKey, selectedSubcat, currentPage - 1);
        paginationContainer.appendChild(prevBtn);
    }

    // Cyfry podstron (1, 2...)
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.innerText = i;
        pageBtn.onclick = () => renderCategoryPage(catKey, selectedSubcat, i);
        paginationContainer.appendChild(pageBtn);
    }

    // Przycisk "Następna"
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn prev-next';
        nextBtn.innerHTML = `Następna <i class="fa-solid fa-chevron-right"></i>`;
        nextBtn.onclick = () => renderCategoryPage(catKey, selectedSubcat, currentPage + 1);
        paginationContainer.appendChild(nextBtn);
    }
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
    
    // W pełnym czytniku czyścimy ewentualne zdublowane banery i wstrzykujemy czysty htmlContent
    if (viewBody) viewBody.innerHTML = article.htmlContent;

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

    // Usuwamy stary panel paginacji przy zmianie podstron głównych
    const oldPagination = document.getElementById('pagination-controls');
    if (oldPagination) oldPagination.remove();

    if (homePage) homePage.style.display = 'none';
    if (coopPage) coopPage.style.display = 'none';
    if (templatePage) templatePage.style.display = 'none';
    
    if (pageId === 'home') {
        if (homePage) homePage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'block';
        renderLatestStories();
    } else if (pageId === 'wspolpraca') {
        if (coopPage) coopPage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'none';
    } else {
        if (templatePage) templatePage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'none';
        renderCategoryPage(pageId, "Wszystko", 1);
    }

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

    renderLatestStories();
});

document.querySelector('.dropdown').addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        e.stopPropagation();
        this.classList.toggle('active');
    }
});