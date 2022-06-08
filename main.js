let productsContainer;
productsContainer = [];

if (localStorage.getItem("ourProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("ourProducts"));
  dispalyProducts();
}

let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDecsc = document.getElementById("productDecsc");
let btn = document.getElementById("btn");
let search = document.getElementById("search");

function addProduct() {
  let product = {
    Name: productName.value,
    Price: productPrice.value,
    Category: productCategory.value,
    Decsc: productDecsc.value,
  };

  console.log(product);

  productsContainer.push(product);

  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));

  dispalyProducts();
  clearForm();
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDecsc.value = "";
}

function dispalyProducts() {
  let container = ``;

  productsContainer.forEach((item, index) => {
    container += `
    
    <tr>

      <td>${index + 1}</td>
      <td>${item.Name}</td>
      <td>${item.Price}</td>
      <td>${item.Category}</td>
      <td>${item.Decsc}</td>
      <td><button onclick='upgateProduct(${index})'class="btn btn-outline-warning" >update</button></td>
      <td><button onclick='deleteProduct(${index})' class="btn btn-outline-danger delated" >delated</button></td>

    </tr>
    
    `;
 
  });
  let tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = container;
  
}

btn.addEventListener("click", () => {
  
  addProduct();
  
  productsContainer.forEach((item,index) => {

    if (btn.innerHTML === " upDate Product") {

      upgateProduct(index)
        
      clearForm()

      btn.innerHTML = `add Product`
  
    }
     
    btn.classList.remove("btn-outline-warning")
  });
  
 
});

// function deleteProduct() {
//   let delated = document.querySelectorAll(".delated");

//   delated.forEach((item, index) => {

//     item.addEventListener("click", (eo) => {

//       eo.target.parentElement.parentElement.remove();
//       productsContainer.splice(eo, 1);
//       localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
//       console.log(productsContainer);

//     });

//   });
// }
// deleteProduct()

function deleteProduct(index) {
  productsContainer.splice(index, 1);

  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));

  console.log(productsContainer);
  // upgateProduct(index)
  dispalyProducts();

  console.log("productsContainer");
}

function searchProductName(term) {
  container = ``;
  productsContainer.forEach((item, index) => {
    if (item.Name.toLowerCase().includes(term.toLowerCase()) == true) {
      container += `
    
  <tr>

    <td>${index + 1}</td>
    <td>${item.Name}</td>
    <td>${item.Price}</td>
    <td>${item.Category}</td>
    <td>${item.Decsc}</td>
    <td><button onclick='upgateProduct(${index})' class="btn btn-outline-warning" >update</button></td>
    <td><button onclick='deleteProduct(${index})' class="btn btn-outline-danger delated" >delated</button></td>

  </tr>
  
  `;

    }
    
  });
  tableBody.innerHTML = container;
  // upgateProduct(index);
}

search.addEventListener("keyup", (eo) => {
  searchProductName(search.value);
});



function upgateProduct(index) {
  productName.value = productsContainer[index].Name;
  productPrice.value = productsContainer[index].Price;
  productCategory.value = productsContainer[index].Category;
  productDecsc.value = productsContainer[index].Decsc;
  btn.innerHTML = " upDate Product"
  btn.classList.add("btn-outline-warning")
  deleteProduct(index)
}

