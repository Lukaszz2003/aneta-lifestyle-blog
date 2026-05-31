// --- 1. Renderowanie Strony Głównej (3 najnowsze posty) ---
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

// --- 2. Renderowanie Podstron Kategori z Systemem Zakładek ---
function renderCategoryPage(catKey, selectedSubcat = "Wszystko") {
    const data = categoryData[catKey];
    if (!data) return;

    document.getElementById('cat-page-title').innerText = data.title;
    document.getElementById('cat-page-description').innerText = data.description;

    // Generowanie przełączników zakładek (Tabs)
    const tabsContainer = document.getElementById('cat-page-tabs');
    tabsContainer.innerHTML = '';
    data.tabs.forEach(tabName => {
        const tab = document.createElement('span');
        tab.className = `tab ${tabName === selectedSubcat ? 'active' : ''}`;
        tab.innerText = tabName;
        tab.onclick = () => renderCategoryPage(catKey, tabName);
        tabsContainer.appendChild(tab);
    });

    // Filtrowanie oraz renderowanie artykułów z bazy danych
    const articlesContainer = document.getElementById('cat-articles-container');
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

// --- 3. Mechanizm Routera SPA (Przełączanie stron w locie) ---
function showPage(pageId) {
    document.getElementById('page-home').style.display = 'none';
    document.getElementById('page-wspolpraca').style.display = 'none';
    document.getElementById('category-template-page').style.display = 'none';
    
    if (pageId === 'home') {
        document.getElementById('page-home').style.display = 'block';
        document.getElementById('insta-feed-section').style.display = 'block';
    } else if (pageId === 'wspolpraca') {
        document.getElementById('page-wspolpraca').style.display = 'block';
        document.getElementById('insta-feed-section').style.display = 'none';
    } else {
        document.getElementById('category-template-page').style.display = 'block';
        document.getElementById('insta-feed-section').style.display = 'none';
        renderCategoryPage(pageId, "Wszystko");
    }

    // Aktualizacja podświetlenia linków w Menu
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    
    const activeLink = Array.from(links).find(link => link.getAttribute('onclick')?.includes(`'${pageId}'`));
    if (activeLink) activeLink.classList.add('active');
    
    // Zamknięcie menu mobilnego po kliknięciu
    document.getElementById('navMenu').classList.remove('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// --- 4. Przełącznik Trybu Ciemnego (Dark Mode) ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeIcon = document.getElementById('themeIcon');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('theme', newTheme);
}

// --- 5. Menu Mobilne ---
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// --- 6. Inicjalizacja Aplikacji po załadowaniu DOM ---
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeIcon').className = 'fa-solid fa-sun';
    }
    renderHomePage();
});