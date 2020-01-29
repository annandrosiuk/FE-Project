const inputSearch = document.getElementById('searchInput'),
    goTo = document.getElementById('goTo'),
    inputSearchMob = document.getElementById('searchInputMob'),
    goToMob = document.getElementById('goToMob');

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