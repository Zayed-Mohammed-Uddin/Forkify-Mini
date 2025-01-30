"use strict";
import View from "./View.js";
class PaginationView extends View {
	_parentEl = document.querySelector(".pagination");
	_generateMarkup() {
		const prev_btn = `
        	<button data-goto="${this._data.page - 1}" class="btn--inline">
                <div class="search__icon">
                    <i
                        class="fa-solid fa-arrow-left"
                    ></i>
                </div>
                <span>Page ${this._data.page - 1}</span>
		    </button>`;

		const currPage = `
			<span style="color: var(--primary-color)">Page ${this._data.page}</span>`;

		const next_btn = `
		<button data-goto="${this._data.page + 1}" class="btn--inline">
			<span>Page ${this._data.page + 1}</span>
			<div class="search__icon">
				<i
					class="fa-solid fa-arrow-right"
				></i>
			</div>
		</button>`;

		this._data.numPages = Math.ceil(
			this._data.results.length / this._data.numberOfResPerPage
		);

		// at page 1 and have other pages
		if (this._data.page === 1 && this._data.numPages > 1) return next_btn;
		// at page 1 and have no other pages
		if (this._data.page === 1) {
			if (
				this._data.page === 1 &&
				this._data.page === this._data.numPages
			) {
				return "Only one page found!";
			}
			return "No page found!";
		}

		// Last page
		if (this._data.page === this._data.numPages && this._data.numPages > 1)
			return prev_btn;

		// Other pages
		if (this._data.page < this._data.numPages)
			return prev_btn.concat(currPage).concat(next_btn);
	}
	_addHandlerRender(handler) {
		this._parentEl.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn--inline");
			if (!btn) return;
			const goto = +btn.dataset.goto;
			handler(goto);
		});
	}
}

export default new PaginationView();
