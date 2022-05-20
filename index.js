function initialization() {
	let btnBack = document.querySelectorAll(".btn-back");
	console.log("click", btnBack);
	btnBack.forEach(function (btn) {
		btn.addEventListener("click", function () {
			document
				.querySelectorAll(`.container__slides .slide`)
				.forEach((el) => {
					if (el.id === estimate) {
						el.classList.add("active");
						return;
					}

					el.classList.remove("active");
				});
		});
	});
}

function declareVariables() {}

initialization();
