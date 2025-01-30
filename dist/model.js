"use strict";
import {
	API_URL,
	API_KEY,
	RESULTS_PER_PAGE,
	AJAX,
	SPOONACULAR_API_URL,
	SPOONACULAR_API_KEY,
} from "./config.js";

export const state = {
	theme: "light",
	recipe: {},
	search: {
		query: "",
		page: 1,
		numberOfResPerPage: RESULTS_PER_PAGE,
		results: [],
		resultsPerPage: [],
	},
	bookmarks: [],
	meals: {},
};

const getIngredientsList = function () {
	return state.recipe.ingredients
		.map((ing) =>
			`${ing.quantity ?? ""} ${ing.unit ?? ""} ${ing.description}`.trim()
		)
		.join("\n");
};

const getTotalNutritions = function (ingredientsData, nutrient) {
	return ingredientsData
		.map((data) => {
			const nutrientObj = data?.nutrition?.nutrients.find(
				(ing) => ing?.name.toLowerCase() === nutrient
			);
			if (nutrient === "calories")
				state.recipe.caloriesUnit = nutrientObj?.unit;
			else if (nutrient === "carbohydrates")
				state.recipe.carbsUnit = nutrientObj?.unit;
			else if (nutrient === "protein")
				state.recipe.proteinsUnit = nutrientObj?.unit;
			else state.recipe.fatsUnit = nutrientObj?.unit;
			return nutrientObj?.amount;
		})
		.reduce((acc, data) => (acc += data), 0)
		.toFixed(2);
};

export const loadNutrientsData = async function () {
	// loading the nutrients data of the recipe
	try {
		const ingredientsData = await AJAX(
			`${SPOONACULAR_API_URL}?apiKey=${SPOONACULAR_API_KEY}`,
			{
				ingredientList: getIngredientsList(),
				servings: state.recipe.servings,
				includeNutrition: true,
			},
			"application/x-www-form-urlencoded"
		);
		state.recipe.calories = getTotalNutritions(ingredientsData, "calories");
		state.recipe.carbs = getTotalNutritions(
			ingredientsData,
			"carbohydrates"
		);
		state.recipe.proteins = getTotalNutritions(ingredientsData, "protein");
		state.recipe.fat = getTotalNutritions(ingredientsData, "fat");
	} catch (error) {
		throw new error();
	}
};

export const loadRecipe = async function (hash) {
	try {
		const {
			data: { recipe },
		} = await AJAX(
			`${API_URL}/${hash}?key=${API_KEY}`,
			null,
			"application/json"
		);

		state.recipe = {
			id: hash,
			type: "recipe",
			title: recipe.title,
			publisher: recipe.publisher,
			image_url: recipe.image_url,
			ingredients: recipe.ingredients,
			cooking_time: recipe.cooking_time,
			servings: recipe.servings,
			source_url: recipe.source_url,
			shoppingList:
				JSON.parse(localStorage.getItem("shoppinglist")) || [],
			...(recipe.key && { key: recipe.key }),
		};
		if (state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id))
			state.recipe.bookmarked = true;
		else state.recipe.bookmarked = false;
	} catch (error) {
		throw error;
	}
};

export const loadSearchResults = async function (keyword) {
	try {
		const {
			data: { recipes },
		} = await AJAX(
			`${API_URL}?search=${keyword}&key=${API_KEY}`,
			null,
			"application/json"
		);

		state.search.query = keyword;
		state.search.results = recipes.map((rec) => {
			return {
				id: rec.id,
				title: rec.title,
				...(rec.key && { key: rec.key }),
				publisher: rec.publisher,
				image_url: rec.image_url,
			};
		});
		state.search.page = 1;
	} catch (error) {
		throw error;
	}
};

export const loadSearchResultsPerPage = function (page = state.search.page) {
	state.search.page = page;
	state.search.resultsPerPage = state.search.results.slice(
		(page - 1) * RESULTS_PER_PAGE,
		page * RESULTS_PER_PAGE
	);
	return state.search.resultsPerPage;
};

export const updateServings = function (newServings) {
	state.recipe.servings < newServings
		? (state.recipe.cooking_time += 15)
		: (state.recipe.cooking_time -= 15);
	state.recipe.ingredients.forEach((ing) => {
		ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
	});
	state.recipe.servings = newServings;
};

export const savedNightMode = function () {
	localStorage.setItem("nightmode", JSON.stringify(state.theme));
};

const loadNightMode = (function () {
	const nightmode = localStorage.getItem("nightmode");
	if (nightmode) state.theme = JSON.parse(nightmode);
})();

const loadSavedBookmarks = (function () {
	const storage = localStorage.getItem("bookmarks");
	if (storage) state.bookmarks = JSON.parse(storage);
})();

const loadSavedShoppingList = (function () {
	const list = localStorage.getItem("shoppinglist");
	if (list) state.recipe.shoppingList = JSON.parse(list) || [];
})();
const loadSavedPlannedRecipes = (function () {
	const plannedRecipe = localStorage.getItem("plannedRecipe");
	if (plannedRecipe) state.meals = JSON.parse(plannedRecipe) || [];
})();
const savedShoppingList = function () {
	localStorage.setItem(
		"shoppinglist",
		JSON.stringify(state.recipe.shoppingList)
	);
};

export const addShoppingList = function (shoppingItem) {
	state.recipe.shoppingList.push(shoppingItem);
	savedShoppingList();
};

export const editShoppingList = function (shoppingItem) {
	let index = state.recipe.shoppingList.findIndex(
		(item) => item === shoppingItem.oldValue
	);
	if (index !== -1) {
		state.recipe.shoppingList[index] = shoppingItem.changedValue;
		savedShoppingList();
	}
};

export const removeShoppingList = function (shoppingItem) {
	let index = state.recipe.shoppingList.findIndex(
		(item) => item === shoppingItem
	);
	if (index !== -1) {
		state.recipe.shoppingList.splice(index, 1);
		savedShoppingList();
	}
};

export const savedBookmarks = function () {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
	state.recipe.bookmarked = true;
	state.bookmarks.push(recipe);
	savedBookmarks();
};

export const removeBookmark = function (id) {
	const idx = state.bookmarks.findIndex(
		(bookmark) => bookmark.id === state.recipe.id
	);
	if (idx !== -1) {
		state.bookmarks.splice(idx, 1);
		state.recipe.bookmarked = false;
	}
	savedBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
	try {
		const {
			data: { recipe },
		} = await AJAX(
			`${API_URL}?key=${API_KEY}`,
			newRecipe,
			"application/json"
		);
		state.recipe = recipe;
		state.recipe.shoppingList = [];
		state.recipe.type = "recipe";
		addBookmark(state.recipe);
	} catch (error) {
		throw error;
	}
};

export const insertPlannerRecipe = function (
	mealPositions,
	selectedWeekday,
	selectedCategories
) {
	mealPositions.forEach((mealPos, idx) => {
		if (mealPos.i === selectedWeekday && mealPos.j === selectedCategories) {
			state.meals.plannedIndex = idx;
			state.meals.plannedMeals = [state.recipe];
			savedPlannedRecipe();
		}
	});
};

const savedPlannedRecipe = function () {
	localStorage.setItem("plannedRecipe", JSON.stringify(state.meals));
};
