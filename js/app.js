/* ==========================================================================
   1. OBSŁUGA MOTYWU (DARK / LIGHT MODE)
   ========================================================================== */

// Funkcja synchronizująca ikony i stan localStorage na podstawie klasy body
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

// Inicjalizacja motywu przed pełnym załadowaniem DOM (zapobiega miganiu strony)
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

/* ==========================================================================
   2. RENDEROWANIE STRONY GŁÓWNEJ (3 najnowsze posty)
   ========================================================================== */

function renderHomePage() {
    const grid = document.getElementById('latest-posts-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    // Pobieramy 3 najnowsze wpisy z bazy danych
    const latest = articles.slice(0, 3);
    
    latest.forEach(art => {
        const badgeColor = art.category === 'podroze' ? 'var(--accent-pink)' : (art.category === 'aktywnie' ? '#aae0fa' : 'var(--accent-lime)');
        // Pobiera czysty tekst kategorii bez emoji na początku
        const catLabel = categoryData[art.category].title.split(' ').pop(); 

        const card = document.createElement('div');
        card.className = 'post-card';
        card.onclick = () => showPage(art.category);
        card.innerHTML = `
            <div class="post-img">
                <img src="${art.image}" alt="${art.title}">
                <span class="post-category" style="background-color: ${badgeColor}">${catLabel}</span>
            </div>
            <div class="post-content">
                <span class="post-date">${art.date}</span>
                <h3 class="post-title">${art.title}</h3>
                <p class="post-excerpt">${art.excerpt}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ==========================================================================
   3. RENDEROWANIE PODSTRON KATEGORII Z SYSTEMEM ZAKŁADEK
   ========================================================================== */

function renderCategoryPage(catKey, selectedSubcat = "Wszystko") {
    const data = categoryData[catKey];
    if (!data) return;

    document.getElementById('cat-page-title').innerText = data.title;
    document.getElementById('cat-page-description').innerText = data.description;

    // Generowanie przełączników zakładek (Tabs)
    const tabsContainer = document.getElementById('cat-page-tabs');
    if (tabsContainer) {
        tabsContainer.innerHTML = '';
        data.tabs.forEach(tabName => {
            const tab = document.createElement('span');
            tab.className = `tab ${tabName === selectedSubcat ? 'active' : ''}`;
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
        articlesContainer.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding: 40px 0;">W tej podkategorii nie ma jeszcze artykułów. Nowe wpisy pojawią się już wkrótce!</p>`;
        return;
    }

    filteredArticles.forEach(art => {
        const articleBlock = document.createElement('article');
        articleBlock.className = 'article-long';
        articleBlock.innerHTML = art.htmlContent;
        articlesContainer.appendChild(articleBlock);
    });
}

/* ==========================================================================
   4. MECHANIZM ROUTERA SPA (Przełączanie stron w locie)
   ========================================================================== */

function showPage(pageId) {
    // Ukrywanie wszystkich głównych kontenerów widoków
    const homePage = document.getElementById('page-home');
    const coopPage = document.getElementById('page-wspolpraca');
    const templatePage = document.getElementById('category-template-page');
    const instaFeed = document.getElementById('insta-feed-section');

    if (homePage) homePage.style.display = 'none';
    if (coopPage) coopPage.style.display = 'none';
    if (templatePage) templatePage.style.display = 'none';
    
    // Logika wyświetlania konkretnej sekcji i sterowania sekcją Instagrama
    if (pageId === 'home') {
        if (homePage) homePage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'block';
    } else if (pageId === 'wspolpraca') {
        if (coopPage) coopPage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'none';
    } else {
        if (templatePage) templatePage.style.display = 'block';
        if (instaFeed) instaFeed.style.display = 'none';
        renderCategoryPage(pageId, "Wszystko");
    }

    // Aktualizacja wizualnego podświetlenia linków w menu nawigacyjnym
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    
    const activeLink = Array.from(links).find(link => link.getAttribute('onclick')?.includes(`'${pageId}'`));
    if (activeLink) activeLink.classList.add('active');
    
    // Zamknięcie menu mobilnego po kliknięciu i płynny powrót na górę strony
    const navMenu = document.getElementById('navMenu');
    if (navMenu) navMenu.classList.remove('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   5. MENU MOBILNE
   ========================================================================== */

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

/* ==========================================================================
   6. INICJALIZACJA NASŁUCHIWACZY I ZDARZEŃ DOM
   ========================================================================== */

window.addEventListener('DOMContentLoaded', () => {
    // 1. Synchronizacja wizualna motywu na podstawie wcześniejszego kroku wczytania
    syncTheme();

    // 2. Obsługa kliknięcia w przycisk zmiany motywu
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            syncTheme();
        });
    }

    // 3. Renderowanie startowe postów na stronie głównej
    renderHomePage();
});