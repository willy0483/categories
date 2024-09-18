let categories = []; // Store categories
let mainCategories = {
  Beauty: [],
  Fashion: [],
  Electronics: [],
  Home: [],
  Sports: [],
};

let myApp = document.getElementById("app");

let productsDiv = document.createElement("div"); // Div for displaying products
let productsContainer = document.createElement("div");

getData(); // Fetch data

// Fetch data from the new category list API
function getData() {
  fetch("https://dummyjson.com/products/category-list")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      console.log(response);

      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        console.log("Fetched data:", data); // Log fetched data
        categories = data;
        sortCategories(data); // Sort categories
      }
    })
    .catch((error) => {
      console.error(error);
      buildError(error);
    });
}

function buildError(error) {
  myApp.innerHTML = "";

  myHtml = `

  <div class="error-container">
    <h1>Error loading data</h1>
    <p>Please try again.</p>
    <p>${error}</p>
  </div>
 `;

  myApp.innerHTML = myHtml;
}

// Sort categories into main and subcategories
function sortCategories(data) {
  data.forEach((category) => {
    switch (category) {
      case "beauty":
      case "fragrances":
      case "skin-care":
        mainCategories.Beauty.push(category);
        break;
      case "tops":
      case "womens-dresses":
      case "womens-shoes":
      case "mens-shirts":
      case "mens-shoes":
      case "mens-watches":
      case "womens-watches":
      case "womens-bags":
      case "womens-jewellery":
      case "sunglasses":
        mainCategories.Fashion.push(category);
        break;
      case "smartphones":
      case "laptops":
      case "tablets":
      case "mobile-accessories":
        mainCategories.Electronics.push(category);
        break;
      case "furniture":
      case "home-decoration":
      case "groceries":
      case "kitchen-accessories":
        mainCategories.Home.push(category);
        break;
      case "sports-accessories":
      case "motorcycle":
      case "vehicle":
        mainCategories.Sports.push(category);
        break;
      default:
        console.log(`Unknown category: ${category}`);
        break;
    }
  });

  createButton(mainCategories); // Create buttons for categories
}

// Create category buttons and subcategories
function createButton(data) {
  let buttonDiv = document.createElement("section");
  myApp.appendChild(buttonDiv);

  let myHtml = "";

  for (let mainCategory in data) {
    myHtml += `
      <div class="category-wrapper">
        <button class="category-button" data-category="${mainCategory}">
          ${mainCategory}
        </button>
        <div class="subcategories" id="${mainCategory}-subcategories">
          ${data[mainCategory]
            .map(
              (sub) =>
                `<div class="subcategory" onclick="handleSubcategoryClick('${sub}')">${sub}</div>`
            )
            .join("")}
        </div>
      </div>`;
  }

  buttonDiv.innerHTML = myHtml;

  // Add event listeners for hover effects
  document.querySelectorAll(".category-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("mouseover", () => showSubCategories(wrapper));
    wrapper.addEventListener("mouseout", () => hideSubCategories(wrapper));
  });
}

// Show subcategories on hover
function showSubCategories(wrapper) {
  let subCategoriesDiv = wrapper.querySelector(".subcategories");
  if (subCategoriesDiv) {
    subCategoriesDiv.style.display = "block";
  }
}

// Hide subcategories when not hovering
function hideSubCategories(wrapper) {
  let subCategoriesDiv = wrapper.querySelector(".subcategories");
  if (subCategoriesDiv) {
    subCategoriesDiv.style.display = "none";
  }
}

// Handle subcategory click
function handleSubcategoryClick(subCategory) {
  displayProducts([subCategory]);
}

// Display products from category
function displayProducts(subCategories) {
  productsDiv.innerHTML = ""; // Clear previous products
  productsContainer.innerHTML = ""; // Clear previous products container
  productsContainer.classList.add("products");

  subCategories.forEach((subCategory) => {
    let url = `https://dummyjson.com/products/category/${subCategory}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        let myHtml = "";
        // Loop through each product

        if (Array.isArray(data.products)) {
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
        }
      })
      .catch((error) => {
        console.error(error);
        buildError(error);
      });
  });
}

// buildError(error)

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

// Function to create and add the footer
function buildFooter() {
  // Create the footer element
  let footer = document.createElement("footer");
  footer.className = "footerMain";

  // Set the innerHTML of the footer
  footer.innerHTML = `
    <div class="lists">
      <ul>
        <h3>Company</h3>
        <p>Infenite Finds Emv</p>
        <p>CVR-NB-44215799</p>
      </ul>
      <ul>
        <h3>Address</h3>
        <p>Bakkegårdsvej 28 C,2</p>
        <p>9000 Aalborg</p>
      </ul>
      <ul>
        <h3>Policy</h3>
        <li><a href="#">Terms and Conditions</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Withdrawal</a></li>
        <li><a href="#">Cookie's</a></li>
      </ul>
      <ul>
        <h3>Contact Info</h3>
        <p>Phone: +45 42506072</p>
        <p>E-mail: Infinite@finds.dk</p>
      </ul>
    <div class="ratings">
      <ul>
        <li><img src="assets/Images/Loading/Link [is-br-12--is-m-br-10--slide-in].svg" alt=""></li>
        <li><img src="assets/Images/Loading/Link [footer__ben-item_one].svg" alt=""></li>
        <li><img src="assets/Images/Loading/Link [footer__ben-item].svg" alt=""></li>
      </ul>
          </div>
    </div>
  `;

  // Append the footer to the body
  document.body.appendChild(footer);
}

// Call the function to build and add the footer to the document
buildFooter();
