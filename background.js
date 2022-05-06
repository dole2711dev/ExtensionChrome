// background.js

function SetValueFromStorage() {
	let data = [
		{
			id: "2937197",
			name: "Vũ Mạnh Cường",
		},
		{
			id: "4163335",
			name: "Lê Anh Tâm",
		},
	];

	// Set target To
	chrome.storage.local.set({ To: data }, function () {});

	// Set target Cc
	chrome.storage.local.set({ Cc: data }, function () {});

	//let m = document.getElementById("estimate");
	//console.log(m);

	//var currentTab = getCurrentTab();
	//if (currentTab.url.includes("https://www.chatwork.com/")) {
	//	chrome.tabs.executeScript(
	//		currentTab.id,
	//		{ file: "content.js" },
	//		function () {}
	//	);
	//}
}

function GetValueFromStorage() {
	// Get target To
	chrome.storage.local.get("To", function (result) {
		targetToList = result;
	});

	// Get target Cc
	chrome.storage.local.get("Cc", function (result) {
		targetCcList = result;
	});
}

async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}
