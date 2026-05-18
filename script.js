/* ==========================================================================
   BREWMIEL WEB INTERACTIVE FUNCTIONALITY SCRIPT
   Dual Language, Infinite Loop Carousel, Dynamic Cart Engine & Recipes Router
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    let currentLang = "ua";
    let cart = [];
    
    let flavorsOrder = ["summer", "classic", "winter"];
    
    const flavorData = {
        summer: {
            title: "Summer Breeze",
            subtitle: { ua: "Summer Breeze", en: "Summer Breeze" },
            img: "png_summer.png",
            fallbackClass: "summer-fallback",
            fallbackIcon: "fa-sun"
        },
        classic: {
            title: "Classic Gold",
            subtitle: { ua: "Classic", en: "Classic" },
            img: "png_classic.png",
            fallbackClass: "classic-fallback",
            fallbackIcon: "fa-crown"
        },
        winter: {
            title: "Winter Spice",
            subtitle: { ua: "Winter Spice", en: "Winter Spice" },
            img: "png_winter.png",
            fallbackClass: "winter-fallback",
            fallbackIcon: "fa-snowflake"
        }
    };

    const recipesData = {
        summer: [
            {
                title: { ua: "Медовий Мохіто", en: "Honey Mojito Twist" },
                ingredients: { ua: ["60мл білого рому", "25мл сиропу Summer Breeze", "30мл соку лайма", "Свіжа м'ята, газована вода"], en: ["60ml White Rum", "25ml Summer Breeze Syrup", "30ml Lime Juice", "Fresh Mint, Soda Water"] },
                instructions: { ua: "Розімніть м'яту з лаймом та сиропом. Додайте лід, ром та залийте газованою водою доверху. Обережно перемішайте.", en: "Muddle mint leaves with lime juice and syrup. Fill glass with crushed ice, add rum and top with soda water. Stir gently." }
            },
            {
                title: { ua: "Цитрусовий Глінт", en: "Citrus Iced Glint" },
                ingredients: { ua: ["90мл охолодженого тоніку", "20мл сиропу Summer Breeze", "45мл грейпфрутового фрешу"], en: ["90ml Cold Tonic", "20ml Summer Breeze Syrup", "45ml Grapefruit Juice"] },
                instructions: { ua: "Змішайте сироп з фрешем у шейкері з льодом. Відфільтруйте у стакан і долийте тонік. Прикрасьте цедрою.", en: "Shake syrup and grapefruit juice with ice. Strain into a highball glass filled with ice, then top up with tonic." }
            },
            {
                title: { ua: "Лавандовий Еліксир", en: "Lavender Honey Elixir" },
                ingredients: { ua: ["50мл джину", "15мл сиропу Summer Breeze", "20мл лимонного соку", "Гілочка лаванди"], en: ["50ml Gin", "15ml Summer Breeze Syrup", "20ml Lemon Juice", "Lavender Sprig"] },
                instructions: { ua: "Поєднайте джин, сік та медовий сироп у шейкері з льодом. Енергійно збийте. Подавайте в бокалі купе.", en: "Combine gin, lemon juice, and syrup in a shaker with ice. Shake vigorously and double strain into a chilled coupe." }
            }
        ],
        classic: [
            {
                title: { ua: "Пряний Лате", en: "Spiced Honey Latte" },
                ingredients: { ua: ["Подвійний еспресо", "20мл сиропу Classic Gold", "180мл вівсяного молока", "Дрібка кориці"], en: ["Double Espresso", "20ml Classic Gold Syrup", "180ml Oat Milk", "Pinch of Cinnamon"] },
                instructions: { ua: "Влийте сироп на дно стакана, додайте гарячий еспресо. Збийте молоко до щільної піни та обережно з'єднайте.", en: "Pour syrup at the bottom of the glass, pull fresh espresso shot over it. Steam milk into smooth microfoam and pour in carefully." }
            },
            {
                title: { ua: "Медовий Олд-Фешн", en: "Honeyed Old Fashioned" },
                ingredients: { ua: ["60мл бурбону", "10мл сиропу Classic Gold", "2 краплі біттеру Ангостура", "Цедра апельсина"], en: ["60ml Bourbon", "10ml Classic Gold Syrup", "2 dashes Angostura Bitters", "Orange Peel"] },
                instructions: { ua: "Змішайте бурбон, сироп та біттер у стакані для змішування з льодом протягом 30 секунд. Процідіть на великий кубик льоду.", en: "Stir bourbon, craft syrup, and bitters in a mixing glass with ice until well-chilled. Strain into a rocks glass over a single large ice cube." }
            },
            {
                title: { ua: "Аристократичний Чай", en: "Imperial Spiced Tea" },
                ingredients: { ua: ["200мл чорного чаю Ассам", "25мл сиропу Classic Gold", "Скибочка свіжого лісового яблука"], en: ["200ml Assam Black Tea", "25ml Classic Gold Syrup", "Fresh Forest Apple Slice"] },
                instructions: { ua: "Заваріть міцний чорний чай, додайте порцію крафтового пряного сиропу. Дайте настоятись 2 хвилини з яблуком.", en: "Brew a strong black tea, add a premium portion of spiced gold syrup. Infuse with an apple slice for two minutes before drinking." }
            }
        ],
        winter: [
            {
                title: { ua: "Зимовий Глінтвейн", en: "Artisanal Mulled Wine" },
                ingredients: { ua: ["150мл сухого червоного вина", "30мл сиропу Winter Spice", "Часточка апельсина, зірочка анісу"], en: ["150ml Dry Red Wine", "30ml Winter Spice Syrup", "Orange Slice, Star Anise"] },
                instructions: { ua: "Прогрійте вино з сиропом та апельсином, не доводячи до кипіння. Подавайте в теплому скляному келиху.", en: "Gently warm wine, syrup, and orange slices without reaching a boil. Serve hot in a specialized stem glass with star anise." }
            },
            {
                title: { ua: "Імбирний Грог", en: "Warming Ginger Grog" },
                ingredients: { ua: ["45мл темного пряного рому", "20мл сиропу Winter Spice", "120мл гарячої води", "Скибочка лимону"], en: ["45ml Dark Spiced Rum", "20ml Winter Spice Syrup", "120ml Hot Water", "Lemon Wheel"] },
                instructions: { ua: "У термобокал налийте ром та зимовий сироп. Залийте крутим окропом, вичавіть лимон та перемішайте.", en: "Add dark rum and dense winter syrup into a pre-heated mug. Pour in boiling hot water, squeeze lemon juice, and stir." }
            },
            {
                title: { ua: "Пряне Альпійське Какао", en: "Alpine Spiced Cocoa" },
                ingredients: { ua: ["200мл незбираного молока", "2 ст.л. преміум какао", "25мл сиропу Winter Spice"], en: ["200ml Whole Milk", "2 tbsp Premium Cocoa Powder", "25ml Winter Spice Syrup"] },
                instructions: { ua: "Зваріть густе класичне какао на молоці. Зніміть з вогню і відразу вмішайте сироп для отримання зимового аромату.", en: "Whisk milk and rich cocoa powder together while simmering. Remove from heat sources and vigorously stir in the winter syrup." }
            }
        ]
    };

    const i18n = {
        ua: {
            nav_home: "Головна",
            nav_catalog: "Каталог",
            nav_recipes: "Рецепти",
            nav_about: "Про нас",
            hero_desc_summer: "Легкість літнього сонця та бадьорість дикої свіжої м'яти. Цей сироп наповнить ваші улюблені напої прохолодою, цитрусовим драйвом та делікатною солодкістю лісового меду.",
            hero_desc_classic: "Відкрийте для себе досконалий баланс дикого меду, зібраного в екологічних лісах, та тонких нот натуральних прянощів. Ідеальне доповнення до вашої ранкової кави, вечірнього чаю або авторських коктейлів.",
            hero_desc_winter: "Густий, насичений зігріваючий еліксир для холодних вечорів. Багатий екстракт гірського імбиру та вишуканого мускату створюють затишну атмосферу справжнього альпійського шале.",
            btn_more: "Детальніше",
            catalog_title: "ОБЕРИ <span class='gold-accent'>СМАК</span>",
            card_desc_summer: "Легкий медовий сироп з нотками освіжаючого літнього цитрусу та гірської м'яти.",
            card_desc_classic: "Традиційний рецепт з додаванням благородної кориці, кардамону та духмяної гвоздики.",
            card_desc_winter: "Насичений глибокий темний мед, зігріваючий екстракт імбиру та мускатного горіха.",
            btn_to_cart: "В КОШИК",
            hit_badge: "ХІТ ПРОДАЖІВ",
            recipes_title: "АВТОРСЬКІ <span class='gold-accent'>РЕЦЕПТИ</span>",
            about_title: "ПРО <span class='gold-accent'>BREWMIEL</span>",
            about_p1: "Ми — артизанальна сімейна майстерня, що створює преміальні сиропи та крафтовий мед високої культури смаку. Наша місія полягає в об'єднанні незайманої чистоти натурального меду з витонченим світом гастрономічних спецій.",
            about_p2: "Кожна партія виготовляється вручну невеликими лімітованими об'ємами, використовуючи виключно екологічну сировину з диких лісових пасік. Ми ретельно тестуємо кожен інгредієнт, щоб забезпечити глибокий, оксамитовий післясмак у кожній краплі нашого продукту.",
            about_socials: "Ми в соціальних мережах:",
            cart_header: "Ваш Кошик",
            cart_total: "Загальна сума:",
            form_title: "Дані для доставки",
            form_name: "Ім'я та Прізвище",
            form_phone: "Номер телефону",
            form_address: "Адреса доставки (Нова Пошта / Місто)",
            btn_checkout: "Оформити Замовлення",
            empty_cart: "Ваш кошик порожній. Додайте вишуканих смаків!",
            success_title_order: "Замовлення успішно прийнято!",
            success_msg_order: "Дякуємо за вибір BREWMIEL. Наш менеджер зв'яжеться з вами найближчим часом."
        },
        en: {
            nav_home: "Home",
            nav_catalog: "Catalog",
            nav_recipes: "Recipes",
            nav_about: "About",
            hero_desc_summer: "The lightness of summer sun combined with vibrant mountain mint. This premium syrup infuses your beverages with refreshing coolness, citrus drive, and the delicate notes of forest wild honey.",
            hero_desc_classic: "Discover the flawless harmony of wild organic honey gathered from ecological preserves, combined with trace extractions of natural spices. The definitive addition to your premium coffee, fine tea, or mixology.",
            hero_desc_winter: "A dense, deeply warming elixir optimized for cold nights. The rich essences of ginger root and exquisite nutmeg create the comforting aesthetic ambiance of a high-end alpine chalet.",
            btn_more: "Explore More",
            catalog_title: "SELECT <span class='gold-accent'>FLAVOR</span>",
            card_desc_summer: "Light honey base infused with active citrus elements and refreshing crisp garden mint.",
            card_desc_classic: "Time-honored formula crafted with real cinnamon bark, cardamom pods, and organic cloves.",
            card_desc_winter: "Rich dark bold honey blend with spicy ginger extracts and premium ground nutmeg seeds.",
            btn_to_cart: "ADD TO CART",
            hit_badge: "BESTSELLER",
            recipes_title: "SIGNATURE <span class='gold-accent'>RECIPES</span>",
            about_title: "ABOUT <span class='gold-accent'>BREWMIEL</span>",
            about_p1: "We are an artisanal family workshop producing luxury syrups and craft honey for elevated taste cultures. Our ultimate mission is marrying the untouched purity of wild natural honey with premium culinary spices.",
            about_p2: "Every single batch is processed by hand in strictly limited volumes, drawing from unpolluted deep forest apiaries. We rigorously balance all taste profiles to guarantee an unforgettable velvety aftertaste.",
            about_socials: "Follow our story on socials:",
            cart_header: "Your Cart",
            cart_total: "Total Amount:",
            form_title: "Shipping Details",
            form_name: "Full Name",
            form_phone: "Phone Number",
            form_address: "Shipping Address (City, Courier Depot No.)",
            btn_checkout: "Complete Checkout",
            empty_cart: "Your cart is currently empty. Add some luxury flavors!",
            success_title_order: "Order Received!",
            success_msg_order: "Thank you for choosing BREWMIEL. Our representative will contact you shortly."
        }
    };

    /* SCROLLSPY Navigation Logic */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(li => {
            li.classList.remove("active");
            if (li.getAttribute("href").includes(current)) {
                li.classList.add("active");
            }
        });
    });

    /* TRANSLATION LOGIC */
    function applyLocalization() {
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (i18n[currentLang][key]) {
                element.innerHTML = i18n[currentLang][key];
            }
        });

        const activeHeroFlavor = document.querySelector(".thumb-btn.active").getAttribute("data-flavor");
        updateHeroText(activeHeroFlavor);
        
        const activeRecipeTab = document.querySelector(".recipe-tab-btn.active").getAttribute("data-recipe-flavor");
        renderRecipes(activeRecipeTab);
        
        if (currentLang === "en") {
            document.getElementById("client-name").placeholder = "John Doe";
            document.getElementById("client-phone").placeholder = "+1 555 123 4567";
            document.getElementById("client-address").placeholder = "New York, Fedex Office #14";
        } else {
            document.getElementById("client-name").placeholder = "Іван Іванов";
            document.getElementById("client-phone").placeholder = "+380 99 999 9999";
            document.getElementById("client-address").placeholder = "Київ, Відділення №1";
        }
        
        renderCart();
    }

    // Toggle Flag & Lang Button
    document.getElementById("lang-toggle").addEventListener("click", function() {
        currentLang = currentLang === "ua" ? "en" : "ua";
        
        const flag = currentLang === "ua" ? "🇬🇧" : "🇺🇦";
        const txt = currentLang === "ua" ? "EN" : "UA";
        
        this.innerHTML = `<span class="lang-flag">${flag}</span> <span class="lang-text">${txt}</span>`;
        applyLocalization();
    });

    /* HERO UPDATE LOGIC */
    function updateHeroText(flavor) {
        const subElement = document.getElementById("hero-flavor-subtitle");
        const descElement = document.getElementById("hero-description");
        const imgElement = document.getElementById("main-bottle-img");
        const fallbackEdition = document.getElementById("fallback-edition");

        subElement.innerText = flavorData[flavor].subtitle[currentLang];
        descElement.setAttribute("data-i18n", `hero_desc_${flavor}`);
        descElement.innerHTML = i18n[currentLang][`hero_desc_${flavor}`];
        
        imgElement.src = flavorData[flavor].img;
        fallbackEdition.innerText = `${flavor.toUpperCase()} EDITION`;
        
        const wrapper = document.querySelector(".main-bottle-wrapper");
        wrapper.className = "main-bottle-wrapper";
    }

    document.querySelectorAll(".thumb-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".thumb-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            
            const selectedFlavor = this.getAttribute("data-flavor");
            updateHeroText(selectedFlavor);
            alignCarouselToFlavor(selectedFlavor);
        });
    });

    /* INFINITE CAROUSEL */
    function updateCarouselDOM() {
        const cards = document.querySelectorAll(".product-card");
        cards.forEach(card => {
            const cardFlavor = card.getAttribute("data-flavor");
            const absolutePositionIndex = flavorsOrder.indexOf(cardFlavor);
            
            card.classList.remove("card-position-left", "card-position-center", "card-position-right");
            
            if (absolutePositionIndex === 0) card.classList.add("card-position-left");
            else if (absolutePositionIndex === 1) card.classList.add("card-position-center");
            else if (absolutePositionIndex === 2) card.classList.add("card-position-right");
        });
        
        const currentCenterFlavor = flavorsOrder[1];
        document.querySelectorAll(".thumb-btn").forEach(b => {
            b.classList.remove("active");
            if (b.getAttribute("data-flavor") === currentCenterFlavor) b.classList.add("active");
        });
        updateHeroText(currentCenterFlavor);
    }

    function rotateCarouselRight() {
        const lastElement = flavorsOrder.pop();
        flavorsOrder.unshift(lastElement);
        updateCarouselDOM();
    }

    function rotateCarouselLeft() {
        const firstElement = flavorsOrder.shift();
        flavorsOrder.push(firstElement);
        updateCarouselDOM();
    }

    function alignCarouselToFlavor(targetFlavor) {
        while (flavorsOrder[1] !== targetFlavor) {
            rotateCarouselRight();
        }
    }

    document.getElementById("carousel-next").addEventListener("click", rotateCarouselRight);
    document.getElementById("carousel-prev").addEventListener("click", rotateCarouselLeft);

    /* RECIPES */
    function renderRecipes(flavor) {
        const grid = document.getElementById("recipes-grid");
        grid.innerHTML = "";
        
        const currentRecipesList = recipesData[flavor];
        currentRecipesList.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "recipe-item-card";
            
            let ingredientsHTML = "";
            recipe.ingredients[currentLang].forEach(ing => { ingredientsHTML += `<li>• ${ing}</li>`; });

            card.innerHTML = `
                <h3 class="recipe-card-title gold-accent">${recipe.title[currentLang]}</h3>
                <ul class="recipe-components-list">${ingredientsHTML}</ul>
                <p class="recipe-instruction-text">${recipe.instructions[currentLang]}</p>
            `;
            grid.appendChild(card);
        });
    }

    document.querySelectorAll(".recipe-tab-btn").forEach(tab => {
        tab.addEventListener("click", function() {
            document.querySelectorAll(".recipe-tab-btn").forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            renderRecipes(this.getAttribute("data-recipe-flavor"));
        });
    });

    /* CART SYSTEM */
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("ui-blur-backdrop");
    const badge = document.getElementById("cart-badge");

    function toggleCartView(open = true) {
        if (open) { drawer.classList.add("open"); backdrop.classList.add("active"); } 
        else { drawer.classList.remove("open"); backdrop.classList.remove("active"); }
    }

    document.getElementById("cart-trigger").addEventListener("click", () => toggleCartView(true));
    document.getElementById("cart-close").addEventListener("click", () => toggleCartView(false));
    backdrop.addEventListener("click", () => {
        toggleCartView(false);
        document.getElementById("mobile-menu-overlay").classList.remove("open");
    });

    function renderCart() {
        const container = document.getElementById("cart-items-container");
        container.innerHTML = "";
        
        if (cart.length === 0) {
            container.innerHTML = `<p class="empty-cart-text">${i18n[currentLang].empty_cart}</p>`;
            badge.style.display = "none";
            document.getElementById("cart-total-price").innerText = "0 ₴";
            return;
        }

        badge.style.display = "block";
        let runningTotal = 0;

        cart.forEach(item => {
            runningTotal += item.price * item.quantity;
            const itemRow = document.createElement("div");
            itemRow.className = "cart-item";
            
            itemRow.innerHTML = `
                <div class="cart-item-thumb-box">
                    <img src="${flavorData[item.flavor].img}" alt="Syrup Thumb" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <i class="fa-solid fa-droplet gold-accent" style="display:none; font-size:1.1rem;"></i>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-price">${item.price * item.quantity} ₴</span>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn minus-qty" data-flavor="${item.flavor}"><i class="fa-solid fa-minus"></i></button>
                    <span class="qty-num">${item.quantity}</span>
                    <button class="qty-btn plus-qty" data-flavor="${item.flavor}"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="cart-item-remove-btn delete-item" data-flavor="${item.flavor}"><i class="fa-solid fa-trash-can"></i></button>
            `;
            container.appendChild(itemRow);
        });

        document.getElementById("cart-total-price").innerText = `${runningTotal} ₴`;
        attachCartModifiers();
    }

    function attachCartModifiers() {
        document.querySelectorAll(".plus-qty").forEach(b => {
            b.addEventListener("click", function() {
                const f = this.getAttribute("data-flavor");
                const item = cart.find(i => i.flavor === f);
                if (item) item.quantity += 1;
                renderCart();
            });
        });

        document.querySelectorAll(".minus-qty").forEach(b => {
            b.addEventListener("click", function() {
                const f = this.getAttribute("data-flavor");
                const item = cart.find(i => i.flavor === f);
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity <= 0) cart = cart.filter(i => i.flavor !== f);
                }
                renderCart();
            });
        });

        document.querySelectorAll(".delete-item").forEach(b => {
            b.addEventListener("click", function() {
                const f = this.getAttribute("data-flavor");
                cart = cart.filter(i => i.flavor !== f);
                renderCart();
            });
        });
    }

    // Add to cart with embedded button animation
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart-btn")) {
            const flavor = e.target.getAttribute("data-flavor");
            
            const pName = e.target.getAttribute("data-name") || flavorData[flavor].title;
            const pPrice = parseInt(e.target.getAttribute("data-price")) || 500;
            const dynamicName = flavor === "classic" ? "Classic Gold" : (flavor === "summer" ? "Summer Breeze" : "Winter Spice");

            const existingRecord = cart.find(i => i.flavor === flavor);
            if (existingRecord) existingRecord.quantity += 1;
            else cart.push({ flavor: flavor, name: dynamicName, price: pPrice, quantity: 1 });
            
            renderCart();

            // Temp Button Animation instead of Pop-up Modal
            const originalText = e.target.innerHTML;
            e.target.innerHTML = `<i class="fa-solid fa-check"></i>`;
            e.target.classList.add("btn-success-anim");
            
            setTimeout(() => {
                e.target.innerHTML = originalText;
                e.target.classList.remove("btn-success-anim");
            }, 1500);
        }
    });

    /* CHECKOUT SUBMISSION */
    document.getElementById("checkout-form").addEventListener("submit", function(e) {
        e.preventDefault();
        if (cart.length === 0) return;
        
        cart = [];
        renderCart();
        toggleCartView(false);
        this.reset();
        
        document.getElementById("success-title").innerText = i18n[currentLang].success_title_order;
        document.getElementById("success-message").innerText = i18n[currentLang].success_msg_order;
        
        const successModal = document.getElementById("success-modal");
        successModal.classList.add("active");
        backdrop.classList.add("active");
    });

    document.getElementById("success-close-btn").addEventListener("click", () => {
        document.getElementById("success-modal").classList.remove("active");
        backdrop.classList.remove("active");
    });

    /* MOBILE NAV */
    const mobileMenu = document.getElementById("mobile-menu-overlay");
    document.getElementById("menu-trigger").addEventListener("click", () => mobileMenu.classList.add("open"));
    document.getElementById("menu-close").addEventListener("click", () => mobileMenu.classList.remove("open"));
    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });

    applyLocalization();
    renderRecipes("classic");
});