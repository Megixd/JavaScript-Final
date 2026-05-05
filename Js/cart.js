const cartOverlay = document.querySelector(".cart-overlay")
const cartContent = document.querySelector(".cart-window__content")
const cartCountElement = document.querySelector(".cart__count")
const cartTotalElement = document.getElementById("cart-total-price")

const cartToggle = document.querySelector(".cart__toggle")
const cartClose = document.querySelector(".cart-window__close")


let cart = JSON.parse(localStorage.getItem("myCart")) || []

function renderCart() {
    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="cart-window__empty">Your bag is empty</p>'
        updateTotals(0, 0)
        localStorage.setItem("myCart", JSON.stringify([]))
        return
    }

    cartContent.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
            <img src="${item.image}" width="60" style="border-radius: 5px;">
            <div style="flex-grow: 1;">
                <h4 style="margin: 0; font-size: 14px;">${item.name}</h4>
                <p style="margin: 0;">${item.quantity} x $${item.price.toFixed(2)}</p>
                <p style="margin: 0; font-weight: bold;">Total: $${(item.quantity * item.price).toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="cursor:pointer; background:none; border:none; color:red; font-size: 20px;">X</button>
        </div>
    `).join("")

    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    updateTotals(totalSum, cart.length)
    localStorage.setItem("myCart", JSON.stringify(cart))
}

function updateTotals(total, count) {
    if (cartTotalElement) cartTotalElement.textContent = `$${total.toFixed(2)}`
    if (cartCountElement) cartCountElement.textContent = count;
}

const toggleCart = (show) => {
    if (show) {
        cartOverlay.classList.add("cart-overlay--active")
        renderCart();
    } else {
        cartOverlay.classList.remove("cart-overlay--active")
    }
}


cartToggle.addEventListener("click", () => toggleCart(true))
cartClose.addEventListener("click", () => toggleCart(false))


cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) toggleCart(false)
})

document.addEventListener("click", (e) => {
    const btn = e.target
    
    if (btn.classList.contains("grid__button") || btn.classList.contains("product-page__btn1")) {
        
        const qtyInput = document.querySelector(".product-page__quantity")
        const quantity = qtyInput ? (parseInt(qtyInput.value) || 1) : 1

        const name = btn.dataset.name
        const price = parseFloat(btn.dataset.price)
        const image = btn.dataset.image

        if (!name) return;

        const existingItem = cart.find(item => item.name === name)
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.push({ name, price, image, quantity })
        }

        toggleCart(true)
    }
})

window.removeFromCart = function(index) {
    cart.splice(index, 1)
    renderCart()
}

renderCart()