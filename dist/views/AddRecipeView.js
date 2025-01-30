"use strict";
import View from "./View.js";

class AddRecipeView extends View {
	_parentEl = document.querySelector(".newModal");
	_formEl = document.querySelector(".form_container");
	_title = document.querySelector("#title");
	_publisher = document.querySelector("#publisher");
	_prep_time = document.querySelector("#prep_time");
	_url = document.querySelector("#url");
	_image_url = document.querySelector("#image-url");
	_servings = document.querySelector("#servings");
	_message = `Successfully Uploaded the recipe`;
	_addHandlerRender(handler) {
		this._formEl.addEventListener("click", (e) => {
			const btn_upload = e.target.closest(".btn-upload");
			if (!btn_upload) return;
			else e.preventDefault();
			const quantities = Array.from(
				document.querySelectorAll(".new_quantity")
			);
			const units = Array.from(document.querySelectorAll(".new_unit"));
			const ingredients = Array.from(
				document.querySelectorAll(".new_ingredient")
			);
			const recipe = {
				title: this._title.value,
				source_url: this._url.value,
				image_url: this._image_url.value,
				publisher: this._publisher.value,
				cooking_time: parseInt(this._prep_time.value),
				servings: +this._servings.value,
				ingredients: quantities.map((q, i) => {
					return {
						quantity: +q.value,
						unit: units[i].value,
						description: ingredients[i].value,
					};
				}),
			};
			handler(recipe);
		});
	}
}

export default new AddRecipeView();
