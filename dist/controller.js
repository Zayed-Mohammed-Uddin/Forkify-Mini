"use strict";
import * as model from "./model.js";
import * as config from "./config.js";
import SearchView from "./views/SearchView.js";
import RecipeView from "./views/RecipeView.js";
import RecipeListView from "./views/RecipeListView.js";
import PaginationView from "./views/PaginationView.js";
import BookmarkView from "./views/BookmarkView.js";
import NightModeView from "./views/NightModeView.js";
import AddRecipeView from "./views/AddRecipeView.js";
import ShoppingListView from "./views/ShoppingListView.js";
import MealPlannerView from "./views/MealPlannerView.js";

const controlRecipe = async function () {
	try {
		// loading from the URL
		const hash = this.window.location.hash.replace("#", "");
		if (!hash) {
			return;
		}
		// adding the background for the selected item
		RecipeListView._update(model.loadSearchResultsPerPage());
		// adding the background for the selected item in the bookmark
		BookmarkView._update(model.state.bookmarks);
		// loading the recipe
		await model.loadRecipe(hash);
		// loading the nutrients data
		await model.loadNutrientsData();
		// rendering the spinner
		config.renderSpinner();
		// rendering the recipe
		RecipeView._render(model.state.recipe);
		// starting the timer
		RecipeView._startTimer();
	} catch (error) {
		console.error(error);
		RecipeView._renderError(error);
	}
};

const controlRecipeListOnLoad = async function (query) {
	try {
		if (!query) return;
		// loading the search results
		await model.loadSearchResults(query);
		// rendering the spinner
		config.renderSpinner(config.listContainer);
		// rendering the search results
		RecipeListView._render(model.loadSearchResultsPerPage());
		// rendering the pagination
		PaginationView._render(model.state.search);
	} catch (error) {
		RecipeListView._renderError(error);
	}
};

const controlRecipeList = function () {
	const query = SearchView._getQuery();
	SearchView._setRecipeToURL();
	controlRecipeListOnLoad(query);
};

const controlRecipeLoadURL = function () {
	const query = SearchView._getQueryFromURL();
	const recipe = SearchView._getRecipeFromURL();
	if (!query && recipe) {
		RecipeListView._renderError("Recipe Lists Failed to Load");
		return;
	}
	controlRecipeListOnLoad(query);
};

const controlRecipePagination = function (goto) {
	// rendering the spinner
	config.renderSpinner(config.listContainer);
	// rendering the search results
	RecipeListView._render(model.loadSearchResultsPerPage(goto));
	// rendering the pagination
	PaginationView._render(model.state.search);
};

const controlServings = async function (newServings) {
	try {
		model.updateServings(newServings);
		await model.loadNutrientsData();
		RecipeView._update(model.state.recipe);
	} catch (error) {
		throw new error();
	}
};

const controlBookmark = function () {
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.removeBookmark();
	RecipeView._update(model.state.recipe);
	BookmarkView._render(model.state.bookmarks);
};
const controlSavedBookmark = function () {
	BookmarkView._render(model.state.bookmarks);
};

const controlNightMode = function () {
	let trans = () => {
		document.body.classList.add("transition");

		window.setTimeout(() => {
			document.body.classList.remove("transition");
		}, 1000);
	};
	const checkbox = document.querySelector("input[name=mode]");

	if (model.state.theme === "dark") {
		checkbox.checked = true;
		trans();
		document.body.setAttribute("data-theme", "dark");
	} else {
		checkbox.checked = false;
		trans();
		document.body.setAttribute("data-theme", "light");
	}

	checkbox.addEventListener("change", function () {
		if (this.checked) {
			trans();
			document.body.setAttribute("data-theme", "dark");
			model.state.theme = "dark";
			model.savedNightMode();
		} else {
			trans();
			document.body.setAttribute("data-theme", "light");
			model.state.theme = "light";
			model.savedNightMode();
		}
	});
};

const controlAddRecipe = async function (recipe) {
	try {
		config.renderSpinner();
		await model.uploadRecipe(recipe);
		controlSavedBookmark();
		AddRecipeView._renderMessage();
		RecipeView._render(model.state.recipe);
		window.history.pushState({}, "", `#${model.state.recipe.id}`);
	} catch (error) {
		AddRecipeView._renderError(error);
	}
};

const controlSavedShoppingList = function () {
	ShoppingListView._render(model.state.recipe.shoppingList);
};

const controlShoppingList = function (operation, item, edit = false) {
	if (edit) {
		model.editShoppingList(item);
	} else {
		operation
			? model.addShoppingList(item)
			: model.removeShoppingList(item);
	}
	ShoppingListView._render(model.state.recipe.shoppingList);
};

const controlMealPlanner = function (
	mealPositions,
	selectedWeekday,
	selectedCategories
) {
	model.insertPlannerRecipe(
		mealPositions,
		selectedWeekday,
		selectedCategories
	);
	MealPlannerView._setParentElement(model.state.meals.plannedIndex);
	MealPlannerView._render(model.state.meals.plannedMeals);
};

const controlMealPlannerOnLoad = function () {
	if (JSON.stringify(model.state.meals) === "{}") return;
	MealPlannerView._setParentElement(model.state.meals.plannedIndex);
	MealPlannerView._render(model.state.meals.plannedMeals);
};

const init = () => {
	AddRecipeView._addHandlerRender(controlAddRecipe);
	NightModeView._addHandlerRender(controlNightMode);
	BookmarkView._addHandlerRender(controlSavedBookmark);
	RecipeListView._addHandlerRender(controlRecipeLoadURL);
	SearchView._addHandlerRender(controlRecipeList);
	RecipeView._addHandlerRender(controlRecipe);
	RecipeView._addHandlerRenderServings(controlServings);
	RecipeView._addHandlerRenderBookmark(controlBookmark);
	ShoppingListView._addHandlerLoadShoppingList(controlSavedShoppingList);
	RecipeView._addHandlerRenderAddShoppingList(controlShoppingList);
	ShoppingListView._addHandlerEditShoppingList(controlShoppingList);
	ShoppingListView._addHandlerDeleteShoppingList(controlShoppingList);
	// meal planner
	RecipeView._addHandlerRenderMealPlanner(controlMealPlanner);
	MealPlannerView._addHandlerRender(controlMealPlannerOnLoad);
	PaginationView._addHandlerRender(controlRecipePagination);
};

init();
