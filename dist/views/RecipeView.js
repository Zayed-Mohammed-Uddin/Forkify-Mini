"use strict";
import fracty from "../../node_modules/fracty/fracty.js";
import * as config from "../config.js";
import View from "./View.js";

class RecipeView extends View {
	_parentEl = config.recipeContainer;
	_message = `Start by searching for a recipe or an ingredient. Have fun!`;
	constructor() {
		super();
		this._renderMessage();
	}
	_generateMarkup() {
		return `<div class="col-md-12" style="height: 100%" id="${
			this._data.id
		}">
					<div class="item-details">
						<div
							class="item-details-banner position-relative"
						>
							<div class="overlay"></div>
							<img
								src="${this._data.image_url}"
								alt="${this._data.title}"
							/>
							<div
								class="item-details-banner-text"
							>
								<span title="${this._data.title}">
									${this._data.title}
								</span>
							</div>
						</div>
					</div>
					<div class="recipe__details">
						<div class="recipe__details__info">
							<div class="recipe-info">
								<i class="fad fa-clock"></i>
								<span class="item-info-text">${this._data.cooking_time}</span>
								<span class="item-info-label">MINUTES</span>
							</div>
							<div class="recipe-info">
								<i class="fad fa-users"></i>
								<span class="item-info-text">${this._data.servings}</span>
								<span class="item-info-label">SERVINGS</span>
								<button class="btn_update_servings" data-update-to=${this._data.servings - 1}>
									<i class="fad fa-minus-circle"></i>
								</button>
								<button class="btn_update_servings" data-update-to=${this._data.servings + 1}>
									<i class="fad fa-plus-circle"></i>
								</button>
							</div>
						</div>
						<div class="recipe-details-icons">
							${
								this._data.key === config.API_KEY
									? `<div class="recipe-user-icon">
                            				<i class="fad fa-user-circle"></i>
                        				</div>`
									: ``
							}
							
							<div class="btn__bookmark ${this._data.bookmarked ? "bookmark__selected" : ""}">
								<i class="fad fa-bookmark"></i>
							</div>
						</div>
					</div>
					<div class="recipe__nutrient__details">
						<div class="recipe__nutrient__header">
							<h3>Nutritional data / serving</h3>
						</div>
                        <div class="nutrients">
							<div class="nutrient">
								<div class="name">
									<strong>Calories</strong>
								</div>
								<div class="amount">
									${Boolean(this._data.calories) ? this._data.calories : "TBD"} ${
			Boolean(this._data.caloriesUnit) ? this._data.caloriesUnit : "TBD"
		}
								</div>
							</div>
							<div class="nutrient">
								<div class="name">
								<strong>Carbs</strong>
								</div>
								<div class="amount">
									${Boolean(this._data.carbs) ? this._data.carbs : "TBD"} ${
			Boolean(this._data.carbsUnit) ? this._data.carbsUnit : "TBD"
		}
								</div>
							</div>
							<div class="nutrient">
								<div class="name">
									<strong>Proteins</strong>
								</div>
								<div class="amount">
									${Boolean(this._data.proteins) ? this._data.proteins : "TBD"} ${
			Boolean(this._data.proteinsUnit) ? this._data.proteinsUnit : "TBD"
		}
								</div>
							</div>
							<div class="nutrient">
								<div class="name">
									<strong>Fat</strong>
								</div>
								<div class="amount">
									${Boolean(this._data.fat) ? this._data.fat : "TBD"} ${
			Boolean(this._data.fatsUnit) ? this._data.fatsUnit : "TBD"
		}
								</div>
							</div>
						</div>
                    </div>
					<div class="ingredients-container">
						<h3>Recipe Ingredients</h3>
						<ul
							class="ingredients-list"
							type="none"
						>
							<div class="row g-0">
								<div class="col-md-6">
									${this._data.ingredients
										.map((ing, idx) => {
											if (
												idx <=
												Math.floor(
													this._data.ingredients
														.length / 2
												)
											) {
												return `
											<div class="list-tile">
												<i class="fad fa-check-circle"></i>
												<i class="fad fa-cart-plus"></i>
												<li>
													<span class="quantity">${
														ing.quantity == null
															? "1"
															: fracty(
																	ing.quantity
															  )
													}</span>
													<span class="unit">${ing.unit}</span>
													<span class="description">${ing.description}</span>
												</li>
											</div>`;
											}
										})
										.join(" ")}
								</div>
								<div class="col-md-6">
									${this._data.ingredients
										.map((ing, idx) => {
											if (
												idx >
													Math.floor(
														this._data.ingredients
															.length / 2
													) &&
												idx <
													this._data.ingredients
														.length
											)
												return `
										<div class="list-tile">
											<i class="fad fa-check-circle"></i>
											<i class="fad fa-cart-plus"></i>
											<li>
												<span class="quantity">${
													ing.quantity == null
														? "1"
														: fracty(ing.quantity)
												}</span>
												<span class="unit">${ing.unit}</span>
												<span class="description">${ing.description}</span>
											</li>
										</div>`;
										})
										.join(" ")}
								</div>
							</div>
						</ul>
						<div class="link-shopping-list">
							<i class="fad fa-plus"></i>
							<a data-bs-toggle="modal" data-bs-target="#linkModal">Click on the item to add to the shopping list!</a>
						</div>
					</div>
					<div class="cooking-directions">
						<h3>How to cook it</h3>
						<p>
							This recipe was carefully designed
							and tested by
							<b>${this._data.publisher}</b>. Please check
							out directions at their website.
						</p>
						<button
							class="btn-direction text-uppercase px-3 py-2"
						>
							<a class="text-decoration-none text-white" target="_blank" href="${
								this._data.source_url
							}">
								Direction
								<i class="fad fa-arrow-circle-right"></i>
							</a>
						</button>
					</div>
					<div class="plan-your-meal position-relative">
						<h3>Plan your meal</h3>
						<div class="plan-your-meal-category">
							<div class="meal-category weekdays">
								<label for="weekday"><i class="fad fa-calendar-edit"></i> Weekdays</label>
								<select class="form-select" name="weekday" id="weekday">
									<option value="0">Monday</option>
									<option value="1">Tuesday</option>
									<option value="2">Wednesday</option>
									<option value="3">Thursday</option>
									<option value="4">Friday</option>
									<option value="5">Saturday</option>
									<option value="6">Sunday</option>
								</select>
							</div>
							<div class="meal-category meal-type">
								<label for="mealType"><i class="fad fa-burger-soda"></i> Meal Type</label>
								<select class="form-select" name="mealType" id="mealType">
									<option value="0">Breakfast</option>
									<option value="1">Lunch</option>
									<option value="2">Dinner</option>
									<option value="3">Snacks</option>
								</select>
							</div>
							<div class="meal-category week-type">
								<label for="weekType"><i class="fad fa-retweet-alt"></i> Meal Type</label>
								<select class="form-select" name="weekType" id="weekType">
									<option value="0">Current Week</option>
								</select>
							</div>
						</div>
						<button type="submit" class="btn-meal-planner">
							Submit
							<i class="fad fa-arrow-circle-right"></i>
						</button>
						<div class="meal-planner-link">
							<i class="fad fa-calendar-alt"></i>
							<p>Check your <a class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#plannerModal">Meal Planner</a></p>
						</div>
						<div class="timer">
							<p class="timer_text mb-0">
								<i class="fad fa-clock"></i>
								You will be logged out in
								<span class="session_timer">09:59</span>
							</p>
						</div>
					</div>
				</div>`;
	}
	_addHandlerRender(handler) {
		["load", "hashchange"].forEach((ev) => {
			window.addEventListener(ev, handler);
		});
	}
	_startTimer() {
		const sessionTimer = document.querySelector(".session_timer");
		sessionTimer.textContent = "05:00";

		let [min, second] = sessionTimer.textContent
			.split(":")
			.map((time) => Number(time));

		const intervalID = setInterval(() => {
			if (second === 0) {
				if (min === 0) {
					sessionTimer.textContent =
						`${min}`.padStart(2, 0) +
						`:` +
						`${second}`.padStart(2, 0);
					setTimeout(() => {
						window.location.href = window.location.origin;
					}, 1000);
					clearInterval(intervalID);
					alert("You are logged out!");
				} else {
					min--;
					second = 59;
				}
			} else {
				second--;
			}
			sessionTimer.textContent =
				`${min}`.padStart(2, 0) + `:` + `${second}`.padStart(2, 0);
		}, 1000);

		return intervalID;
	}
	_addHandlerRenderServings(handler) {
		this._parentEl.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn_update_servings");
			if (!btn) return;
			const { updateTo } = btn.dataset;
			if (+updateTo >= 1) handler(+updateTo);
		});
	}
	_addHandlerRenderBookmark(handler) {
		this._parentEl.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn__bookmark");
			if (!btn) return;
			handler();
		});
	}
	_addHandlerRenderAddShoppingList(handler) {
		this._parentEl.addEventListener("click", (e) => {
			const ingItem = e.target.closest(".list-tile li");
			if (!ingItem) return;
			handler(
				true,
				ingItem.textContent.trim().replace(/\s+/g, " ").toUpperCase()
			);
		});
	}
	_addHandlerRenderMealPlanner(handler) {
		this._parentEl.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn-meal-planner");
			if (!btn) return;

			const weekdays = document.querySelector("#weekday");
			const categories = document.querySelector("#mealType");

			const meals = Array.from(document.querySelectorAll(".meal"));
			const mealPositions = meals.map((meal) => meal.dataset);

			// get the selected values
			const selectedWeekday = weekdays.value;
			const selectedCategories = categories.value;
			if (!mealPositions && !selectedWeekday && !selectedCategories)
				return;
			else {
				handler(mealPositions, selectedWeekday, selectedCategories);
			}
		});
	}
}

export default new RecipeView();
