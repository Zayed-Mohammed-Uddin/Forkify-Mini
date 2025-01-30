"use strict";
import View from "./View.js";
import PreviewView from "./PreviewView.js";
class MealPlannerView extends View {
	_parentEl;
	_setParentElement(index) {
		this._parentEl = Array.from(document.querySelectorAll(".meal"))[index];
	}
	_generateMarkup() {
		return this._data.map((list) => PreviewView._generate(list)).join("");
	}
	_addHandlerRender(handler) {
		handler();
	}
}

export default new MealPlannerView();
