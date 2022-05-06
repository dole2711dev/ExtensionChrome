let keySearch = "";
let targetCcList, targetToList;
// -------------------------- FUNCTION --------------------------

window.onload = function () {
	initialization();

	// Add event for input search Chatwork
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
};

async function initialization() {
	// Assign event redirect to section
	document.querySelectorAll(".home__feature-btn").forEach((item) => {
		item.addEventListener("click", () =>
			toggleManagerTarget(item.dataset.value)
		);
	});

	addItemToSelectList();
	addEventSelectList();
}

function addItemToSelectList() {
	chrome.storage.local.get("target", function (result) {
		targetCcList = result.target;
		document.querySelectorAll(".select__group").forEach((group) => {
			targetCcList.forEach((item) => {
				let target = createOptionItemSelect(item.id, item.name);
				handleAddItemToSelectedList(target);
				group.appendChild(target);
			});
		});
	});
}

function GetValueFromStorage() {
	let data1 = [
		{
			id: "1335614",
			name: "NguyenVuHuyThanh",
		},
		{
			id: "3262451",
			name: "Đoàn Văn Cường",
		},
		{
			id: "2937197",
			name: "Vũ Mạnh Cường",
		},
		{
			id: "3658639",
			name: "Le Thi Hong Phuc",
		},
		{
			id: "3789107",
			name: "Nguyen Minh Trung",
		},
		{
			id: "4163335",
			name: "Lê Anh Tâm",
		},
		{
			id: "3869804",
			name: "Ngo Quang Cong",
		},
		{
			id: "4231023",
			name: "Do Duc Huy",
		},
		{
			id: "4558495",
			name: "Nguyễn Thị Hoài Linh",
		},
		{
			id: "4585498",
			name: "Phạm Hoàng Ân",
		},
		{
			id: "4597737",
			name: "Giáp Văn Hồng Quân",
		},
		{
			id: "5220956",
			name: "Thiều TRỌNG Thoại",
		},
		{
			id: "5279938",
			name: "Dang Minh Phu",
		},
		{
			id: "5371679",
			name: "Nguyen Dinh Nam",
		},
		{
			id: "5647977",
			name: "Ngo Minh Tam",
		},
		{
			id: "5711708",
			name: "Huỳnh Khuyên",
		},
		{
			id: "5805337",
			name: "Le Nguyen Hai Trieu",
		},
		{
			id: "5860659",
			name: "Pham Quoc Thai",
		},
		{
			id: "5933591",
			name: "Do Tong Quoc",
		},
		{
			id: "5975673",
			name: "Nguyen Trong Nghia",
		},
		{
			id: "6354632",
			name: "Nguyen Thi Trang",
		},
		{
			id: "6413893",
			name: "Le Van Vuong",
		},
		{
			id: "6549261",
			name: "Nguyen Thanh Huynh",
		},
		{
			id: "6549263",
			name: "Lê Hoàng Huyền Trân",
		},
		{
			id: "6750351",
			name: "Minh Thien",
		},
		{
			id: "6755110",
			name: "Le Phu Qui",
		},
		{
			id: "6808543",
			name: "Phan Van Tan",
		},
		{
			id: "6808545",
			name: "To Sieu Hue",
		},
	];
	// Set target
	chrome.storage.local.set({ target: data1 }, function () {
		console.log("Set target successfully");
	});
}

function addEventSelectList() {
	// Assign event open select list
	document.querySelectorAll(`.selected__list`).forEach((element) => {
		element.addEventListener("click", () => {
			element.parentElement.classList.toggle("open_list");
		});
	});

	// Assign event add element to selected list
	document.querySelectorAll(".select__option").forEach((element) => {
		handleAddItemToSelectedList(element);
	});

	// Assign event delete item selected
	document
		.querySelectorAll(`.select__item-selected .icon_close`)
		.forEach((element) => {
			handlerDeleteItemSelected(element);
		});
}

function handlerDeleteItemSelected(element) {
	element.addEventListener("click", function (event) {
		// Prevent event affect from child element to parent element
		event.stopPropagation();

		// Add class element to delete
		let elementDelete = element.closest(".select__item-selected");
		elementDelete.classList.add("remove");

		// Returned element to item select list
		let id = element.dataset.valueId;
		let value = element.dataset.valueSelected;
		let elementReturned = createOptionItemSelect(id, value);
		handleAddItemToSelectedList(elementReturned);
		document.querySelector(".select__group").append(elementReturned);

		// Delete element
		setTimeout(() => {
			elementDelete.remove();
		}, 500);
	});
}

/**
 * Create element to add select list
 * @param {Element returned to select list} element
 * @returns element
 */
function createOptionItemSelect(id, value) {
	let newElement = document.createElement("div");
	newElement.setAttribute("data-value-option", value);
	newElement.setAttribute("data-value-id", id);
	newElement.className = "select__option";
	newElement.innerHTML = `<span>${value}</span>`;
	return newElement;
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
		let parentElement = element.closest(".select__menu")?.firstElementChild;

		if (parentElement == undefined) return;

		// Create new element add to selected item list
		let newElement = createItemElementSelectedList(value);
		parentElement.appendChild(newElement);

		// Remove element after add to selected list
		element.remove();
	});
}

function createItemElementSelectedList(value) {
	let element = document.createElement("div");
	element.className = "select__item-selected";
	element.setAttribute("title", value);
	element.setAttribute("data-value-selected", value);
	element.innerHTML = `<span>${value}</span><div class="icofont-close icon_close"></div>`;
	handlerDeleteItemSelected(element);
	return element;
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

function handlerKeyUp(e) {
	if (e.keyCode === 38 || e.keyCode === 40) {
		handlerArrowUpAndDown(e);
		return;
	}

	keySearch = document.querySelector(`#${idChatText}`).value.trim();
	// Handler when user input Enter
	let keyRecommend = fuzzysort.go(keySearch, Object.keys(snippetsTemplate));
	if (e.keyCode == 13 && keyRecommend.length != 0) {
		let element = document.querySelector(
			".snippets-dropdow__title ul li.active"
		);

		insertTemplateSnippet(element);
		return;
	}

	// Handler when user delete all key search
	if (keySearch === "") {
		document.querySelector(`#${idChatText}`).style.height =
			STYLE_HEIGHT_CHAT_TEXT_DEFAULT + "px";
	}

	reloadDropdowSnippets(keyRecommend);
	setPositionLeftDropdowSnippets();
}

function handlerArrowUpAndDown(e) {
	let dropdow = document.querySelector(".snippets-dropdow__title");
	if (dropdow === null) return;

	let elements = document.querySelectorAll("li.recommend-item");
	if (elements === undefined || elements.length === 0) return;

	let elementActive = document.querySelector("li.recommend-item.active");
	let indexCurrent = +elementActive.dataset.index;
	elementActive.classList.remove("active");

	// 38: up arrow; 40: down arrow
	if (indexCurrent === elements.length - 1 && e.keyCode === 40) {
		indexCurrent = 0;
	} else if (indexCurrent === 0 && e.keyCode === 38) {
		indexCurrent = elements.length - 1;
	} else if (e.keyCode === 40) {
		indexCurrent += 1;
	} else {
		indexCurrent -= 1;
	}

	let element = document.querySelector(
		`li.recommend-item[data-index="${indexCurrent}"]`
	);
	element.classList.add("active");
}

function createDropdowSnippets() {
	removeDropdowSnippets();

	let element = document.createElement("div");
	element.className = "snippets-dropdow__title";
	element.innerHTML = `<ul role="recommend" class="snippets-recommend"></ul>`;

	let areaChat = document.querySelector(`#${idChatSendArea}`);
	areaChat.append(element);
}

function removeDropdowSnippets() {
	// Reset key search when remove element
	keySearch = "";

	let element = document.querySelector(".snippets-dropdow__title");
	if (element === null) return;

	element.remove();
}

function reloadDropdowSnippets(keyRecommends) {
	if (keyRecommends === undefined || keyRecommends.length === 0) {
		toggleDropdowSnippets(STYLE_DISPLAY_NONE);
		return;
	}

	let recommendItems = "";
	keyRecommends.forEach((item, index) => {
		let text = fuzzysort.highlight(item, '<b class="red">', "</b>");
		recommendItems += `<li data-value=${
			item.target
		} data-index=${index} class="recommend-item ${
			index === 0 ? "active" : ""
		}">${text}</li>`;
	});

	let recommendMenu = document.querySelector(".snippets-dropdow__title ul");
	recommendMenu.innerHTML = recommendItems;
	toggleDropdowSnippets();
}

function toggleDropdowSnippets(style = "block") {
	let element = document.getElementsByClassName("snippets-dropdow__title")[0];
	if (element === undefined) return;

	element.style.display = style;
}

function setPositionLeftDropdowSnippets() {
	if (keySearch === undefined || keySearch.length == 0) return;

	let left = keySearch.length * 7.1 + 36;
	document.getElementsByClassName(
		"snippets-dropdow__title"
	)[0].style.left = `${left}px`;
}

function insertTemplateSnippet(element) {
	if (element === null) return;

	let textSnippet = getTextSnippetInsert(element.dataset.value);

	// Get line of text snippet to set area text height
	var lines = textSnippet.split(/\r\n|\r|\n/).length;
	let chatArea = document.querySelector(`#${idChatText}`);
	chatArea.style.height = `${lines * 21 + 16}px`;

	// Assign text snippet
	chatArea.value = textSnippet;

	// Set dropdownlist search not displayed
	toggleDropdowSnippets(STYLE_DISPLAY_NONE);
}

function getTextSnippetInsert(title) {
	// Add separate character to head if title is ["Send"]
	let separateHead = LIST_ITEM_SEPARATE.includes(title)
		? "\n" + SEPARATE_CHARACTER
		: "";
	let head =
		getTargetTo() + "\n" + snippetsTemplate[title].title + separateHead;

	// Add separate character to end if title is ["Send"]
	let separateEnd = LIST_ITEM_SEPARATE.includes(title)
		? SEPARATE_CHARACTER + "\n"
		: "";
	let end = separateEnd + snippetsTemplate[title].end;

	let content = snippetsTemplate[title].contents.map((item) =>
		createContentSnippet(title, item)
	);

	let result = `${head}${"\n" + content.join("")}${end}`;

	return result;
}

function createContentSnippet(title, content) {
	let temp = defautTemplate.hasOwnProperty(content)
		? `${PREFIX_CONTENT} ${content}: ${defautTemplate[content]}`
		: `${PREFIX_CONTENT} ${content}: `;

	// Get text extend
	let advanced = snippetsTemplate[title].advanced;
	if (advanced !== undefined && advanced.hasOwnProperty(content)) {
		advanced[content].forEach((item) => {
			temp += defautTemplate.hasOwnProperty(item)
				? `\n	${item}:  ${defautTemplate[item]}`
				: `\n	${item === "-" ? "-" : item + ":"} `;
		});
	}

	return `${temp}\n`;
}

function getTargetTo() {
	return `[To:4163335]Lê Anh Tâm
CC[To:2937197]Vũ Mạnh Cường`;
}
