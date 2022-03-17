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
	//handlerOnClick();
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

function handlerOnClick() {
	let elements = document.querySelectorAll("li.recommend-item");
	elements.forEach((element) => {
		document.addEventListener("click", insertTemplateSnippet(element));
	});
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
		? `${PREFIX_CONTENT} ${content}:  ${defautTemplate[content]}`
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
