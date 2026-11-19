let alertTimeout;

function showAlert(message) {
    const alertBox = document.getElementById("customAlertBox");
    const alertText = document.getElementById("customAlertText");

    alertText.textContent = message;
    alertBox.classList.add("show");

    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
        closeAlert();
    }, 4500);
}

function closeAlert() {
    const alertBox = document.getElementById("customAlertBox");
    alertBox.classList.remove("show");
}

function inquireCar(carTitle) {
    showAlert("Tanlangan avtomobil: " + carTitle + ". Maxsus so'rov formasiga o'tkazilmoqdasiz...");
    const notesField = document.getElementById("clientNotes");
    if (notesField) {
        notesField.value = "Interested in acquiring: " + carTitle;
    }
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");
const tabButtons = document.querySelectorAll(".tab-btn");
const inventoryGrid = document.getElementById("inventoryGrid");
const cards = Array.from(document.querySelectorAll(".inv-card"));
const emptyState = document.getElementById("emptyState");

let currentBrand = "all";

function filterCars() {
    const searchText = searchInput.value.toLowerCase().trim();
    const priceValue = priceFilter.value;
    let visibleCount = 0;

    cards.forEach(card => {
        const brand = card.getAttribute("data-brand");
        const name = card.getAttribute("data-name");
        const price = parseInt(card.getAttribute("data-price"));

        const matchesBrand = currentBrand === "all" || brand === currentBrand;
        const matchesSearch = name.includes(searchText);

        let matchesPrice = true;
        if (priceValue === "low") matchesPrice = price < 250000;
        if (priceValue === "mid") matchesPrice = price >= 250000 && price <= 450000;
        if (priceValue === "high") matchesPrice = price > 450000;

        if (matchesBrand && matchesSearch && matchesPrice) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    emptyState.style.display = visibleCount === 0 ? "block" : "none";
}

function sortCars() {
    const sortValue = sortFilter.value;
    const sortedCards = [...cards];

    if (sortValue === "price-asc") {
        sortedCards.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
    } else if (sortValue === "price-desc") {
        sortedCards.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
    }

    sortedCards.forEach(card => inventoryGrid.appendChild(card));
}

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentBrand = btn.getAttribute("data-brand");
        filterCars();
    });
});

searchInput.addEventListener("input", filterCars);
priceFilter.addEventListener("change", filterCars);
sortFilter.addEventListener("change", sortCars);

function filterByMarque(brandName) {
    currentBrand = brandName;
    tabButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-brand") === brandName) {
            btn.classList.add("active");
        }
    });
    filterCars();
    document.getElementById("inventory").scrollIntoView({ behavior: "smooth" });
}

function resetFilters() {
    searchInput.value = "";
    priceFilter.value = "all";
    sortFilter.value = "default";
    currentBrand = "all";
    tabButtons.forEach(b => b.classList.remove("active"));
    tabButtons[0].classList.add("active");
    filterCars();
}

const briefForm = document.getElementById("briefForm");
briefForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("clientName").value;
    const marque = document.getElementById("clientMarque").value;
    alert("Rahmat, " + name + "!\n\nSizning (" + marque + ") bo'yicha maxfiy so'rovingiz shifrlangan holda qabul qilindi. Direktorimiz 2 soat ichida aloqaga chiqadi.");
    briefForm.reset();
});

function subscribeVault(e) {
    e.preventDefault();
    const email = document.getElementById("dispatchEmail").value;
    alert("Tasdiqlandi: " + email + " manzili yopiq Vault ro'yxatiga qo'shildi.");
    document.getElementById("dispatchEmail").value = "";
}

function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);