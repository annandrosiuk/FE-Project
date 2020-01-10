window.addEventListener('load', function () {
    // const dropdownTitle = document.querySelector(' .title');
    // const dropdownOptions = document.querySelectorAll('.option');

    // function toggleClass(elem, className) {
    //     if (elem.className.indexOf(className) !== -1) {
    //         elem.className = elem.className.replace(className, '');
    //     }
    //     else {
    //         elem.className = elem.className.replace(/\s+/g, ' ') + ' ' + className;
    //     }
    //     return elem;
    // }

    // function toggleDisplay(elem) {
    //     const curDisplayStyle = elem.style.display;

    //     if (curDisplayStyle === 'none' || curDisplayStyle === '') {
    //         elem.style.display = 'block';
    //     }
    //     else {
    //         elem.style.display = 'none';
    //     }
    // }

    // function toggleMenuDisplay(e) {
    //     const dropdown = e.currentTarget.parentNode;
    //     const menu = dropdown.querySelector('.menu');

    //     toggleClass(menu, 'hide');
    // }

    // dropdownTitle.addEventListener('click', toggleMenuDisplay);


	$('.show-side-menu').on('click',function(){
		$('.restyle-home-outgrid .wrap-vertcal-menu').css('right','0px');
	});

	$('.hide-side-menu').on('click',function(){
		$('.restyle-home-outgrid .wrap-vertcal-menu').css('right','-16%');
	});



	/*==============================================[ dropdown menu ]==*/
	$('.burger-btn').on('click', function(){
		$(this).toggleClass('is-active');
		$('.wrap-side-menu').slideToggle();
	});

	var arrowMainMenu = $('.arrow-main-menu');

	for(var i=0; i<arrowMainMenu.length; i++){
		$(arrowMainMenu[i]).on('click', function(){
			$(this).next('.sub-menu').slideToggle();
			$(this).toggleClass('turn-arrow');
		})
	}

	$(window).resize(function(){
		if($(window).width() >= 1100){
			if($('.wrap-side-menu').css('display') == 'block'){
				$('.wrap-side-menu').css('display','none');
				$('.burger-btn').toggleClass('is-active');
			}
			if($('.sub-menu').css('display') == 'block'){
				$('.sub-menu').css('display','none');
				$('.arrow-main-menu').removeClass('turn-arrow');
			}
		}
	});

});
