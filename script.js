let idTextArea = "_chatText";
let idAreaChat = "_chatSendArea";
let titles = ["estimate", "delay", "pending", "restart", "done"];
let keySearch = "";

window.addEventListener(
	"hashchange",
	function () {
		let textArea = document.querySelector(`#${idTextArea}`);

		textArea.addEventListener("focus", () => {
			createDropdowSnippets();
			hiddenDropdowSnippets();
		});

		textArea.addEventListener("keyup", handlerKeyUp);
	},
	false
);

function handlerKeyUp(e) {
	keySearch = document.querySelector(`#${idTextArea}`).value;
	if ((e.code === "Enter" || e.keycode === 13) && keySearch !== "") {
		insertTemplateSnippet();
		return;
	}

	if (keySearch.length === 0) {
		hiddenDropdowSnippets();
		return;
	}

	let keyRecommend = fuzzysort.go(keySearch, titles).map((i) => i.target);
	reloadDropdowSnippets(keyRecommend);
}

function createDropdowSnippets() {
	if (document.getElementsByClassName("snippets-dropdow__title").length !== 0)
		return;

	let element = document.createElement("div");
	element.className = "snippets-dropdow__title";
	element.innerHTML = `<ul role="recommend" class="snippets-recommend"></ul>`;

	let areaChat = document.querySelector(`#${idAreaChat}`);
	areaChat.append(element);
}

function reloadDropdowSnippets(keyRecommend) {
	if (keyRecommend === undefined || keyRecommend.length === 0) {
		hiddenDropdowSnippets();
		return;
	}

	console.log("keyRecommend", keyRecommend);
	let recommendMenu = document.querySelector(".snippets-dropdow__title ul");
	let recommendItems = "";
	keyRecommend.forEach((item) => {
		recommendItems += `<li aria-label=${item} class="recommend-item"><div>${item}<div></li>`;
	});

	recommendMenu.innerHTML = recommendItems;
	showDropdowSnippets();
	setPositionLeftDropdowSnippets();
}

function hiddenDropdowSnippets() {
	let element = document.getElementsByClassName("snippets-dropdow__title")[0];
	console.log("element", element);
	if (element === undefined) return;

	element.style.display = "none";
}

function showDropdowSnippets() {
	let element = document.getElementsByClassName("snippets-dropdow__title")[0];
	if (element === undefined) return;

	element.style.display = "block";
}

function setPositionLeftDropdowSnippets() {
	let left = keySearch.length * 7.3 + 35;
	document.getElementsByClassName(
		"snippets-dropdow__title"
	)[0].style.left = `${left}px`;
}

function insertTemplateSnippet() {}

function getTemplateSnippets(text) {
	switch (text) {
		case "est":
			return `[Estimate]
            ■ Project:
            ■ Task:
            ■ Process:
            ■ Redmine: none
            ■ File:
            ■ Sheet:
            ■ Start:
            ■ End:
            ■ Total:
            Thanks!`;

		case "del":
			return `[Delayed]
            ■ Project:
            ■ Task:
            ■ Process:
            ■ Redmine:
            ■ Remain (H):
            ■ % Completed:
            ■ Re-Estimate:
            + Start (Date & Time):
            + End (Date & Time):
            + Spent time:
            + Time:
            + Total (H):
            ■ Reason:
            ■ Temp Result:
            Thanks!`;

		case "res":
			return `[Re-Start]
            ■ Project: 
            ■ Task: 
            ■ Process: 
            ■ Redmine: None 
            ■ Remain (H): H
            ■ Re-Start (Time): H
            ■ End (Date & Time): H
            Thanks!`;

		case "pen":
			return `[Pending]
            ■ Project: 
            ■ Task: 
            ■ Process:
            ■ Redmine: 
            ■ % Completed: %
            ■ Remain: H
            ■ Reason: ưu tiên task 
            ※ Cập nhật thông số vào file EST: Đã cập nhật
            Thanks!`;

		case "done":
			return `[Done task]
            ■ Project: 
            ■ Task:
            ■ Process: 
            ■ Redmine: none
            ■ Total:  H
            ■ Late(H):  H
            ■ Result:
            - 
            ※ Cập nhật thông số vào file EST: Đã cập nhật
            Thanks!`;

		case "send":
			return `Mình gửi bản shelve
            ------------------------------------
            ■ Project:
            ■ Task:
            ■ Redmine:
            ■ Result:
                Get latest & Build All: [OK]
                Account: 
                Shelve name: 
            ------------------------------------
            Thanks!`;

		default:
			return "";
	}
}
