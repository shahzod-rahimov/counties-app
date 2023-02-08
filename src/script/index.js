"use strict";

let them = document.querySelector("#them");
let header = document.querySelector("header");
let select = document.querySelector("#region");
let searchInput = document.querySelector("#search");

them.addEventListener("input", (e) => {
  localStorage.setItem("them", e.target.checked);

  changeMode();
});

function changeMode() {
  let mode = localStorage.getItem("them");

  if (mode === "true") {
    document.body.style.cssText = "background: #202C36; color: #fff";
    header.style.cssText = "background: #2B3844; color: #fff";
    them.innerHTML = `<img src="./images/moon-dark.svg" alt="Dark">`;
  } else {
    document.body.style.cssText = "background: #f2f2f2; color: #000";
    header.style.cssText = "background: #ffffff; color: #000";
    // them.style.cssText = `background-image: url("../images/moon-dark.svg");`;
  }
}

changeMode();

// ------------------ DYNAMIC CARDS ---------------------

const baseURL = "https://restcountries.com/v2/all";
let filterUrl = "https://restcountries.com/v2/region";
let searchUrl = "https://restcountries.com/v2/name";

let wrapperCards = document.querySelector(".card__wrapper");

const getAllCoutries = async () => {
  try {
    wrapperCards.innerHTML = `<span class="loader"></span>`;
    const response = await fetch(baseURL);
    const result = await response.json();

    if (response.status === 200) {
      filterRegion(result);
      renderCards(result);
    }
  } catch (error) {
    console.log("Error message from getAllCoutries");
    console.log(error);
  }
};

getAllCoutries();

// ------------------ RENDER CARDS ---------------------
function renderCards(cards) {
  wrapperCards.innerHTML = "";

  cards.forEach((element) => {
    let content = `
    <a href="#!">
    <img
      class="rounded-t-lg w-full h-[160px]"
      src="${element.flag}"
      alt="img"
    />
    </a>
    <div class="p-6 pb-7">
      <h5 class="text-gray-900 text-xl font-extrabold mb-2 card_title cursor-pointer" data-isname=${element.name}>
        ${element.name}
      </h5>
      <ul class="flex flex-col gap-2">
        <li class="text-sm"><strong class="font-semibold">Population: </strong>${element.population}</li>
        <li class="text-sm"><strong class="font-semibold">Region: </strong>${element.region}</li>
        <li class="text-sm"><strong class="font-semibold">Capital: </strong>${element.capital}</li>
      </ul>
    </div>
    `;

    const card = createElement(
      "div",
      "rounded-[5px] shadow-lg bg-white max-w-sm w-[264px] h-[336px]",
      content
    );

    wrapperCards.append(card);
  });
}

function filterRegion(data) {
  let region = [];
  data.forEach((item) => {
    if (!region.includes(item.region)) {
      region.push(item.region);
    }
  });

  region.sort();
  region.forEach((item) => {
    const option = createElement("option", "item", item);
    select.append(option);
  });
}

async function fetchFilterRegions(region) {
  wrapperCards.innerHTML = `<span class="loader"></span>`;
  const response = await fetch(`${filterUrl}/${region}`);
  const result = await response.json();

  renderCards(result);
}

select.addEventListener("change", (e) => {
  wrapperCards.innerHTML = "";
  fetchFilterRegions(e.target.value);
});

async function searchCountries(country) {
  wrapperCards.innerHTML = `<span class="loader"></span>`;
  try {
    const response = await fetch(`${searchUrl}/${country}`);
    const result = await response.json();

    if (response.status == 200) {
      renderCards(result);
    } else {
      wrapperCards.innerHTML =
        "<h1 class='text-red-600 text-5xl'>NOT FOUND</h1>";
    }
  } catch (error) {
    console.log("Error from searchCountries");
    console.log(error);
  }
}

searchInput.addEventListener("keyup", (e) => {
  if (e.target.value.trim().length > 0) {
    wrapperCards.innerHTML = "";
    searchCountries(e.target.value);
  } else {
    getAllCoutries();
    searchInput.setAttribute("placeholder", "Please enter country name");
  }
});

wrapperCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("card_title")) {
    const isname = e.target.getAttribute("data-isname");
    localStorage.setItem("isname", isname);

    window.open("./country.html")
    
  }
});
