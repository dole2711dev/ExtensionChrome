let keySearch = "";
// -------------------------- FUNCTION --------------------------

window.onload = function () {
	initialization();
};

function initialization() {
	window.addEventListener(
		"hashchange",
		function () {
			createDropdowSnippets();

			let textArea = document.querySelector(`#${idChatText}`);
			textArea.addEventListener("keyup", handlerKeyUp);
			textArea.addEventListener(
				"focusout",
				toggleDropdowSnippets(STYLE_DISPLAY_NONE)
			);
		},
		false
	);

	// Assign event add element to selected list
	document
		.querySelectorAll(".select__option")
		.forEach((element) => handleAddItemToSelectedList(element));

	// Assign event redirect to section
	document.querySelectorAll(".home__feature-btn").forEach((el) => {
		el.addEventListener("click", () =>
			toggleManagerTarget(el.dataset.value)
		);
	});

	document
		.querySelector(`#selectTarget .selected__list`)
		.addEventListener("click", () =>
			toggleClassNameElement("select__content", "open_list")
		);

	handleDeleteItemFromSelectedList();
}

/**
 * Add element to selected list
 * @param {Elemnent add to list} element
 */
function handleAddItemToSelectedList(element) {
	element.addEventListener("click", function (event) {
		// Prevent affect event from child element to parent element
		event.stopPropagation();

		// Find elmenent parent
		let value = element.dataset.valueOption;
		let parentElement =
			element.closest(".select__content").firstElementChild;

		// Create new element add to selected item list
		let newElement = document.createElement("div");
		newElement.className = `select__item-selected`;
		newElement.setAttribute("data-value-selected", value);
		newElement.innerHTML = `<span>${value}</span><div class="select__icon close">✖</div>`;
		parentElement.appendChild(newElement);

		// Remove element after add to selected list
		element.remove();
	});
}

function handleDeleteItemFromSelectedList() {
	document.querySelectorAll(`.select__icon.close`).forEach((element) => {
		element.addEventListener("click", function (event) {
			// Prevent event affect from child element to parent element
			event.stopPropagation();

			// Add class element to delete
			let elementDelete = element.closest(".select__item-selected");
			elementDelete.classList.add("remove");

			// Returned element to item select list
			let valueReturned = elementDelete.dataset.valueSelected;

			// Delete element
			setTimeout(() => {
				elementDelete.remove();
			}, 500);
		});
	});
}

function toggleClassNameElement(className, classToggle = "active") {
	document.querySelector(`.${className}`).classList.toggle(classToggle);
}

function toggleManagerTarget(value) {
	document.querySelectorAll(`.container__slides .slide`).forEach((el) => {
		if (el.id == value) {
			el.classList.add("active");
			return;
		}

		el.classList.remove("active");
	});
}
