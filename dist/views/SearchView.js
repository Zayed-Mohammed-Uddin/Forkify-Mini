"use strict";
import { searchBtn, searchInput } from "../config.js";

class SearchView {
	_getQueryFromURL() {
		const url = new URL(window.location);
		const query = url.searchParams.get("search");
		return query;
	}
	_getRecipeFromURL() {
		const url = new URL(window.location);
		const recipe = url.hash;
		return recipe;
	}
	_setRecipeToURL() {
		const url = new URL(window.location);
		if (!url.hash) return;
		url.hash = "";
	}
	_getQuery() {
		const query = searchInput.value.trim();
		searchInput.value = "";
		// setting the search query to the location
		this._setQuery(query);
		return query;
	}
	_setQuery(query) {
		const url = new URL(window.location);
		url.searchParams.set("search", query);
		window.history.pushState({}, "", url);
	}
	_addHandlerRender(handler) {
		searchBtn.addEventListener("click", function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();
