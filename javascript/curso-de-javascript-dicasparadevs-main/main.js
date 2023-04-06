// // selecionar elemento
// var addUserText =  document.getElementById("add-user");
// addUserText.innerText = "User:"
// console.log(addUserText);


// //  selecionar multiplos elementos

// var allitems = document.querySelectorAll(`.item1`);

// console.log(allitems);


// // Remover os item

// var items = document.querySelector(".items");
// // item remove();

// items.firstElementChild.remove();



// var items = document.querySelector(".itmes");
// var button = document.querySelector(".btn");
// button.style.background = "red";
// // console.log(button);
// // button.style.color = "blue";

// var submitButton = document.querySelector("#submit-button");

// submitButton.addEventListener("click", function(e){
//     e.preventDefault();
//     console.log(e);
//     console.log("clicked!")
// });


// validar formulario

// var nameInput = document.getElementById("name").innerHTML;
// var emailInput = document.getElementById("email").innerHTML;
// var submitButton = document.getElementById("submit-button").innerHTML;




const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const submitButton = document.querySelector("#submit-button");

const errorMessage = document.querySelector(".msg");

const items = document.querySelector(".items");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const nameValue = nameInput.value;
  const emailValue = emailInput.value;

  if (nameValue === "" || emailValue === "") {
    errorMessage.textContent = "Please fill out the fields!";
    errorMessage.classList = "error";

    setTimeout(() => {
      errorMessage.textContent = "";
      errorMessage.classList = "";
    }, 3000);
    return;
  }

  const li = document.createElement("li");
  li.classList = "item";
  li.innerHTML = `Nome: ${nameValue}<br />Email: ${emailValue}`;

  items.appendChild(li);

  nameInput.value = "";
  emailInput.value = "";
});










