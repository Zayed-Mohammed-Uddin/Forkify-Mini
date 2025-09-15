"use strict";
export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
export const API_KEY = `ee3e0cb4-58e7-41f8-9370-3ea398c25048`;
export const SPOONACULAR_API_URL =
	"https://api.spoonacular.com/recipes/parseIngredients";
export const SPOONACULAR_API_KEY = "807f9ce15df244db8b050e8c9c484bb4";
export const addToRecipe = document.querySelector(".add_to_recipe");
export const sideBar = document.querySelector(".sidebar");
export const listContainer = document.querySelector(".list--container");
export const recipeContainer = document.querySelector(".recipe_container");
export const bookmarkContainer = document.querySelector(".bookmark_container");
export const searchInput = document.querySelector("#search_input");
export const searchBtn = document.querySelector("#search_btn");
export const searchText = document.querySelector(".text-search");
export const RESULTS_PER_PAGE = 10;
export let recipeLoaded = false;
const TIMEOUT_SEC = 10;

const timeout = function (s) {
	return new Promise((_, reject) => {
		setTimeout(
			() =>
				reject(
					new Error(
						`Request taking too long! Timeout after ${s} seconds`
					)
				),
			s * 1000
		);
	});
};

export const AJAX = async (
	url,
	uploadRecipe = undefined,
	contentType = undefined
) => {
	try {
		const res = uploadRecipe
			? await Promise.race([
					fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": contentType,
						},
						body:
							contentType === "application/json"
								? JSON.stringify(uploadRecipe)
								: new URLSearchParams(uploadRecipe),
					}),
					timeout(TIMEOUT_SEC),
			  ])
			: await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
		recipeLoaded = true;
		if (!res.ok) throw new Error(`${res.statusText} not found!`);
		return await res.json();
	} catch (error) {
		throw error;
	}
};
export const renderSpinner = function (parentEl = recipeContainer) {
	const markup = `<div id="spinner" class="spinner"></div>`;
	parentEl.innerHTML = "";
	parentEl.insertAdjacentHTML("afterbegin", markup);
	const spinner = document.querySelector("#spinner");
	setTimeout(() => {
		if (spinner && recipeLoaded) spinner.remove();
	}, 500);
};
