// Centralna tablica danych przechowująca wszystkie artykuły blogowe
const articles = [
    {
        id: "art-kolory-lata",
        category: "moda",       
        subcategory: "Casual",  
        date: "Maj 2026",
        title: "Soczysta limonka czy subtelne butter yellow? Kolory lata",
        excerpt: "Rozkładamy na czynniki pierwsze dwa najgorętsze trendy tego sezonu. Sprawdź, jak je nosić do pracy i na weekend!",
        image: "woman_sensual_bw_elegant.png",
        htmlContent: `
            <h2>Soczysta limonka czy subtelne butter yellow? Najmodniejsze kolory na to lato</h2>
            <p>Lato to idealny moment na eksperymenty z kolorem, a obecny sezon przyniósł nam dwa fascynujące i skrajnie różne hity, które zdominowały kolekcje marek premium i stylizacje na ulicach stolic mody: energiczną <strong>Lime Green</strong> oraz maślaną, niezwykle elegancką <strong>Butter Yellow</strong>.</p>
            <p>Oba te kolory doskonale rezonują z różnymi nastrojami – jeden wnosi do szafy potężną dawkę miejskiej energii, drugi stanowi kwintesencję minimalistycznego luksusu i spokoju.</p>
            
            <div class="color-showcase">
                <div class="color-box box-butter">
                    <h3>💛 Butter Yellow (Maślane żółte)</h3>
                    <p><strong>Dla kogo?</strong> Dla miłośniczek minimalizmu, estetyki „quiet luxury” oraz szafy kapsułowej. Ten maślany, ciepły odcień bieli jest niezwykle łaskawy dla skóry i fantastycznie komponuje się z klasycznymi elementami garderoby.</p>
                    <p style="margin-top:10px;"><strong>Jak nosić do pracy:</strong> Lniany garnitur w odcieniu butter yellow zestawiony z gładkim białym topem i skórzanymi klapkami to idealny uniform na ciepłe dni w biurze.</p>
                    <div class="aneta-tip"><strong>Wskazówka od Anety:</strong> „Jeśli obawiasz się total looku, zacznij od dodatków. Maślana torebka-bagietka albo delikatne sandałki na szpilce dodadzą lekkości nawet najprostszym jeansom.”</div>
                </div>
                <div class="color-box box-lime">
                    <h3>💚 Soczysta Limonka (Lime Green)</h3>
                    <p><strong>Dla kogo?</strong> Dla dziewczyn, które lubią wyróżniać się z tłumu, kochają stylizacje z pazurem i nie boją się modowych eksperymentów. Limonka natychmiast przyciąga wzrok i dodaje niesamowitej świeżości.</p>
                    <p style="margin-top:10px;"><strong>Jak nosić na weekend:</strong> Dopasowany limonkowy top w duecie z luźnymi szortami z ciemnego jeansu i masywnymi sneakersami to idealny set na spacer czy spotkanie przy mrożonej kawie.</p>
                    <div class="aneta-tip"><strong>Wskazówka od Anety:</strong> „Limonka uwielbia kontrasty! Genialnie wygląda połączona z głębokim kobaltem albo... czekoladowym brązem. Wypróbuj zestawienie limonkowiej koszuli z brązowymi spodniami z szeroką nogawką.”</div>
                </div>
            </div>
        `
    },
    {
        id: "art-londyn-atrakcje",
        category: "podroze",
        subcategory: "Przewodniki 48h",
        date: "Maj 2026",
        title: "5 nieoczywistych atrakcji Londynu na weekend",
        excerpt: "Zapomnij o nudnych i drogich punktach turystycznych. Zobacz ukryte, neonowe i tropikalne oblicza stolicy UK.",
        image: "woman_picadilly_circus_london.png",
        htmlContent: `
            <h2>5 nieoczywistych atrakcji Londynu, które musisz odwiedzić w trakcie weekendu</h2>
            <p>Londyn to nie tylko Big Ben, London Eye i wieczne tłumy pod Pałacem Buckingham. To miasto, które przy każdej wizycie potrafi zaskoczyć ukrytymi zakątkami, o których często nie wiedzą nawet sami mieszkańcy. Zapomnij na chwilę o drogich biletach do obleganych muzeów i utartych szlakach z przewodników turystycznych. Jeśli chcesz poczuć prawdziwy, alternatywny i artystyczny klimat tej metropolii podczas szybkiego wypadu typu city break, dopisz te punkty do swojej mapy!</p>
            
            <h3>1. God’s Own Junkyard – Neonowy raj w Walthamstow</h3>
            <p>Ukryty w przemysłowej dzielnicy we wschodnim Londynie, ten niepozorny magazyn skrywa największą w Europie kolekcję vintage’owych neonów, starych rekwizytów filmowych i neonowych znaków religijnych czy cyrkowych. To prawdziwa eksplozja kolorów i świateł, stworzona przez nieżyjącego już artystę Chrisa Brancey’ego. Miejsce ma niesamowity, lekko psychodeliczny klimat.</p>
            <div class="aneta-tip"><strong>Wskazówka od Anety:</strong> „Wejście do magazynu jest całkowicie darmowe. Na miejscu działa mała kawiarnia o uroczej nazwie 'The Rolling Scones' – idealna, by wypić kawę w blasku setek neonów. Genialne fotki telefonem zrobicie bez problemu!”</div>
            
            <h3>2. Barbican Conservatory – Tropikalna dżungla w betonowym sercu brutalizmu</h3>
            <p>Wyobraź sobie potężną, surową bryłę z betonu wzniesioną w stylu brutalistycznym, a w jej środku... drugą największą szklarnię w Londynie. Barbican Conservatory to dom dla ponad 1500 gatunków egzotycznych roślin, tropikalnych drzew, a nawet stawów z egzotycznymi rybami. Kontrast między szarym betonem a bujną, soczystą zielenią monstor i palm zapiera dech w piersiach.</p>
            
            <h3>3. Neal’s Yard – Kolorowa oaza ukryta w Covent Garden</h3>
            <p>Wystarczy skręcić w małe, niepozorne przejście tuż obok tętniącego życiem Seven Dials, by znaleźć się na malutkim, bajkowo kolorowym dziedzińcu. Neal’s Yard to eksplozja barw – kamienice mają tu jaskrawo pomalowane okiennice, ściany pną się zielenią, a na dole znajdziesz rzemieślnicze kawiarnie, lodziarnie oraz kultowy sklep z naturalnymi kosmetykami. Idealne miejsce na krótką przerwę od wielkomiejskiego pędu.</p>

            <h3>4. Seven Dials Market – Kulinarna podróż w dawnej bananowni</h3>
            <p>Jeśli po intensywnym spacerze dopadnie Cię głód, zapomnij o sieciówkach. Skieruj się do Seven Dials Market – nowoczesnej hali gastronomicznej zlokalizowanej w budynku, który w latach 20. XX wieku służył jako magazyn bananów. Znajdziesz tu niesamowity wybór street foodu z całego świata: od kultowych burgerów z serem na parze, przez azjatyckie kluseczki, aż po pierwszy na świecie bar z serami serwowanymi na taśmie bagażowej (Pick & Cheese).</p>
            <div class="aneta-tip"><strong>Wskazówka od Anety:</strong> „W weekendy bywa tu tłoczno, dlatego najlepiej przyjść w godzinach popołudniowych, pomiędzy tradycyjnym lunchem a kolacją. Spróbujcie koniecznie truflowych frytek!”</div>

            <h3>5. Horizon 22 – Widok na Londyn z 58. piętra za darmo</h3>
            <p>Zamiast wydawać fortunę na bilet na London Eye czy The Shard, zarezerwuj bezpłatny bilet na Horizon 22. To najwyższy bezpłatny taras widokowy w Europie, usytuowany aż 254 metry nad ziemią! Przeszklone ściany od podłogi aż po sufit gwarantują niesamowitą, 360-stopniową panoramę na całą stolicę, z idealnym widokiem na Tower Bridge, Tamizę i drapacze chmur w City.</p>
        `
    },
    {
        id: "art-aktywny-weekend",
        category: "aktywnie",
        subcategory: "Rolki & Rower",
        date: "Kwiecień 2026",
        title: "Aktywny weekend w mieście: 4 pomysły na ruch",
        excerpt: "Wiejskie bulwary, joga na trawie i kajaki. Jak połączyć ruch z towarzyskim życiem i prawdziwym resetem.",
        image: "woman_rollerblading_polish_park.png",
        htmlContent: `
            <h2>Aktywny weekend w wielkim mieście: 4 pomysły na ruch bez presji</h2>
            <p>Życie w mieście bywa niesamowicie intensywne, a po całym tygodniu spędzonym przed ekranem komputera nasze ciało i głowa desperacko potrzebują resetu. Najlepszym lekiem na stres nie zawsze jest jednak leżenie na kanapie – ruch uwalnia endorfiny i pozwala skutecznie oczyścić umysł. Kluczem jest jednak to, by sport sprawiał nam czystą przyjemność, bez bicia rekordów i niepotrzebnej presji. Oto moje cztery sprawdzone sposoby na to, jak spędzić weekend aktywnie, zdrowo i z uśmiechem na twarzy!</p>
            
            <h3>1. Wieczorne rolki na nadrzecznych bulwarach</h3>
            <p>Gładki jak stół asfalt, rześki wiatr i ulubiona, energetyczna playlista na słuchawkach – to mój sprawdzony przepis na idealny piątkowy wieczór. Jazda na rolkach wzdłuż rzeki pozwala doskonale rozładować napięcie z całego tygodnia. Angażuje całe ciało, świetnie rzeźbi nogi, a przy tym daje niesamowite poczucie wolności.</p>
            <div class="aneta-tip"><strong>Wskazówka od Anety:</strong> „Wyrusz na trasę około godziny przed zachodem słońca. Ciepłe, pomarańczowe światło odbijające się w wodzie i rozświetlające się powoli miejskie latarnie robią niesamowite wrażenie i gwarantują piękny mentalny reset.”</div>
            
            <h3>2. Poranna joga na trawie w parku</h3>
            <p>Zamiast kolejnego poranka z telefonem w ręku, spakuj matę i przejdź się do najbliższego parku. Wiele miejskich zielonych przestrzeni organizuje w weekendy darmowe lub za symboliczne „co łaska” zajęcia jogi na świeżym powietrzu. Rozciąganie kręgosłupa zmęczonego siedzącym trybem życia przy dźwiękach śpiewu ptaków i szumu drzew to zupełnie inny poziom relaksu niż praktyka w zamkniętej sali fitness.</p>

                    <h3>3. Miejski rajd rowerowy z przerwą na kawę</h3>
                    <p>Rowery miejskie lub własne dwa kółka to genialny sposób na mikro-podróże po własnym mieście. Zamiast jeździć w kółko tą samą trasą, zaplanuj wycieczkę przez mniej znane dzielnice, parki krajobrazowe czy industrialne zakątki. Cały urok polega na tym, by celem wycieczki była mała, rzemieślnicza kawiarnia na drugim końcu miasta, gdzie nagrodą za kilkanaście kilometrów w nogach będzie pyszna mrożona matcha i cynamonka.</p>
            
            <h3>4. Spływ kajakowy w wersji miejskiej</h3>
            <p>Czy wiedziałaś, że w większości dużych miast w Polsce działają wypożyczalnie kajaków bezpośrednio na miejskich rzekach, kanałach lub jeziorach? Spojrzenie na architekturę miasta z poziomu tafli wody daje zupełnie nową perspektywę. To wspaniały trening dla górnych partii ciała, a jednocześnie bliski kontakt z naturą – często zaledwie kilkaset metrów od ścisłego, betonowego centrum.</p>
            <div class="aneta-tip"><strong>Wskazówka od Anety:</strong> „Wybierz się na kajaki ze znajomymi w sobotnie przedpołudnie. Połączcie spływ z wspólnym piknikiem na jednej z nadrzecznych plaż – idealny sposób na aktywną integrację.”</div>
        `
    }
];

// Metadane i konfiguracja zakładek dla poszczególnych kategorii
const categoryData = {
    moda: {
        title: "Moda & Styl",
        description: "Uwielbiam bawić się trendami, ale ponad wszystko cenię wygodę i autentyczność. Znajdziesz tu przeglądy szafy kapsułowej, lookbooki oraz porady.",
        tabs: ["Wszystko", "Casual", "Biurowy chic", "Na rower/rolki"]
    },
    podroze: {
        title: "✈️ City Breaks",
        description: "Udowadniam, że nie potrzebujesz miesiąca urlopu, aby odkrywać magię nowych miejsc. Znajdziesz tu gotowe weekendowe przewodniki i triki.",
        tabs: ["Wszystko", "Przewodniki 48h", "Pakowanie", "Moje perełki"]
    },
    aktywnie: {
        title: "🧘‍♀️ Aktywnie & Zdrowo",
        description: "Dbam o siebie, ale bez presji. Wolne chwile najchętniej spędzam w ruchu – łapiąc wiatr we włosach. Sprawdź moje trasy i poranne rutyny.",
        tabs: ["Wszystko", "Rolki & Rower", "Balans & Self-care", "Codzienne nawyki"]
    }
};