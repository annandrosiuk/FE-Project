let cart = {};

// $('document').ready(function () {
//     loadGoods();
// });
document.addEventListener("DOMContentLoaded", function (event) {
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //load goods on page
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        let out = '';
        for (let key in data) {
            out += '<div class="single-good">';
            out += '<h4>' + data[key]['name'] + '</h4>';
            out += '<img class="image" src=" ' + data[key]['image'] + ' ">'
            out += '<div class="price-good">';
            out += '<p> Price: ' + data[key]['cost'] + '&#8372;</p>';
            out += '<button class="btn-buy" data-art="' + key + '">Buy</button>'
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
    //console.log(cart);
    showMiniCart();
}

function checkCart() {
    //check if there is cart in the LocalStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart(){
    //show inner of the cart
    let out = '';
    for( let w in cart){
        out += w + '-----' + cart[w] + '<br>';
    }
    $('#cart').html(out);
}