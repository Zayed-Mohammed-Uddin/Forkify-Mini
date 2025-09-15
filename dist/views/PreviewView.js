"use strict";
import { API_KEY } from "../config.js";

class PreviewView {
	_generate(list) {
		const id = window.location.hash.slice(1);
		return `<li class="list--item ${
			id === list.id ? "list--item__selected" : ""
		}">
                    <a class="list__item__link" href="#${list.id}">
                        <div class="col-md-2">
                            <figure class="list--item-image">
                                <div class="overlay" style="opacity:0.35"></div>
                                <img src="${list.image_url}" alt="${
			list.title
		}" />
                            </figure>
                        </div>
                        <div class="col-md-10">
                            <div class="list--item-desc">
                                <div class="list--item-desc-info">
                                    <h5>${list.title}</h5>
                                    <p class="text-muted text-uppercase list__description">${
										list.publisher
									}</p>
                                </div>
                                ${
									list.key === API_KEY
										? `<div class="list--item-desc-icon">
                                        <i class="fas fa-user-circle"></i>
                                    </div>`
										: ""
								}
                                
                            </div>
                        </div>
                    </a>
                </li>`;
	}
}

export default new PreviewView();
