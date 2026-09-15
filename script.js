/* =================================
   TECHWORLD - JAVASCRIPT
================================= */

let cart = [];

let selectedProduct = {
    name: "",
    price: 0,
    category: ""
};


/* =================================
   GO TO PRODUCTS
================================= */

function goToProducts() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}


/* =================================
   ADD TO CART
================================= */

function addToCart(name, price) {

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


/* =================================
   UPDATE CART
================================= */

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = "₹" + totalPrice.toLocaleString("en-IN");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}
                </p>
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });
}


/* =================================
   REMOVE FROM CART
================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* =================================
   OPEN CART
================================= */

function openCart() {

    document.getElementById("cartModal").classList.add("show");

    updateCart();
}


/* =================================
   CLOSE CART
================================= */

function closeCart() {

    document.getElementById("cartModal").classList.remove("show");
}


/* =================================
   PRODUCT DETAILS
================================= */

function showProduct(name, price, category) {

    selectedProduct.name = name;
    selectedProduct.price = price;
    selectedProduct.category = category;

    document.getElementById("detailName").textContent = name;

    document.getElementById("detailPrice").textContent =
        "₹" + price.toLocaleString("en-IN");

    document.getElementById("detailCategory").textContent =
        category;

    document.getElementById("productModal").classList.add("show");
}


/* =================================
   CLOSE PRODUCT
================================= */

function closeProduct() {

    document.getElementById("productModal").classList.remove("show");
}


/* =================================
   ADD PRODUCT FROM DETAILS
================================= */

function addDetailToCart() {

    addToCart(
        selectedProduct.name,
        selectedProduct.price
    );

    closeProduct();
}


/* =================================
   CATEGORY FILTER
================================= */

function filterCategory(category) {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productCategory =
            product.getAttribute("data-category");

        if (productCategory === category) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }
    });


    document.querySelectorAll(".filter").forEach(button => {

        button.classList.remove("active");

        if (button.textContent.trim() === category) {
            button.classList.add("active");
        }
    });


    goToProducts();
}


/* =================================
   SHOW ALL PRODUCTS
================================= */

function showAllProducts() {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {
        product.style.display = "block";
    });


    document.querySelectorAll(".filter").forEach(button => {
        button.classList.remove("active");
    });

    document.querySelector(".filter").classList.add("active");
}


/* =================================
   SEARCH PRODUCTS
================================= */

function searchProducts() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
            product.querySelector("h3")
            .textContent
            .toLowerCase();

        const productCategory =
            product.getAttribute("data-category")
            .toLowerCase();


        if (
            productName.includes(searchText) ||
            productCategory.includes(searchText)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }
    });


    if (searchText !== "") {
        goToProducts();
    }
}


/* =================================
   LOGIN
================================= */

function openLogin() {

    document.getElementById("loginModal").classList.add("show");
}


function closeLogin() {

    document.getElementById("loginModal").classList.remove("show");
}


function loginUser(event) {

    event.preventDefault();

    alert("Login successful! Welcome to TechWorld.");

    closeLogin();
}


/* =================================
   REGISTER
================================= */

function registerUser() {

    alert(
        "Registration feature is ready for demonstration."
    );
}


/* =================================
   CHECKOUT
================================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add a product first.");

        return;
    }

    closeCart();

    document
        .getElementById("checkoutModal")
        .classList.add("show");
}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("show");
}


/* =================================
   PLACE ORDER
================================= */

function placeOrder(event) {

    event.preventDefault();

    alert(
        "🎉 Order placed successfully!\n\nThank you for shopping with TechWorld."
    );

    cart = [];

    updateCart();

    closeCheckout();
}


/* =================================
   CONTACT FORM
================================= */

function sendMessage(event) {

    event.preventDefault();

    alert(
        "Thank you! Your message has been sent successfully."
    );

    event.target.reset();
}


/* =================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
================================= */

window.addEventListener("click", function(event) {

    const cartModal =
        document.getElementById("cartModal");

    const loginModal =
        document.getElementById("loginModal");

    const productModal =
        document.getElementById("productModal");

    const checkoutModal =
        document.getElementById("checkoutModal");


    if (event.target === cartModal) {
        closeCart();
    }

    if (event.target === loginModal) {
        closeLogin();
    }

    if (event.target === productModal) {
        closeProduct();
    }

    if (event.target === checkoutModal) {
        closeCheckout();
    }

});