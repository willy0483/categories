//#region VARIABLES
let categories = []; // Store categories
let mainCategories = {
  Beauty: [],
  Fashion: [],
  Electronics: [],
  Home: [],
  Sports: [],
};

let myApp = document.getElementById("app");
let headerDiv = document.createElement("header");
myApp.appendChild(headerDiv);
headerDiv.classList.add("headerNav");

let searchInput = document.getElementById("searchInput");
let productsDiv = document.createElement("div"); // Div for displaying products
let productsContainer = document.createElement("div");
//#endregion

//#region DATA FETCHING AND HANDLING
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

// Build error message
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
//#endregion

//#region UI FUNCTIONS
// Create category buttons and subcategories
function createButton(data) {
  let buttonDiv = document.createElement("section");
  buttonDiv.classList.add("category");
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
  headerDiv.prepend(buttonDiv);

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

// Create stars based on product rating
function createStars(rating) {
  let stars = "";
  rating = Math.round(rating); // Round rating to the nearest integer

  // Loop to create a 5-star system
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += `<img class="star" src="assets/images/svg/Filled star.svg" alt="Filled star">`; // Filled star
    } else {
      stars += `<img class="star" src="assets/images/svg/Empty star.svg" alt="Empty star">`; // Empty star
    }
  }
  return stars;
}
//#endregion

//#region FOOTER
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
          <li><img src="assets/images/svg/Link [footer__ben-item1].svg" alt=""></li>
          <li>    <img src="assets/images/svg/Link [footer__ben-item].svg" alt=""></li>
          <li><img src="assets/images/svg/Link [is-br-12--is-m-br-10--slide-in1].svg" alt=""></li>
        </ul>
            </div>
      </div>
    `;

  // Append the footer to the body
  document.body.appendChild(footer);
}

// Call the function to build and add the footer to the document
buildFooter();
buildHeader();

//#endregion
function buildHeader() {
  let logoDiv = document.createElement("div");
  logoDiv.classList.add("logo");

  let logoHtml = `
    <img onclick="resetView()" src="assets/images/Svg/Header.svg" alt="logo" class="header-logo">
  `;

  logoDiv.innerHTML = logoHtml;
  headerDiv.appendChild(logoDiv);

  const searchInputHTML = `
  <div class="search">
  <img src="assets/images/Svg/Search-icon .svg" alt="search-logo" />
  <input id="searchInput" type="text"  placeholder="Search products..." />
  </div>
`;

  headerDiv.innerHTML += searchInputHTML;

  searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let searchQuery = event.target.value;
      displayProducts(searchQuery);
    }
  });
}

function resetView() {
  productsDiv.innerHTML = "";
  productsContainer.innerHTML = "";
}
