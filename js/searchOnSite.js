let inputSearch = document.getElementById('searchInput');
let goTo = document.getElementById('goTo');
let inputSearchMob = document.getElementById('searchInputMob');
let goToMob = document.getElementById('goToMob');

goTo.addEventListener('click', search);
goToMob.addEventListener('click', searchMob);

function search() {
    let value = inputSearch.value;

    if (value != 0) {
        console.log(value);
        localStorage.setItem('inputValue', JSON.stringify(value));
        location.href = "shop-page.html";
        inputSearch.value = '';

    } else {
        localStorage.removeItem('inputValue');
        alert('Type somethink at first');
    }
}

function searchMob() {
    let value = inputSearchMob.value;

    if (value != 0) {
        console.log(value);
        localStorage.setItem('inputValue', JSON.stringify(value));
        location.href = "shop-page.html";
        inputSearchMob.value = '';

    } else {
        localStorage.removeItem('inputValue');
        alert('Type somethink at first');
    }
}