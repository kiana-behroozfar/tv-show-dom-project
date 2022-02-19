// https://api.tvmaze.com/shows/527/episodes

// https://api.tvmaze.com/shows/82/episodes

///////getting API

const getApi = async () => {
  try {
    const url = "https://api.tvmaze.com/shows/527/episodes";
    const response = await fetch(url);
    const ourData = await response.json();
    getShows(ourData);
  } catch (er) {
    return er;
  }
};

const ul = document.createElement("ul");
const select = document.querySelector("#select-div");
const optionTwo = document.querySelector("#second-option-select");

/////getting carts if film
const getShows = (Data) => {
  for (let data of Data) {
    //////getting data from API
    const Name = data.name;
    const season = data.season;
    const imageShow = data.image.medium;
    const href = data.url;
    const runTime = data.runtime;
    const summary = data.summary;

    /////making tag html
    const continer = document.querySelector("#continer");
    const li = document.createElement("li");
    const p = document.createElement("p");
    const myImage = document.createElement("img");
    const a = document.createElement("a");
    const icone1 = document.createElement("i");
    const icone2 = document.createElement("i");
    const spanSummary = document.createElement("span");

    p.textContent = `(${Name} -season${season}) click image to see summary`;

    spanSummary.innerHTML = summary;

    icone1.textContent = "  click me";

    icone2.textContent = "  click me";

    myImage.setAttribute("src", imageShow);

    myImage.setAttribute("alt", "picture of film");

    a.setAttribute("href", href);

    icone2.addEventListener("click", () => {
      if (icone2.textContent.includes(runTime)) {
        icone2.textContent = "  click me";
      } else {
        icone2.textContent = ` ${runTime}  click me`;
      }
    });

    //////class of variables
    ul.className = "class-ul";
    li.className = "class-li";
    p.className = "class-Name";
    icone1.className = "fa-solid fa-circle-play";
    icone2.className = "fa-solid fa-clock";
    spanSummary.classList.add("span-image-none");

    ///////////////making options of select
    const newOption = document.createElement("option");
    newOption.textContent = `S0${data.season}-E0${data.number}-${data.name}`;

    /////////////////making select search
    select.addEventListener("change", () => {
      const selectValue = select.value;

      if (selectValue.includes(Name)) {
        li.style.display = "initial";
      } else if (selectValue === "all of episodes") {
        li.style.display = "initial";
      } else if (!selectValue.includes(Name)) {
        li.style.display = "none";
      }
    });

    ///style
    myImage.className = "cart-image";

    ////////appending all offfff them
    li.append(myImage, spanSummary, p, icone2, a);
    a.append(icone1);
    ul.append(li);
    continer.append(ul);
    select.append(newOption);
  }
};

getApi();

///////making input search
const inputSearch = document.querySelector("#search-input");

inputSearch.addEventListener("keyup", function (e) {
  const valueSearch = e.target.value.toLowerCase();
  const allShows = document.querySelectorAll("li");
  console.log(allShows);
  for (let allShow of allShows) {
    const valueShow = allShow.querySelector("p").textContent;
    if (valueShow.includes(valueSearch)) {
      allShow.style.display = "initial";
    } else {
      allShow.style.display = "none";
    }
  }
});

///////////////making summary

ul.addEventListener("click", (e) => {
  if (e.target instanceof HTMLImageElement) {
    // console.log(e.target.nextElementSibling);
    e.target.nextElementSibling.classList.toggle("span-image");
    e.target.classList.toggle("size-image");
  }
});

////finished🌚
