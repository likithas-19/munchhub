// Munch Hub - Core Frontend Logic, State Synchronization, & Reusable UI Components

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupNavigationHooks();
    updateSidebarProfile();
    updateCartCount();
    injectGlobalVegFilterAndSidebar();
    updateAdminSidebarAlerts();
});

// 1. THEME INITIALIZATION & TOGGLING
function initTheme() {
    const savedTheme = localStorage.getItem("munch_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Add floating theme toggle button dynamically if not present
    if (!document.querySelector(".theme-toggle-btn")) {
        const toggleBtn = document.createElement("button");
        toggleBtn.className = "theme-toggle-btn";
        toggleBtn.innerHTML = savedTheme === "light" ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        toggleBtn.title = "Toggle Theme";
        toggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("munch_theme", newTheme);
            toggleBtn.innerHTML = newTheme === "light" ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        });
        document.body.appendChild(toggleBtn);
    }
}

// 2. REUSABLE CARD RENDERERS (Ensures beautiful layouts everywhere)
function createFoodCardHTML(food, restaurantName = "") {
    if (!restaurantName) {
        const restaurants = JSON.parse(localStorage.getItem("munch_restaurants")) || [];
        const rest = restaurants.find(r => r.id === food.restaurantId);
        restaurantName = rest ? rest.name : "Munch Partner";
    }
    
    const isVeg = food.veg === true || food.veg === "true";
    const vegBadge = isVeg ? 
        `<span class="badge munch-badge" style="background-color: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.25);"><i class="fa-solid fa-leaf"></i> Veg</span>` : 
        `<span class="badge munch-badge" style="background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.25);"><i class="fa-solid fa-drumstick-bite"></i> Non-Veg</span>`;
        
    // Programmatically ensure a beautiful image fallback if missing or empty
    const imageSrc = food.image && food.image.trim() ? food.image : "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80";
        
    return `
        <div class="card glass-card food-card h-100" data-food-id="${food.id}" data-is-veg="${isVeg}">
            <div class="food-card-img-wrapper">
                <img src="${imageSrc}" class="food-card-img" alt="${food.name}">
                <div class="position-absolute top-0 start-0 end-0 p-3 d-flex flex-wrap gap-2 align-items-center" style="z-index: 5;">
                    <span class="badge munch-badge badge-glow-primary">
                        <i class="fa-solid fa-tag"></i> ${food.category}
                    </span>
                    ${vegBadge}
                    ${food.trending ? `
                    <span class="badge munch-badge badge-glow-secondary">
                        <i class="fa-solid fa-fire"></i> Trending
                    </span>` : ''}
                </div>
            </div>
            <div class="food-card-content d-flex flex-column justify-content-between flex-grow-1">
                <div>
                    <h5 class="card-title text-truncate mb-1">${food.name}</h5>
                    <p class="text-muted small mb-2 cursor-pointer restaurant-redirect-link" data-restaurant-id="${food.restaurantId}">
                        <i class="fa-solid fa-store text-primary"></i> ${restaurantName}
                    </p>
                    <p class="card-text text-secondary small line-clamp-2 mb-3">${food.description}</p>
                </div>
                <div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="h5 text-primary font-weight-bold mb-0">₹${food.price}</span>
                        <span class="text-warning small"><i class="fa-solid fa-star"></i> ${food.rating}</span>
                    </div>
                    <button class="munch-btn munch-btn-primary w-100 add-to-cart-btn" data-food-id="${food.id}">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createRestaurantCardHTML(restaurant) {
    return `
        <div class="card glass-card h-100 cursor-pointer restaurant-card" data-restaurant-id="${restaurant.id}">
            <div class="food-card-img-wrapper" style="height: 150px;">
                <img src="${restaurant.image}" class="food-card-img" alt="${restaurant.name}">
                <span class="position-absolute top-0 start-0 m-3 badge munch-badge badge-glow-primary">
                    <i class="fa-solid fa-motorcycle"></i> ${restaurant.averageTime}
                </span>
            </div>
            <div class="food-card-content">
                <h5 class="card-title mb-1">${restaurant.name}</h5>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-warning small"><i class="fa-solid fa-star"></i> ${restaurant.rating}</span>
                    <span class="text-muted small"><i class="fa-solid fa-location-dot text-primary"></i> ${restaurant.distance} mins away</span>
                </div>
                <p class="card-text text-secondary small line-clamp-2 mb-0">${restaurant.description}</p>
            </div>
        </div>
    `;
}

// 3. CART MANAGEMENT STATE
const CartManager = {
    get() {
        return JSON.parse(localStorage.getItem("munch_cart")) || [];
    },
    
    save(cart) {
        localStorage.setItem("munch_cart", JSON.stringify(cart));
        updateCartCount();
    },
    
    add(foodId, qty = 1) {
        const foods = JSON.parse(localStorage.getItem("munch_foods")) || [];
        const food = foods.find(f => f.id === parseInt(foodId));
        if (!food) return;

        let cart = this.get();
        const existing = cart.find(item => item.id === food.id);

        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                restaurantId: food.restaurantId,
                quantity: qty
            });
        }
        this.save(cart);
        showToast(`Added ${food.name} to cart!`);
    },
    
    updateQty(foodId, qty) {
        let cart = this.get();
        const item = cart.find(i => i.id === parseInt(foodId));
        if (item) {
            item.quantity = parseInt(qty);
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== parseInt(foodId));
            }
        }
        this.save(cart);
    },
    
    remove(foodId) {
        let cart = this.get();
        cart = cart.filter(i => i.id !== parseInt(foodId));
        this.save(cart);
    },
    
    clear() {
        this.save([]);
    },
    
    getTotal() {
        return this.get().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
};

// Update cart counter badges globally
function updateCartCount() {
    const cart = CartManager.get();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
        badge.innerText = count;
        badge.style.display = count > 0 ? "inline-block" : "none";
    });
}

// 4. TOAST NOTIFICATION HELPERS
function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.left = "20px";
        container.style.zIndex = "9999";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `glass-card p-3 mb-2 d-flex align-items-center text-white border-0 shadow`;
    toast.style.background = type === "success" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
    toast.style.minWidth = "250px";
    toast.style.animation = "slideIn 0.3s ease forwards";
    
    toast.innerHTML = `
        <div class="me-3"><i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}"></i></div>
        <div class="flex-grow-1 small font-weight-bold">${message}</div>
        <button type="button" class="btn-close btn-close-white ms-auto small" style="outline:none;box-shadow:none;"></button>
    `;

    toast.querySelector(".btn-close").addEventListener("click", () => {
        toast.remove();
    });

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "slideOut 0.3s ease forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// CSS animations injected dynamically for Toast
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes slideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// 5. UNIVERSAL CLICK REDIRECTIONS
function setupNavigationHooks() {
    document.body.addEventListener("click", (e) => {
        // 1. Food Card Clicks (Exclude Add-To-Cart button interactions)
        const foodCard = e.target.closest("[data-food-id]");
        if (foodCard && !e.target.closest(".add-to-cart-btn") && !e.target.closest(".restaurant-redirect-link")) {
            const foodId = foodCard.getAttribute("data-food-id");
            window.location.href = `food-details.html?id=${foodId}`;
            return;
        }

        // 2. Add To Cart Button Clicks
        const addBtn = e.target.closest(".add-to-cart-btn");
        if (addBtn) {
            const foodId = addBtn.getAttribute("data-food-id");
            CartManager.add(foodId);
            return;
        }

        // 3. Restaurant Clicks
        const restCard = e.target.closest("[data-restaurant-id]");
        if (restCard) {
            const restId = restCard.getAttribute("data-restaurant-id");
            window.location.href = `restaurant-details.html?id=${restId}`;
            return;
        }
    });
}

// 6. PROFILE DATA SYNC
function updateSidebarProfile() {
    const user = JSON.parse(localStorage.getItem("munch_user"));
    if (user) {
        const welcomeTexts = document.querySelectorAll(".profile-welcome-name");
        welcomeTexts.forEach(el => el.innerText = user.name.split(" ")[0]);
        
        const collegeTexts = document.querySelectorAll(".profile-welcome-college");
        collegeTexts.forEach(el => el.innerText = user.college);

        const emailTexts = document.querySelectorAll(".profile-welcome-email");
        emailTexts.forEach(el => el.innerText = user.email);
    }
}

// Helper to query URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 7. DYNAMIC VEG FILTER & SIDEBAR TRACKER INJECTOR
function injectGlobalVegFilterAndSidebar() {
    // A. Inject "Track Orders" Link in Sidebar if Sidebar Menu exists
    const isAdminPage = window.location.pathname.toLowerCase().includes("admin-") || 
                        !!document.querySelector(".admin-sidebar") || 
                        !!document.querySelector(".admin-main");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    if (sidebarMenu && !document.getElementById("sidebarTrackOrdersLink")) {
        const li = document.createElement("li");
        li.className = "sidebar-item";
        
        if (isAdminPage) {
            li.innerHTML = `
                <a href="admin-track-order.html" id="sidebarTrackOrdersLink" class="sidebar-link position-relative">
                    <i class="fa-solid fa-route"></i> Track Dispatches
                    <span class="position-absolute end-0 me-3 translate-middle-y badge rounded-pill bg-warning text-dark active-orders-badge" style="font-size: 0.65rem; top: 50%; display: none;">0</span>
                </a>
            `;
            sidebarMenu.appendChild(li);
            
            // Update active dispatches count for admin
            const adminOrders = JSON.parse(localStorage.getItem("munch_orders")) || [];
            const activeDispatches = adminOrders.filter(o => o.status === 'Dispatched' || o.status === 'Out for Delivery').length;
            const badge = li.querySelector(".active-orders-badge");
            if (activeDispatches > 0) {
                badge.innerText = activeDispatches;
                badge.style.display = "inline-block";
            }
        } else {
            li.innerHTML = `
                <a href="track-order.html" id="sidebarTrackOrdersLink" class="sidebar-link position-relative">
                    <i class="fa-solid fa-route"></i> Track Orders
                    <span class="position-absolute end-0 me-3 translate-middle-y badge rounded-pill bg-success active-orders-badge" style="font-size: 0.65rem; top: 50%; display: none;">0</span>
                </a>
            `;
            sidebarMenu.appendChild(li);
            
            // Update active orders badge for student
            const user = JSON.parse(localStorage.getItem("munch_user")) || {};
            const activeOrdersCount = (user.orders || []).filter(o => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Dispatched').length;
            const badge = li.querySelector(".active-orders-badge");
            if (activeOrdersCount > 0) {
                badge.innerText = activeOrdersCount;
                badge.style.display = "inline-block";
            }
        }
    }

    // Highlight active sidebar links for Track Orders
    if (window.location.pathname.toLowerCase().includes("track-order.html")) {
        document.querySelectorAll(".sidebar-link").forEach(link => link.classList.remove("active"));
        setTimeout(() => {
            const trackLink = document.getElementById("sidebarTrackOrdersLink");
            if (trackLink) trackLink.classList.add("active");
        }, 50);
    }

    // B. Inject Veg/Non-Veg Filter Pill Group in Sticky Navbar
    const navbarActions = document.querySelector(".navbar-collapse .d-flex.align-items-center.gap-3");
    if (navbarActions && !document.querySelector(".munch-veg-filter-pill-group")) {
        const filterGroup = document.createElement("div");
        filterGroup.className = "munch-veg-filter-pill-group btn-group rounded-pill p-1 bg-secondary bg-opacity-10 border border-secondary me-2";
        filterGroup.style.height = "38px";
        filterGroup.style.display = "inline-flex";
        filterGroup.style.alignItems = "center";
        
        const activeFilter = localStorage.getItem("munch_veg_filter") || "all";
        
        filterGroup.innerHTML = `
            <button class="btn btn-sm rounded-pill px-3 py-1 text-secondary font-weight-bold" data-filter="all" style="font-size: 0.75rem; border: none; transition: var(--transition-smooth); background: ${activeFilter === 'all' ? 'var(--gradient-primary)' : 'transparent'}; color: ${activeFilter === 'all' ? '#white !important' : 'var(--text-secondary)'};">All</button>
            <button class="btn btn-sm rounded-pill px-3 py-1 text-secondary font-weight-bold" data-filter="veg" style="font-size: 0.75rem; border: none; transition: var(--transition-smooth); background: ${activeFilter === 'veg' ? 'var(--gradient-primary)' : 'transparent'}; color: ${activeFilter === 'veg' ? '#white !important' : 'var(--text-secondary)'};"><i class="fa-solid fa-leaf text-success me-1"></i>Veg</button>
            <button class="btn btn-sm rounded-pill px-3 py-1 text-secondary font-weight-bold" data-filter="nonveg" style="font-size: 0.75rem; border: none; transition: var(--transition-smooth); background: ${activeFilter === 'nonveg' ? 'var(--gradient-primary)' : 'transparent'}; color: ${activeFilter === 'nonveg' ? '#white !important' : 'var(--text-secondary)'};"><i class="fa-solid fa-drumstick-bite text-danger me-1"></i>Non-Veg</button>
        `;
        
        navbarActions.insertBefore(filterGroup, navbarActions.firstChild);
        
        // Add click events to filter buttons
        filterGroup.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetFilter = btn.getAttribute("data-filter");
                localStorage.setItem("munch_veg_filter", targetFilter);
                
                // Redraw filter buttons
                filterGroup.querySelectorAll("button").forEach(b => {
                    const isTarget = b.getAttribute("data-filter") === targetFilter;
                    b.style.background = isTarget ? 'var(--gradient-primary)' : 'transparent';
                    b.classList.toggle("active-filter-btn", isTarget);
                });
                
                showToast(`Filter set to: ${targetFilter === 'all' ? 'Show All' : targetFilter === 'veg' ? 'Veg Only' : 'Non-Veg Only'}`);
                
                // Apply visibility filtering
                applyVegFilterVisibility();
                
                // Page-specific trigger hooks
                if (typeof window.renderFilteredMenu === "function") window.renderFilteredMenu();
                if (typeof window.renderMenuPage === "function") window.renderMenuPage();
                if (typeof window.renderBudgetPlanner === "function") window.renderBudgetPlanner();
                if (typeof window.renderMoodRecommendations === "function") {
                    const activeMood = document.querySelector(".mood-selector-card.active")?.getAttribute("data-mood") || "Happy";
                    window.renderMoodRecommendations(activeMood);
                }
                if (typeof window.renderStudyRecommendations === "function") {
                    const activeStudyMode = document.querySelector(".study-tab-btn.active")?.getAttribute("data-mode") || "Coding";
                    window.renderStudyRecommendations(activeStudyMode);
                }
            });
        });
    }

    // Apply visibility filter initially
    applyVegFilterVisibility();
}

function applyVegFilterVisibility() {
    const activeFilter = localStorage.getItem("munch_veg_filter") || "all";
    const foodCards = document.querySelectorAll(".food-card, tr[data-food-id]");
    foodCards.forEach(card => {
        const isVeg = card.getAttribute("data-is-veg") === "true";
        const isRow = card.tagName.toLowerCase() === "tr";
        const col = isRow ? null : card.closest(".col-md-6, .col-lg-4, .col-lg-3, .col-12");
        const targetElement = col || card;
        
        let hide = false;
        if (activeFilter === "veg" && !isVeg) hide = true;
        if (activeFilter === "nonveg" && isVeg) hide = true;
        
        if (hide) {
            targetElement.classList.add("d-none");
            targetElement.setAttribute("style", "display: none !important;");
        } else {
            targetElement.classList.remove("d-none");
            targetElement.removeAttribute("style");
        }
    });
}

// Dynamic Admin sidebar alert for payment approvals
function updateAdminSidebarAlerts() {
    const adminOrders = JSON.parse(localStorage.getItem("munch_orders")) || [];
    const awaitingApprovalCount = adminOrders.filter(o => o.status === "Paid (Awaiting Approval)").length;
    
    // Locate Manage Orders link in sidebar
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach(link => {
        if (link.innerHTML.includes("Manage Orders")) {
            // Remove existing badge if any
            const oldBadge = link.querySelector(".admin-approval-badge");
            if (oldBadge) oldBadge.remove();
            
            if (awaitingApprovalCount > 0) {
                const badge = document.createElement("span");
                badge.className = "badge rounded-pill bg-danger ms-2 admin-approval-badge badge-glow-secondary";
                badge.style.fontSize = "0.7rem";
                badge.style.padding = "0.35em 0.6em";
                badge.style.border = "1px solid rgba(236, 72, 153, 0.25)";
                badge.innerText = awaitingApprovalCount;
                link.appendChild(badge);
            }
        }
    });
}

// Export utilities
window.createFoodCardHTML = createFoodCardHTML;
window.createRestaurantCardHTML = createRestaurantCardHTML;
window.CartManager = CartManager;
window.showToast = showToast;
window.getUrlParam = getUrlParam;
window.applyVegFilterVisibility = applyVegFilterVisibility;
window.injectGlobalVegFilterAndSidebar = injectGlobalVegFilterAndSidebar;
window.updateAdminSidebarAlerts = updateAdminSidebarAlerts;
