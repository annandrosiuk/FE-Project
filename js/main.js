window.addEventListener('load', function () {
	// Mobile Nav
	const mParent = document.querySelectorAll(".mobile-nav .m-drop-down");
	const mNav = document.querySelector(".mobile-nav");
	const toggleNav = document.getElementById("toggle-nav");
	const burgerBtn = document.getElementById("burger-btn");

	function closeAll(arg) {
		for (let i = 0; i < arg.length; i++) {
			arg[i].childNodes[2].style.display = "none";
		}
	}

	for (let i = 0; i < mParent.length; i++) {
		mParent[i].addEventListener("click", function () {
			let ddStatus = mParent[i].childNodes[2].style.display;

			if (ddStatus === "block") {
				mParent[i].childNodes[2].style.display = "none";
			} else {
				closeAll(mParent);
				mParent[i].childNodes[2].style.display = "block";
			}
		})
	}

	toggleNav.addEventListener("click", function () {
		mNav.classList.toggle("open");
	})

	//close menu if click out
	window.addEventListener('click', function (e) {
		if (mNav.contains(e.target) || toggleNav.contains(e.target)) {
			console.log("Clicked in Box");
		} else {
			mNav.classList.toggle("open");
			burgerBtn.checked = false;
		}
	});

});
