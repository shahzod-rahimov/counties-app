"use strict";

const them = document.querySelector(".them");
const header = document.querySelector("header");
const country = document.querySelector("#country");
const title = document.querySelector("title");
const countryImg = document.querySelector(".img");
const mainPage = document.querySelector(".main__page");
const main = document.querySelector("main");

let countryName = localStorage.getItem("isname");
countryName = countryName.split("_").join(" ");
title.textContent = countryName;

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
    backBtn.style.cssText = "background: #2B3844; color: #fff";
  } else {
    document.body.style.cssText = "color: #000";
    header.style.cssText = "background: #ffffff; color: #000";
    backBtn.style.cssText = "background: #ffffff; color: #000";
    // them.style.cssText = `background-image: url("../images/moon-dark.svg");`;
  }
}

async function getCountry() {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/name/${countryName}`
    );
    const result = await response.json();
    console.log(result[0]);
    renderPage(result[0]);
  } catch (error) {
    console.log(error);
  }
}

getCountry();

function renderPage(data) {
  const content = `
  <div class="main__page flex gap-[120px]">
          <img src="${data.flag}" class="img" width="560px" height="401px" />
          <div class="info flex flex-col gap-7 w-[598px]">
            <h1 id="country" class="text-3xl font-extrabold">${data.name}</h1>
            <div class="flex items-start">
              <ul class="w-[307px]">
                <li>
                  <strong>Native Name:</strong>
                  ${data.nativeName}
                </li>
                <li>
                  <strong> Population:</strong>
                  ${data.population}
                </li>
                <li><strong>Region:</strong> ${data.region}</li>
                <li><strong>Sub Region:</strong> ${data.subregion}</li>
                <li><strong>Capital:</strong> ${data.capital}</li>
              </ul>
              <ul>
                <li><strong>Top Level Domain:</strong> ${data.topLevelDomain.join(
                  ", "
                )}</li>
                <li><strong>Currencies: </strong> ${
                  data.currencies[0].name
                }</li>
                <li><strong>Languages: </strong> ${getLangs(
                  data.languages
                )}</li>
              </ul>
            </div>
          </div>
        </div>
  `;
  const country = createElement("div", "main__page", content);

  mainPage.append(country);
}

/*
<div class="flex gap-4 mt-[70px]">
  <p class="text-base font-semibold">Border Countries:</p>
  
  <ul class="flex text-center gap-3">
  ${renderBorder(data.borders)}
  </ul>
</div>
*/

function getLangs(data) {
  let langs = [];
  data.forEach((element) => {
    langs.push(element.name);
  });
  return langs.join(", ");
}

function renderBorder(data) {
  let lis = [];
  data.forEach((i) => {
    const country = createElement(
      "li",
      "w-[96px] h-[28px] shadow-md text-sm font-light flex items-center justify-center",
      i
    );
    lis.push(country);
  });
  return lis;
}

main.addEventListener("click", (e) => {
  console.log(e.target.classList);
  if (
    e.target.classList.contains("backBtn") ||
    e.target.classList.contains("material-symbols-outlined")
  ){
    window.location.replace('./index.html')
  }

});
