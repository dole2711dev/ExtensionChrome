let keySearch = "";
// -------------------------- FUNCTION --------------------------
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

document
	.getElementById("addTargetTo")
	.addEventListener("click", toggleAddTargetTo);

document
	.getElementById("addTargetCc")
	.addEventListener("click", toggleAddTargetCc);

function toggleAddTargetTo() {
	toggleAddTarget("to");
}

function toggleAddTargetCc() {
	toggleAddTarget("cc");
}

function toggleAddTarget(isTargetTo) {
	let optionHome = document.querySelector("#home");
	optionHome.classList.toggle("disable");
	let optionAddTarget = document.querySelector("#addTarget");
	optionAddTarget.classList.toggle("disable");
}
