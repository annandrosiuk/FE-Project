let cart = {};

$.getJSON('goods.json', function (data) {
    let goods = data;
    checkCart();
    showCart();

    function showCart() {
        let out = '';
        let sum = 0;

        if ($.isEmptyObject(cart)) {
            out += '<div class="cart-empty">';
            out += '<h4>Cart empty. Add goods in your cart.</h4>';
            out += '<a class="italic" href="shop-page.html"> Go to shop</a>';
            out += '</div>';
            $('#empty').html(out);
            $('.cart-section .container').css("display", "none");
        } else {
            for (let key in cart) {
                out += '<tr>';
                out += '<td class="col-1">';
                out += '<img class="image-cart img-product" src=" ' + data[key].image + ' ">';
                out += '</td>';

                out += '<td class="col-2">' + data[key].name + '</td>';

                out += '<td class="col-3">' + data[key].cost + '&#8372;</td>';

                out += '<td class="col-4 price">';
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += '<p>' + cart[key] + '</p>'
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += '</td>';

                out += '<td class="col-5">' + cart[key] * data[key].cost; + '&#8372;</td>';

                out += '<td class="col-6">';
                out += '<button class="delete" data-art="' + key + '">X</button>';
                out += '</td>';
                out += '</tr>';

                sum += goods[key]['cost'] * cart[key];
            }
            $('#cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);

            $('#cart-submit').on('click', function (e) {
                //e.preventDefault();
                cart = {};
                SaveCartToLS();
            });

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

//disable/enable btn submit
const inputName = document.getElementById('form-username');
const inputNum = document.getElementById('form-number');
const btnSubmit = document.getElementById('cart-submit');

function disBtn(){
    if(inputName.value.length > 0 && inputNum.value.length > 0){
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}

inputName.addEventListener('keyup', disBtn);
inputNum.addEventListener('keyup', disBtn);