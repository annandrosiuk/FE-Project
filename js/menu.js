const lunchBtn = document.getElementById('lunch-tab'),
    dinnerBtn = document.getElementById('dinner-tab'),
    dessertBtn = document.getElementById('dessert-tab'),
    drinksBtn = document.getElementById('drinks-tab');

const tabContent = document.getElementById('myTabContent'),
    tabListLiA = document.querySelectorAll('#tabList .nav-item > a');

const lunchWrapper = document.getElementById('lunch-wrapper'),
    dinnerWrapper = document.getElementById('dinner-wrapper'),
    dessertWrapper = document.getElementById('dessert-wrapper'),
    drinksWrapper = document.getElementById('drinks-wrapper');

function classChange(id, btn) {

    for (let i = 0; i < tabContent.children.length; i++) {
        tabContent.children[i].classList.add('hidden');
    }

    id.classList.remove('hidden');
    id.style.animation = "showSubMenu 1.5s alternate 1";

    for (let i = 0; i < tabListLiA.length; i++) {
        tabListLiA[i].classList.remove('active');
    }

    btn.classList.add('active');
}

lunchBtn.addEventListener('click', function () { classChange(lunchWrapper, lunchBtn) });
dinnerBtn.addEventListener('click', function () { classChange(dinnerWrapper, dinnerBtn) });
dessertBtn.addEventListener('click', function () { classChange(dessertWrapper, dessertBtn) });
drinksBtn.addEventListener('click', function () { classChange(drinksWrapper, drinksBtn) });
