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
        <img src="${card.images[0]}" alt="${card.title}" class="grid__image grid__image--primary">
      </div>

      <div class="grid__content column">
        <p class="grid__title">${card.title}</p>
        <span class="grid__price">${card.price}</span>
        <button class="grid__button">Add to Cart</button>
      </div>
      `
      gridContainer.appendChild(productCard)
    });

  } catch(error) {
    console.error("something went wrong")
  }
 }

createCard()


async function carouselImg() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100")

  const data = await response.json()

    const filteredProducts = data.products.filter(product => product.category !== 'groceries' && product.category !== "kitchen-accessories" && product.category !== "furniture" && product.category !== "home-decoration")

    const cardProducts = filteredProducts.slice(0,8)

    const carouselContainer = document.querySelector(".carousel__group")

    cardProducts.forEach(carousel => {
      const carouselImage = document.createElement("div")
      carouselImage.classList.add("carousel__card")

      carouselImage.innerHTML = `
       <img src="${carousel.images[0]}" alt="${carousel.title}">
      `

      carouselContainer.appendChild(carouselImage)
    });
  } catch(error) {
    console.error("something went wrong")
  }
}

carouselImg()