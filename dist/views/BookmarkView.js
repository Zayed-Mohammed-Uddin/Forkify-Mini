"use strict";
import View from "./View.js";
import * as config from "../config.js";
import PreviewView from "./PreviewView.js";
class BookmarkView extends View {
	_parentEl = config.bookmarkContainer;
	_message = `No recipe has been bookmarked yet!`;
	_generateMarkup() {
		return this._data.map((list) => PreviewView._generate(list)).join("");
	}
	_addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}
}

export default new BookmarkView();
