let cart = {};

// $('document').ready(function () {
//     loadGoods();
// });
document.addEventListener("DOMContentLoaded", function (event) {
    loadGoods();
    checkCart();
});

function loadGoods() {
    //load goods on page
    $.getJSON('goods.json', function (data) {

        let out = '';
        for (let key in data) {
            out += '<div class="single-good">';
            out += '<h4>' + data[key]['name'] + '</h4>';
            out += '<img class="image" src=" ' + data[key]['image'] + ' ">';
            out += '<div class="price-good">';
            out += '<p> Price: ' + data[key]['cost'] + '&#8372;</p>';
            out += '<button class="btn-buy" data-art="' + key + '">Buy</button>';
            out += '</div>';
            out += '</div>';
        }

        $('#goods').html(out);
        $('button.btn-buy').on('click', addToCard);
    })
}

function addToCard() {
    //add good in cart
    let articul = $(this).attr('data-art');

    if (cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkCart() {
    //check if there is cart in the LocalStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
