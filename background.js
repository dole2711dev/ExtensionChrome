//// background.js ////
function injectedFunction() {
	chrome.storage.sync.set({ key: "Dole" }, function () {
		console.log("Value is set to " + "value");
	});
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: injectedFunction,
	});
});

/*
	chrome.storage.sync.set({ key: "Dole" }, function () {
		console.log("Value is set to " + "value");
	});


		
	chrome.storage.sync.get(["key"], function (result) {
		console.log("Value currently is " + result.key);
	});
*/
