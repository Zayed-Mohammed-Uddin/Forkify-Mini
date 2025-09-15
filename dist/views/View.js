"use strict";

import { recipeLoaded, searchText } from "../config.js";

export default class View {
	/**
	 * Render the received object to the DOM
	 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
	 * @returns {undefined | string} A markup string is returned if render=false
	 * @this {Object} View instance
	 * @author Zayed Uddin
	 * @todo Finish implementation
	 */
	_data;
	_clear() {
		this._parentEl.innerHTML = "";
	}
	_update(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) {
			if (this._parentEl.classList.contains("bookmark_container"))
				this._renderError(`No recipe has been bookmarked yet!`);
			else this._renderError();
			return;
		}
		this._data = data;

		const newMarkUp = this._generateMarkup();
		const newDOM = document
			.createRange()
			.createContextualFragment(newMarkUp);
		const newElements = Array.from(newDOM.querySelectorAll("*"));
		const curElements = Array.from(this._parentEl.querySelectorAll("*"));

		newElements.forEach((newEl, index) => {
			const curEl = curElements[index];
			if (
				!newEl.isEqualNode(curEl) &&
				newEl.firstChild.nodeValue?.trim() !== ""
			) {
				curEl.textContent = newEl.textContent;
			}
			if (!newEl.isEqualNode(curEl)) {
				Array.from(newEl.attributes).forEach((attr) =>
					curEl.setAttribute(attr.name, attr.value)
				);
			}
		});
	}
	_render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) {
			if (this._parentEl.classList.contains("bookmark_container"))
				this._renderError(`No recipe has been bookmarked yet!`);
			else this._renderError();
			return;
		}
		this._data = data;
		if (this._data.type === "recipe") this._parentEl.style.padding = "0px";
		if (recipeLoaded) searchText.style.display = "none";
		else searchText.style.display = "flex";
		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup());
	}
	_renderError() {
		const markup = this._parentEl.classList.contains("modal-container")
			? `<div class="shopping--list--message d-flex">
                <i class="fas fa-shopping-cart"></i>
                <p>${this._message}</p>
            </div>`
			: `<div class="error">
				<i class="fa-solid fa-triangle-exclamation"></i>
				<p>${this._message}</p>
			</div>`;
		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", markup);
	}

	_renderMessage() {
		let markup;
		if (this._parentEl.classList.contains("newModal")) {
			markup = `
			<div class="message">
				<i class="fas fa-check-circle"></i>
				<p>${this._message}</p>
			</div>`;
		} else {
			markup = `
				<div class="col-md-6">
					<div class="info-service">
						<i class="fas fa-search"></i>
						<h6>Search over 1,000,000 recipes</h6>
						<p class="mb-0">
							Bookmark them, add recipes to your weekly meal
							planner and select what ingredients you need to buy.
						</p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="info-service">
						<i class="fas fa-edit"></i>
						<h6>Add your favorite recipes</h6>
						<p class="mb-0">
							Give us an URL of your favorite recipe on the
							Internet, an URL of its image and some more details.
						</p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="info-service">
						<i class="fas fa-clipboard-list"></i>
						<h6>Personalize your shopping list</h6>
						<p class="mb-0">
							Personal or recipe-selected ingredients can be
							gathered in your easy-editable shopping list.
						</p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="info-service mb-5">
						<i class="fas fa-calendar-alt"></i>
						<h6>Find all your future meals</h6>
						<p class="mb-0">
							Take time every monday to think about your
							nutritional goals for the next week.
						</p>
					</div>
				</div>
		  `;
		}
		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", markup);
	}
}
