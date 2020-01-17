let cart = {};

$.getJSON('goods.json', function (data) {
    let goods = data;
    checkCart();
    showCart();

    function showCart() {
        let out = '';
        let sum = 0;

        if ($.isEmptyObject(cart)) {
            out += '<h4>Cart empty. Add goods in your cart <a href="shop-page.html">Shop</a></h4>';
            $('#cart').html(out);
            $('#total-sum-wrapper').css("display", "none");
        } else {
            for (let key in cart) {
                out += '<div class="cart-wrapper">';
                out += '<button class="delete" data-art="' + key + '">X</button>';
                out += '<img class="image-cart" src=" ' + data[key].image + ' ">';
                out += '<h4>' + data[key].name + '</h4>';
                out += '<p>' + data[key].cost + '&#8372;</p>';

                out += '<div class="count-wrapper">'; 
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += '<p>' + cart[key] + '</p>'
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += '</div>'; 

                out += '<p class="price">' + cart[key] * data[key].cost; + '&#8372;</p>';
                out += '</div>';

                sum += goods[key]['cost'] * cart[key];
            }
            $('#cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);

            $('#total').html('Total: ' + sum + '&#8372;');
        }

    }

    function plusGoods() {
        let articul = $(this).attr('data-art');
        cart[articul]++;
        SaveCartToLS();
        showCart();
    }

    function minusGoods() {
        let articul = $(this).attr('data-art');

        if (cart[articul] > 1) {
            cart[articul]--;
        } else {
            delete cart[articul];
        }
        SaveCartToLS();
        showCart();
    }

    function deleteGoods() {
        let articul = $(this).attr('data-art');
        delete cart[articul];
        SaveCartToLS();
        showCart();
    }
})

function checkCart() {
    //check if there is cart in the LocalStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function SaveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}