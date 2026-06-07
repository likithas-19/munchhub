// Munch Hub - Dynamic Mock Database for Foods and Restaurants

const MunchData = {
    restaurants: [
        {
            id: 1,
            name: "Vidyarthi Bhavan (Gandhi Bazaar)",
            rating: 4.8,
            distance: 2, // Node C in graph
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
            banner: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
            description: "The heritage food hub of Bangalore, legendary for serving the crispiest, butter-soaked Masala Dosas and aromatic Filter Coffee since 1943.",
            categories: ["South Indian", "Traditional", "Snacks"],
            averageTime: "10 mins"
        },
        {
            id: 2,
            name: "Corner House Ice Cream (Sadashivanagar)",
            rating: 4.9,
            distance: 4, // Node L in graph
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
            banner: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
            description: "The ultimate dessert spot in Bangalore. Famously home to the legendary 'Death by Chocolate' (DBC) and delicious hot fudge sundaes.",
            categories: ["Desserts", "Ice Creams", "Shakes"],
            averageTime: "15 mins"
        },
        {
            id: 3,
            name: "Empire Restaurant (Jayanagar)",
            rating: 4.2,
            distance: 5, // Node S in graph
            image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
            banner: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1200&q=80",
            description: "Bangalore's night owls' savior. Open till late night, serving mouthwatering Empire Grilled Chicken, Ghee Rice, and spicy chicken kebabs.",
            categories: ["Fast Food", "Mughlai", "Late Night"],
            averageTime: "20 mins"
        },
        {
            id: 4,
            name: "Meghana Foods (Indiranagar)",
            rating: 4.7,
            distance: 3, // Node N in graph
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
            banner: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
            description: "An absolute emotion in Bangalore. Renowned for its spicy, flavorful, and loaded boneless Andhra-style Chicken Biryani.",
            categories: ["Biryani", "Andhra Spicy", "Non-Veg"],
            averageTime: "12 mins"
        },
        {
            id: 5,
            name: "Truffles (Koramangala)",
            rating: 4.6,
            distance: 6, // Node H in graph
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
            banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
            description: "The favorite burger café of Bangalore students, serving massive All-American cheese burgers, loaded chicken wraps, and shakes.",
            categories: ["Burgers", "Continental", "Beverages"],
            averageTime: "15 mins"
        }
    ],

    foods: [
        // === SOUTH INDIAN ===
        {
            id: 102,
            name: "VB Crispy Masala Dosa",
            price: 80,
            rating: 4.8,
            restaurantId: 1,
            category: "South Indian",
            image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80",
            description: "Legendary Vidyarthi Bhavan dosa: thick, crispy, golden-brown fermented rice crepe soaked in pure ghee, stuffed with potato mash. Served with coconut chutney.",
            moods: ["Happy", "Tired"],
            study: ["Assignment Work"],
            trending: true,
            popularity: 185,
            calories: 320,
            veg: true
        },
        {
            id: 106,
            name: "VB Single Idli & Vada Combo",
            price: 60,
            rating: 4.7,
            restaurantId: 1,
            category: "South Indian",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
            description: "One feather-light steamed rice idli and one super crispy urad dal vada served with hot sambar and traditional Vidyarthi Bhavan thick coconut chutney.",
            moods: ["Tired"],
            study: ["Exam Preparation"],
            trending: false,
            popularity: 95,
            calories: 220,
            veg: true
        },
        {
            id: 113,
            name: "VB Chow Chow Bath",
            price: 70,
            rating: 4.6,
            restaurantId: 1,
            category: "South Indian",
            image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80",
            description: "Classic sweet-salty combination of saffron-hued Kesari Bath (sweet semolina pudding) and spicy Khara Bath (savory semolina cooked with vegetables).",
            moods: ["Happy", "Tired"],
            study: ["Assignment Work"],
            trending: false,
            popularity: 70,
            calories: 390,
            veg: true
        },
        {
            id: 114,
            name: "MTR Special Rava Idli",
            price: 75,
            rating: 4.7,
            restaurantId: 1,
            category: "South Indian",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
            description: "Genuine semolina idli mixed with curd, coriander, mustard seeds, cashew nuts, and ghee, invented by Mavalli Tiffin Room. Served with potato sagu.",
            moods: ["Tired", "Stressed"],
            study: ["Coding"],
            trending: true,
            popularity: 110,
            calories: 280,
            veg: true
        },
        {
            id: 115,
            name: "CTR Malleshwaram Butter Dosa",
            price: 90,
            rating: 4.9,
            restaurantId: 1,
            category: "South Indian",
            image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80",
            description: "Bangalore CTR style Benne Masala Dosa: outer shell incredibly crispy, loaded with melted butter, with a soft inner layer and spicy potato mash.",
            moods: ["Happy", "Excited"],
            study: ["Late Night Study"],
            trending: true,
            popularity: 195,
            calories: 410,
            veg: true
        },

        // === FAST FOOD ===
        {
            id: 101,
            name: "Meghana Chicken Biryani",
            price: 280,
            rating: 4.8,
            restaurantId: 4,
            category: "Fast Food",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
            description: "Andhra-style spicy, loaded biryani with tender boneless chicken pieces, layered in aromatic long-grain basmati rice. Served with raita and salan.",
            moods: ["Happy", "Excited"],
            study: ["Late Night Study"],
            trending: true,
            popularity: 240,
            calories: 680,
            veg: false
        },
        {
            id: 104,
            name: "Empire Grilled Chicken (Half)",
            price: 180,
            rating: 4.3,
            restaurantId: 3,
            category: "Fast Food",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80",
            description: "Half chicken marinated overnight in Empire's secret spice mix, grilled over lava stones, served with dynamic garlic mayonnaise dip.",
            moods: ["Excited", "Happy"],
            study: ["Late Night Study"],
            trending: false,
            popularity: 120,
            calories: 550,
            veg: false
        },
        {
            id: 105,
            name: "Truffles All-American Burger",
            price: 165,
            rating: 4.7,
            restaurantId: 5,
            category: "Fast Food",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
            description: "Crispy grilled house veggie patty topped with melting American cheddar, pickles, crunch lettuce, red onion rings, and Truffles secret burger sauce.",
            moods: ["Happy", "Stressed"],
            study: ["Coding"],
            trending: true,
            popularity: 180,
            calories: 520,
            veg: true
        },
        {
            id: 107,
            name: "Truffles Crunchy Chicken Burger",
            price: 195,
            rating: 4.6,
            restaurantId: 5,
            category: "Fast Food",
            image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80",
            description: "Massive hand-crumbed crispy chicken fillet, deep fried, layered with fresh lettuce, onions, and lots of spicy garlic mayonnaise in warm sesame buns.",
            moods: ["Happy", "Excited"],
            study: ["Coding", "Late Night Study"],
            trending: true,
            popularity: 190,
            calories: 610,
            veg: false
        },
        {
            id: 108,
            name: "Empire Special Chicken Kebab",
            price: 160,
            rating: 4.5,
            restaurantId: 3,
            category: "Fast Food",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80",
            description: "5 pieces of deep-fried, heavily spiced, crunchy Bangalore-style red chicken kebabs. Garnished with sliced lime and onions.",
            moods: ["Tired", "Excited"],
            study: ["Late Night Study"],
            trending: true,
            popularity: 145,
            calories: 420,
            veg: false
        },
        {
            id: 116,
            name: "Leon Grill Hot Spicy Wings",
            price: 175,
            rating: 4.4,
            restaurantId: 5,
            category: "Fast Food",
            image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=500&q=80",
            description: "6 pieces of juicy chicken wings fried to golden perfection and drenched in Leon Grill's signature hot peri-peri glaze.",
            moods: ["Excited", "Happy"],
            study: ["Coding"],
            trending: false,
            popularity: 88,
            calories: 480,
            veg: false
        },

        // === COFFEE & SHAKES ===
        {
            id: 111,
            name: "VB Bangalore Filter Coffee",
            price: 35,
            rating: 4.9,
            restaurantId: 1,
            category: "Coffee & Shakes",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80",
            description: "Traditional Bangalore milk chicory coffee brewed in a brass filter, hand-pulled frothy, and served steaming hot in steel tumblers.",
            moods: ["Tired", "Stressed"],
            study: ["Exam Preparation", "Coding"],
            trending: true,
            popularity: 300,
            calories: 90,
            veg: true
        },
        {
            id: 117,
            name: "Third Wave Iced Coffee Latte",
            price: 190,
            rating: 4.8,
            restaurantId: 5,
            category: "Coffee & Shakes",
            image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80",
            description: "Signature cold brewed specialty coffee shot, hand shaken with chilled organic milk and a splash of hazelnut syrup.",
            moods: ["Tired", "Stressed"],
            study: ["Coding", "Exam Preparation"],
            trending: true,
            popularity: 165,
            calories: 140,
            veg: true
        },
        {
            id: 118,
            name: "Corner House Thick Chocolate Shake",
            price: 170,
            rating: 4.7,
            restaurantId: 2,
            category: "Coffee & Shakes",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80",
            description: "Extra thick gourmet milkshake crafted with double scoops of premium Corner House dark chocolate ice cream and hot fudge.",
            moods: ["Stressed", "Tired"],
            study: ["Assignment Work"],
            trending: false,
            popularity: 120,
            calories: 380,
            veg: true
        },
        {
            id: 119,
            name: "Glen's Red Velvet Shake",
            price: 160,
            rating: 4.6,
            restaurantId: 2,
            category: "Coffee & Shakes",
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&q=80",
            description: "Chilled milkshake blended with crumbs of Glen's Bakehouse iconic Red Velvet Cake, milk, and cream cheese syrup.",
            moods: ["Happy", "Excited"],
            study: ["Coding"],
            trending: true,
            popularity: 130,
            calories: 420,
            veg: true
        },

        // === CHINESE ===
        {
            id: 120,
            name: "Empire Chicken Fried Rice",
            price: 190,
            rating: 4.4,
            restaurantId: 3,
            category: "Chinese",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80",
            description: "Wok-tossed long grain basmati rice, eggs, tender chicken chunks, spring onions, and garlic, seasoned with soy sauce.",
            moods: ["Tired", "Stressed"],
            study: ["Late Night Study"],
            trending: true,
            popularity: 155,
            calories: 520,
            veg: false
        },
        {
            id: 121,
            name: "Empire Veg Schezwan Noodles",
            price: 170,
            rating: 4.2,
            restaurantId: 3,
            category: "Chinese",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
            description: "Spicy Schezwan noodles stir fried in a raging hot wok with cabbage, carrot, bell peppers, celery, and house Schezwan chili paste.",
            moods: ["Tired", "Stressed"],
            study: ["Exam Preparation"],
            trending: false,
            popularity: 90,
            calories: 440,
            veg: true
        },
        {
            id: 122,
            name: "Meghana Spicy Chilli Chicken",
            price: 240,
            rating: 4.7,
            restaurantId: 4,
            category: "Chinese",
            image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=80",
            description: "Popular Indo-Chinese appetizer: fried marinated chicken chunks tossed with diced onions, fresh green chillies, bell peppers, and chili soy sauce.",
            moods: ["Excited", "Happy"],
            study: ["Late Night Study"],
            trending: true,
            popularity: 175,
            calories: 490,
            veg: false
        },
        {
            id: 123,
            name: "Meghana Gobi Manchurian",
            price: 180,
            rating: 4.5,
            restaurantId: 4,
            category: "Chinese",
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
            description: "Crispy cauliflower florets coated in cornflour, deep-fried, and dry-tossed in a delicious, tangy ginger-garlic soy seasoning sauce.",
            moods: ["Happy", "Stressed"],
            study: ["Exam Preparation"],
            trending: false,
            popularity: 110,
            calories: 360,
            veg: true
        },

        // === SALADS ===
        {
            id: 112,
            name: "Detox Green Wellness Juice",
            price: 85,
            rating: 4.3,
            restaurantId: 5,
            category: "Salads",
            image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80",
            description: "Cold pressed extract of celery, fresh mint, juicy green apple, cucumber, and ginger. Designed to cleanse your system.",
            moods: ["Stressed", "Tired"],
            study: ["Exam Preparation"],
            trending: false,
            popularity: 65,
            calories: 90,
            veg: true
        },
        {
            id: 124,
            name: "AI Smart Choice Quinoa Bowl",
            price: 210,
            rating: 4.8,
            restaurantId: 5,
            category: "Salads",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
            description: "Superfood salad containing quinoa, sliced avocado, diced cherry tomatoes, shredded cucumber, boiled chickpeas, and olive oil lime dressing.",
            moods: ["Stressed", "Tired"],
            study: ["Coding", "Exam Preparation", "Assignment Work"],
            trending: true,
            popularity: 140,
            calories: 320,
            veg: true
        },
        {
            id: 125,
            name: "Truffles Classic Caesar Salad",
            price: 180,
            rating: 4.5,
            restaurantId: 5,
            category: "Salads",
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80",
            description: "Crispy hearts of romaine lettuce, seasoned croutons, shaved parmesan cheese, tossed with Truffles cream garlic Caesar dressing.",
            moods: ["Tired"],
            study: ["Assignment Work"],
            trending: false,
            popularity: 80,
            calories: 260,
            veg: true
        },

        // === DESSERTS ===
        {
            id: 103,
            name: "Death by Chocolate (DBC)",
            price: 260,
            rating: 4.9,
            restaurantId: 2,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=500&q=80",
            description: "Corner House's masterpiece. Two scoops of chocolate ice cream, warm chocolate cake, loads of hot chocolate fudge, cherries, and roasted peanuts.",
            moods: ["Stressed", "Tired", "Excited"],
            study: ["Late Night Study", "Coding"],
            trending: true,
            popularity: 280,
            calories: 780,
            veg: true
        },
        {
            id: 109,
            name: "Choco Hot Fudge Double Sundae",
            price: 150,
            rating: 4.8,
            restaurantId: 2,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80",
            description: "Two rich scoops of vanilla ice cream completely drenched in warm, home-cooked dark chocolate fudge sauce, topped with crunchy roasted peanuts.",
            moods: ["Stressed", "Tired"],
            study: ["Coding", "Assignment Work"],
            trending: false,
            popularity: 135,
            calories: 420,
            veg: true
        },
        {
            id: 126,
            name: "Glen's Signature Red Velvet Cupcake",
            price: 60,
            rating: 4.8,
            restaurantId: 2,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80",
            description: "Legendary Glen's Bakehouse red velvet sponge cupcake: incredibly moist, velvety texture, crowned with smooth, sweet cream cheese frosting.",
            moods: ["Happy", "Stressed"],
            study: ["Coding", "Exam Preparation"],
            trending: true,
            popularity: 190,
            calories: 240,
            veg: true
        }
    ],

    campusGraph: {
        nodes: [
            { id: "A", name: "Hostel Block A", type: "hostel", x: 200, y: 150 },
            { id: "B", name: "Hostel Block B", type: "hostel", x: 450, y: 120 },
            { id: "C", name: "Vidyarthi Bhavan (Node C)", type: "restaurant", x: 300, y: 280 },
            { id: "L", name: "Corner House (Node L)", type: "restaurant", x: 150, y: 390 },
            { id: "S", name: "Empire Restaurant (Node S)", type: "restaurant", x: 500, y: 420 },
            { id: "N", name: "Meghana Foods (Node N)", type: "restaurant", x: 620, y: 220 },
            { id: "H", name: "Truffles Cafe (Node H)", type: "restaurant", x: 750, y: 340 },
            { id: "J", name: "Central Library Junction", type: "junction", x: 380, y: 230 },
            { id: "K", name: "Auditorium Cross", type: "junction", x: 580, y: 310 }
        ],
        edges: [
            { from: "A", to: "B", weight: 3 },
            { from: "A", to: "J", weight: 2 },
            { from: "A", to: "L", weight: 4 },
            { from: "B", to: "J", weight: 4 },
            { from: "B", to: "N", weight: 2 },
            { from: "C", to: "J", weight: 1 },
            { from: "C", to: "L", weight: 3 },
            { from: "C", to: "S", weight: 5 },
            { from: "C", to: "K", weight: 3 },
            { from: "L", to: "S", weight: 6 },
            { from: "N", to: "J", weight: 3 },
            { from: "N", to: "K", weight: 2 },
            { from: "N", to: "H", weight: 4 },
            { from: "S", to: "K", weight: 2 },
            { from: "H", to: "K", weight: 3 }
        ]
    }
};

function initializeMockData() {
    // No default student user or mock orders are created to keep the system clean of dummy accounts!
    localStorage.removeItem("munch_user");
    localStorage.setItem("munch_orders", JSON.stringify([]));
}

// Initialize default store if not exists
function initStore() {
    if (!localStorage.getItem("munch_initialized_v15")) {
        // Clear all old keys to ensure a completely fresh start!
        localStorage.removeItem("munch_user");
        localStorage.removeItem("munch_latest_order");
        localStorage.removeItem("munch_cart");
        localStorage.removeItem("munch_orders");
        
        localStorage.setItem("munch_restaurants", JSON.stringify(MunchData.restaurants));
        localStorage.setItem("munch_foods", JSON.stringify(MunchData.foods));
        
        const defaultAdmin = {
            name: "Dean O'Food",
            email: "admin@munchhub.com",
            phone: "+91 90000 12345",
            role: "Administrator",
            foodsManaged: 26,
            ordersHandled: 4,
            password: "MunchAdmin2026!"
        };
        localStorage.setItem("munch_admin", JSON.stringify(defaultAdmin));
        
        // Populate mock data
        initializeMockData();
        
        localStorage.setItem("munch_initialized_v15", "true");
        localStorage.setItem("munch_initialized_v14", "true");
        localStorage.setItem("munch_initialized_v13", "true");
        localStorage.setItem("munch_initialized_v12", "true");
        localStorage.setItem("munch_initialized_v11", "true");
        localStorage.setItem("munch_initialized_v10", "true");
        localStorage.setItem("munch_initialized_v9", "true");
        localStorage.setItem("munch_initialized_v8", "true");
        localStorage.setItem("munch_initialized_v7", "true");
        localStorage.setItem("munch_initialized", "true");
    }
}

initStore();

// Force-override student local storage with the complete, expanded Bangalore menu dataset
(function() {
    try {
        const currentFoods = JSON.parse(localStorage.getItem("munch_foods"));
        // Overwrite if foods database is missing or old, or if fresh start v15 is not activated yet
        if (!currentFoods || currentFoods.length < 18 || !localStorage.getItem("munch_initialized_v15")) {
            localStorage.setItem("munch_restaurants", JSON.stringify(MunchData.restaurants));
            localStorage.setItem("munch_foods", JSON.stringify(MunchData.foods));
            
            // Clean slate overrides with mock data
            initializeMockData();
            
            localStorage.setItem("munch_initialized_v15", "true");
            localStorage.setItem("munch_initialized_v14", "true");
        }
        
        // Safeguard to initialize order queue if missing
        if (!localStorage.getItem("munch_orders")) {
            localStorage.setItem("munch_orders", JSON.stringify([]));
        }

        // Auto-heal admin credentials in localStorage if they are missing a password or have the outdated email
        try {
            let admin = JSON.parse(localStorage.getItem("munch_admin"));
            if (admin && (!admin.password || admin.email === "admin@munchhub.edu" || admin.email === "staff@munchhub.com")) {
                admin.email = "admin@munchhub.com";
                admin.password = "MunchAdmin2026!";
                localStorage.setItem("munch_admin", JSON.stringify(admin));
            }
        } catch(err) {
            console.error("Failed to auto-heal admin object:", err);
        }
    } catch(e) {
        console.error("Local storage database overhaul failed:", e);
    }
})();
