let url = "https://dummyjson.com/products/categories"; // API URL
let categories = []; // Store categories

let myApp = document.getElementById("app");

let productsDiv = document.createElement("div"); // Div for displaying products
let productsContainer = document.createElement("div");

getData(url); // Fetch data

// Fetch data from URL
function getData(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      categories = data;
      createButton(data); // Create buttons for categories
    })
    .catch((error) => console.error(error));
}

// Create category buttons
function createButton(data) {
  if (Array.isArray(data)) {
    let buttonDiv = document.createElement("section");
    myApp.appendChild(buttonDiv);

    let myHtml = "";
    data.forEach((category, index) => {
      myHtml += `<button onclick="categoryButtonCallBack(${index})" >${category.name}</button>`;
    });
    buttonDiv.innerHTML = myHtml;
  }
}

// Handle category button click
function categoryButtonCallBack(index) {
  let url = categories[index].url; // Get category URL
  displayProducts(url); // Show products
}

// Display products from category
// Fetch and display products based on category URL
function displayProducts(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      productsContainer.classList.add("products");
      productsDiv.innerHTML = ""; // Clear previous products
      let myHtml = "";

      // Loop through each product
      data.products.forEach((categoriesProducts) => {
        // Generate HTML for each product
        myHtml += `
          <figure>
            <img src="${categoriesProducts.thumbnail}" alt="${
          categoriesProducts.title
        }">
            <figcaption>
              <h3>${categoriesProducts.title}</h3>
              <p>${categoriesProducts.price} $</p>
              <div class="rating">${createStars(
                categoriesProducts.rating
              )}</div>
            </figcaption>
          </figure>
        `;
      });

      // Insert products into the container
      productsDiv.innerHTML = myHtml;
      productsContainer.appendChild(productsDiv);
      myApp.appendChild(productsContainer);
    })
    .catch((error) => console.error(error)); // Handle errors
}

// Create stars based on product rating
function createStars(rating) {
  let stars = "";
  rating = Math.round(rating); // Round rating to the nearest integer

  // Loop to create a 5-star system
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += `<img class="star" src="assets/images/Svg/Filled star.svg" alt="Filled star">`; // Filled star
    } else {
      stars += `<img class="star" src="assets/images/Svg/Empty star.svg" alt="Empty star">`; // Empty star
    }
  }
  return stars;
}
