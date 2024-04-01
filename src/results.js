import api from "./api.js";

const resultsPane = document.getElementById("results");
const yearSelect = document.getElementById("year-select");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");

export const Categories = {
  None: Symbol("NONE"),
  All: Symbol("ALL"),
  Passed: Symbol("PASSED"),
  Failed: Symbol("FAILED"),
};

const status = {
  category: Categories.None,
  page: 1,
  pages: 0,
  total: 0,
  currentYear: null,
};

yearSelect.addEventListener("change", async (e) => {
  await getResults();
});

prevPage.addEventListener("click", async (e) => {
  status.page--;
  await getResults();
});

nextPage.addEventListener("click", async (e) => {
  status.page++;
  await getResults();
});

function renderFilms(response) {
  resultsPane.innerHTML = "";
  const filmDivs = [];
  for (let film of response.results) {
    filmDivs.push(formatFilm(film));
  }
  resultsPane.innerHTML = filmDivs.join("");
}

async function fillSelect() {
  // Fill the year dropdown on first call (Always All and all years)
  if (yearSelect.options.length === 0) {
    const years = await api.getYears();
    for (year of ["All Years", ...years]) {
      yearSelect.add(
        new Option(year, year == "All Years" ? null : Number(year))
      );
    }
  }
}

async function getResults(category) {
  await fillSelect();
  let response;

  // default to last used
  if (!category) category = status.category;

  // If it's changed, update the status.
  const selectedYear =
    yearSelect.value == "null" ? null : Number(yearSelect.value);
  if (status.category != category || selectedYear != status.currentYear) {
    if (category) status.category = category;
    status.page = 1;
    status.currentYear = selectedYear;
  }

  // Load the data
  if (category === Categories.All) {
    response = await api.getAll(status.page, status.currentYear);
  } else if (category === Categories.Failed) {
    response = await api.getFailed(status.page, status.currentYear);
  } else if (category === Categories.Passed) {
    response = await api.getPassed(status.page, status.currentYear);
  } else {
    console.error("Bad Category Used...");
  }

  status.pageCount = response.pageCount;
  status.count = response.count;

  renderFilms(response);
  enablePaging();
}

function enablePaging() {
  if (status.page == 1) prevPage.classList.add("hidden");
  else prevPage.classList.remove("hidden");
  if (status.page >= status.pageCount) nextPage.classList.add("hidden");
  else nextPage.classList.remove("hidden");
}

function formatFilm(film) {
  return `<div class="h-72 overflow-hidden bg-gray-100/50 hover:bg-primary-light rounded-lg m-1 dark:bg-gray-600/50 dark:text-white">
    <div class="w-48 flex-none relative">
      <img src="${film.posterUrl}" alt="${film.title}" class="absolute" />
    </div>
    <div class="ml-48 p-2">
      <div class="text-xl font-bold font-serif">${film.title}</div>
      <div><span class="font-bold w-24 inline-block">Year:</span>${
        film.year
      }</div>
      <div><span class="font-bold w-24 inline-block">Rating:</span>${
        film.rating
      }</div>
      <div><span class="font-bold w-24 inline-block">Passed:</span>Passed: ${
        film.passed
      }</div>
      <div><span class="font-bold w-24 inline-block">Reason:</span>Reason: ${
        film.reason
      }</div>
      <div><span class="font-bold w-24 inline-block">Budget:</span>Budget: $${film.budget.toLocaleString(
        "en-US"
      )}</div>
      <div><span class="font-bold w-24 inline-block">Dom. Gross:</span>Domestic Gross: $${film.domesticGross.toLocaleString(
        "en-US"
      )}</div>
      <div><span class="font-bold w-24 inline-block">Int'l Gross:</span>International Gross: $${film.internationalGross.toLocaleString(
        "en-US"
      )}</div>
      <p class="line-clamp-3">${film.overview}</p>
    </div>
  </div>`;
}

export const loadAll = async () => await getResults(Categories.All);
export const loadPassed = async () => await getResults(Categories.Passed);
export const loadFailed = async () => await getResults(Categories.Failed);
