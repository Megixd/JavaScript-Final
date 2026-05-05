/* Shop cards */
async function createCard() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100")

    const data = await response.json()

    const filteredProducts = data.products.filter(product => product.category !== 'groceries' && product.category !== "kitchen-accessories" && product.category !== "furniture" && product.category !== "home-decoration")

    const cardProducts = filteredProducts.slice(0,27)

    const gridContainer = document.querySelector(".grid")

    cardProducts.forEach(card => {
      const productCard = document.createElement("div")
      productCard.classList.add("grid__card", "column")

      productCard.innerHTML = `
      <div class="grid__img-box">
      <a class="grid__link" href="product.html?id=${card.id}">
          <img src="${card.images[0]}" alt="${card.title}"  class="grid__image grid__image--primary">
        </a>
      </div>

      <div class="grid__content column">
      <a class="grid__link" href="product.html?id=${card.id}">
        <p class="grid__title">${card.title}</p>
      </a>
        <span class="grid__price">${card.price}</span>
        <button class="grid__button"
        <button class="grid__button" 
        data-name="${card.title}" 
        data-price="${card.price}" 
        data-image="${card.images[0]}">Add to Cart</button>
      </div>
      `
      gridContainer.appendChild(productCard)
    });

  } catch(error) {
    console.error("something went wrong")
  }
 }

createCard()


/* main page carousel */
async function carouselImg() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100")

    const data = await response.json()

    const filteredProducts = data.products.filter(product => product.category !== 'groceries' && product.category !== "kitchen-accessories" && product.category !== "furniture" && product.category !== "home-decoration")

    const cardProducts = filteredProducts.slice(0,8)

    const carouselGroups = document.querySelectorAll(".carousel__group")


    carouselGroups.forEach(group => {
    group.innerHTML = ""

    cardProducts.forEach(product => {
      const carouselCard = document.createElement("div")
      carouselCard.classList.add("carousel__card")

      carouselCard.innerHTML = `
       <img class="carousel__images" src="${product.images[0]}" alt="${product.title}">
      `
    carouselCard.addEventListener("click", function() {
      if (product && product.id) {
        window.location.href = `product.html?id=${product.id}`
        }
    })

      group.appendChild(carouselCard)
      })
    })

  } catch(error) {
    console.error("something went wrong")
  }
}

carouselImg()


/* main page Testimonials */
async function listTestemonials() {
  try {
    const commentsResponse = await fetch("https://dummyjson.com/comments?limit=6")
    const commentsData = await commentsResponse.json()

    const userimgResponse = await fetch("https://dummyjson.com/users?limit=6")
    const userimgData = await userimgResponse.json()

    const testimonialsContainer = document.querySelector(".testimonials__grid")

    userimgData.users.forEach((user, index) => {
      const comment = commentsData.comments[index]

      const card = document.createElement("div")
      card.classList.add("testimonials__card")

      card.innerHTML= `
      <div class="testimonials__text">
        <div class="testimonials__quote-icon"><i class="fa-solid fa-quote-left"></i></div>
        <p class="testimonials__text">${comment.body}</p>
      </div>

      <div class="testimonials__img">
        <img src="${user.image}" alt="${user.firstName}" class="testimonials__avatar">
        <div class="testimonials__details">
            <p class="testimonials__name">${user.firstName} ${user.lastName}</p>
            <p class="testimonials__email">${user.email}</p>
          </div>
      </div>
      `
      testimonialsContainer.appendChild(card)
    });

  } catch(error) {
    console.error("something went wrong", error)
  }
}

listTestemonials()


/* shop page - Products */
const params = new URLSearchParams(window.location.search)
const productId = params.get('id')

async function addProductPage() {
  try{
    const response = await fetch(`https://dummyjson.com/products/${productId}`)

    const data = await response.json()

    const productDiv = document.querySelector(".product-page")

    
      const container = document.createElement("div")
      container.classList.add("product-page__container")

      container.innerHTML = `
      <div class="product-page__right">
        <img class="product-page__img" src="${data.images[0]}" alt="${data.title}">
      </div>

      <div class="product-page__left">
        <h1 class="product-page__title">${data.title}</h1>
        <span class="product-page__SKU">${data.sku}</span>
        <p class="product-page__price">$${data.price}</p>
      
        <div class="product-page__quantity-container">
          <label for="quantity"  class="product-page__quantity-label">Quantity *</label>
          <input type="number" placeholder="0" class="product-page__quantity">
        </div>

        <div class="product-page__buttons">
        <button class="product-page__btn1" 
          data-name="${data.title}" 
          data-price="${data.price}" 
          data-image="${data.images[0]}"> Add to Cart </button>
        </div>

        <div class="product-page__product-description"> 

        <div class="product-page__product-description-item">  
          <div class="product-page__product-description-flex">  
            <h2 class="product-page__h2">Product Info</h2>
            <button class="product-page__button">+</button>
          </div>
          <p class="product-page__description-text">${data.description}</p>
        </div> 

        <div class="product-page__product-description-item">
          <div class="product-page__product-description-flex">
            <h2 class="product-page__h2">Return & Refund Policy</h2>
            <button class="product-page__button">+</button>
          </div>
          <p class="product-page__description-text">Our return policy: ${data.returnPolicy} 
          Our Warranty Information: ${data.warrantyInformation}</p>
        </div> 

        <div class="product-page__product-description-item">  
          <div class="product-page__product-description-flex">
            <h2 class="product-page__h2">shipping info</h2>
            <button class="product-page__button">+</button>
          </div>
          <p class="product-page__description-text">${data.shippingInformation}</p>
        </div> 
    </div>
  </div>
      `
    productDiv.appendChild(container)

    const buttons = document.querySelectorAll(".product-page__button")
    const paragraphs = document.querySelectorAll(".product-page__description-text")

    paragraphs.forEach((paragraph) => {
      paragraph.style.display = "none"
    })

    buttons.forEach((btn, i) => {
      btn.addEventListener("click", function() {
        const paragraph = paragraphs[i]

          if (paragraph.style.display === "none") {
          paragraph.style.display = "block"
          btn.textContent = "-"
        } else {
          paragraph.style.display = "none"
          btn.textContent = "+"
        }
      })
    }) 
  } catch(error){
    console.error("Something went wrong", error)
  }
}

addProductPage()

/* FAQ page */
const faqButtons = document.querySelectorAll(".product-page__button")
const faqTexts = document.querySelectorAll(".product-page__description-text")


faqButtons.forEach((btn, i) => {
  faqTexts[i].style.display = "none"

  btn.addEventListener("click", () => {
    const text = faqTexts[i]

    if (text.style.display === "none" || text.style.display === "") {
      text.style.display = "block"
      btn.textContent = "-"
    } else {
      text.style.display = "none"
      btn.textContent = "+"
    }
  })
})

/* search  */

const searchInput = document.querySelector(".search-field__input")
const grid = document.querySelector(".search-field__product-grid")

function displayProduct(list) {
  if (list.length === 0) {
    grid.innerHTML = `
    <div style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; width: 100%; height: 200px;">
      Product was not found...
    </div>
    `  
    return
  }
    const structure = list.map(item => 
      `<div class=""search-field__card>
      <div class="grid__img-box">
      <a class="grid__link" href="product.html?id=${item.id}">
          <img src="${item.images[0]}" alt="${item.title}"  class="grid__image grid__image--primary">
        </a>
      </div>

      <div class="grid__content column">
      <a class="grid__link" href="product.html?id=${item.id}">
        <p class="grid__title">${item.title}</p>
      </a>
        <span class="grid__price">${item.price}</span>
      </div>
      </div>
      `).join("")

      grid.innerHTML = structure
  }

  let products = []

  async function getProducts() {
    const response = await fetch("https://dummyjson.com/products?limit=100")
    const data = await response.json()

    const filteredProducts = data.products.filter(product => product.category !== 'groceries' && product.category !== "kitchen-accessories" && product.category !== "furniture" && product.category !== "home-decoration")

    products = filteredProducts
  }

 getProducts()

searchInput.addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase()
  const filtered = products.filter(product => product.title.toLowerCase().includes(term) || product.category.toLowerCase().includes(term))

  displayProduct(filtered)
})

const searchField = document.querySelector(".search-field")
const closeBtn = document.querySelector(".search-field__close-btn")
const search = document.querySelector(".search")

closeBtn.addEventListener("click", close)
search.addEventListener("click", open)

function close() {
  searchField.style.display = "none"
}

function open() {
  searchField.style.visibility = "visible"
  searchField.style.display = "unset"  
}

