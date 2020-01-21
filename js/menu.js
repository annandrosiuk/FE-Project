let lunchBtn = document.getElementById('lunch-tab');
let dinnerBtn = document.getElementById('dinner-tab');
let dessertBtn = document.getElementById('dessert-tab');
let drinksBtn = document.getElementById('drinks-tab');

let lunchWrapper = document.getElementById('lunch-wrapper');
let dinnerWrapper = document.getElementById('dinner-wrapper');
let dessertWrapper = document.getElementById('dessert-wrapper');
let drinksWrapper = document.getElementById('drinks-wrapper');

//Show lunch menu 
lunchBtn.addEventListener('click', function(){
    lunchWrapper.classList.remove('hidden');
    dinnerWrapper.classList.add('hidden');
    dessertWrapper.classList.add('hidden');
    drinksWrapper.classList.add('hidden');

    lunchWrapper.style.animation = "showSubMenu 1.5s alternate 1";

    lunchBtn.classList.add('active');
    dinnerBtn.classList.remove('active');
    dessertBtn.classList.remove('active');
    drinksBtn.classList.remove('active');
});

//Show dinner menu
dinnerBtn.addEventListener('click', function(){
    dinnerWrapper.classList.remove('hidden');
    lunchWrapper.classList.add('hidden');
    dessertWrapper.classList.add('hidden');
    drinksWrapper.classList.add('hidden');

    dinnerWrapper.style.animation = "showSubMenu 1.5s alternate 1";

    lunchBtn.classList.remove('active');
    dinnerBtn.classList.add('active');
    dessertBtn.classList.remove('active');
    drinksBtn.classList.remove('active');
});

//Show dessert menu
dessertBtn.addEventListener('click', function(){
    dinnerWrapper.classList.add('hidden');
    lunchWrapper.classList.add('hidden');
    dessertWrapper.classList.remove('hidden');
    drinksWrapper.classList.add('hidden');

    dessertWrapper.style.animation = "showSubMenu 1.5s alternate 1";

    lunchBtn.classList.remove('active');
    dinnerBtn.classList.remove('active');
    dessertBtn.classList.add('active');
    drinksBtn.classList.remove('active');
});

//Show drinks menu
drinksBtn.addEventListener('click', function(){
    dinnerWrapper.classList.add('hidden');
    lunchWrapper.classList.add('hidden');
    dessertWrapper.classList.add('hidden');
    drinksWrapper.classList.remove('hidden');

    drinksWrapper.style.animation = "showSubMenu 1.5s alternate 1";

    lunchBtn.classList.remove('active');
    dinnerBtn.classList.remove('active');
    dessertBtn.classList.remove('active');
    drinksBtn.classList.add('active');
});

var windowH = $(window).height()/2;

$(window).on('scroll',function(){
    if ($(this).scrollTop() > windowH) {
        $("#myBtn").css('display','flex');
    } else {
        $("#myBtn").css('display','none');
    }
});

$('#myBtn').on("click", function(){
    $('html, body').animate({scrollTop: 0}, 300);
});
