"use strict";
import * as config from "../config.js";
import PreviewView from "./PreviewView.js";
import View from "./View.js";

class RecipeListView extends View {
	_parentEl = config.listContainer;
	_message = `No recipes found for your query. Please try again!`;
	_generateMarkup() {
		return this._data.map((list) => PreviewView._generate(list)).join("");
	}

	_addHandlerRender(handler) {
		handler();
	}
}

export default new RecipeListView();
