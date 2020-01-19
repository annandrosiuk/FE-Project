window.addEventListener('load', function () {
	const burgerBtn = document.querySelector('.burger-btn'); // Menu button element
	const wrapSideMenu = document.getElementById('wrap_side_menu'); // Header element
	const sideMenu = document.getElementById('side-menu');// Nav element
	const height = "-" + sideMenu.clientHeight + "px";// Calculates nav height, adds - and px
	const arrowMainMenu = document.getElementById('arrow-main-menu');
	const wrapSubMenu = document.getElementById('wrap-sub-menu');
	const subMenu = document.getElementById('sub-menu');
	var intElemClientWidth = window.clientWidth;

	wrapSideMenu.style.marginTop = height; // Add negative margin of nav's height to header

	function toggleClass(elem, className) {
		if (elem.className.indexOf(className) !== -1) {
			elem.className = elem.className.replace(className, '');
		}
		else {
			elem.className = elem.className.replace(/\s+/g, ' ') + ' ' + className;
		}
		return elem;
	}

	burgerBtn.addEventListener('click', function (e) {
		toggleClass(wrapSideMenu, 'show');
		wrapSubMenu.classList.remove('hide');
	});

	// window.addEventListener('click', function (e) {
	// 	if (sideMenu.contains(e.target)) {
	// 		console.log("Clicked in Box");
	// 	} else {
	// 		console.log("Clicked out Box");
	// 		//toggleClass(wrapSideMenu, 'show');
	// 	}
	// });

	arrowMainMenu.addEventListener('click', function () {
		toggleClass(wrapSubMenu, 'hide');
	});

	
});
