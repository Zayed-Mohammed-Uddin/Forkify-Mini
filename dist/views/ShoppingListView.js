"use strict";
import View from "./View.js";
class ShoppingListView extends View {
	_parentEl = document.querySelector(".modal-container");
	_message = "Please add items to your shopping list!";
	_generateMarkup() {
		return this._data
			.map((ls) => {
				return `
                <div class="input--lists d-flex mb-3">
                    <input class="form-control" type="text" value="${ls}" title="${ls}" disabled readonly>
                    <button type="button" class="btn btn-primary btn-edit"><i class="fad fa-edit"></i>Edit</button>
                    <button type="button" class="btn btn-danger btn-delete"><i class="fad fa-trash-alt"></i>Delete</button>
                </div>`;
			})
			.join("\n");
	}
	_addHandlerLoadShoppingList(handler) {
		handler();
	}
	_addHandlerEditShoppingList(handler) {
		let clicked = false;
		this._parentEl.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn-edit");
			if (!btn) return;
			const input = btn.parentElement.firstElementChild;
			const value = input.getAttribute("value");

			if (!clicked) {
				input.readOnly = false;
				input.disabled = false;
				clicked = true;
			} else {
				input.readOnly = true;
				input.disabled = true;
				input.setAttribute("value", input.value.trim());
				input.setAttribute("title", input.value.trim());
				input.value = input.value.trim();
				clicked = false;

				const shoppingItem = {
					oldValue: value,
					changedValue: input.value.trim(),
				};
				handler(undefined, shoppingItem, true);
			}
		});
	}
	_addHandlerDeleteShoppingList(handler) {
		this._parentEl.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn-delete");
			if (!btn) return;
			handler(false, btn.parentElement.firstElementChild.value);
		});
	}
}

export default new ShoppingListView();
