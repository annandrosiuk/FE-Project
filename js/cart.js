let cart = {};

$.getJSON('goods.json', function (data) {
    let goods = data;
    checkCart();
    showCart();

    function showCart() {
        let sum = 0;
        const parts = [];

        if ($.isEmptyObject(cart)) {
            parts.push('<h4>Cart empty. Add goods in your cart.</h4>');
            parts.push('<a class="italic" href="shop-page.html"> Go to shop</a>');

            const innerValue = parts.join('');
            const result = `<div class="cart-empty"> ${innerValue} </div>`;

            $('#empty').html(result);
            $('.cart-section .container').css("display", "none");
        } else {
            for (let key in cart) {
                parts.push('<span class="grid-image">');
                parts.push('<img class="image-cart img-product" src=" ' + data[key].image + ' ">');
                parts.push('</span>');

                parts.push('<span>' + data[key].name + '</span>');

                parts.push('<span>' + data[key].cost + '&#8372;</span>');

                parts.push('<span class="price">');
                parts.push('<button class="minus" data-art="' + key + '">-</button>');
                parts.push('<p>' + cart[key] + '</p>');
                parts.push('<button class="plus" data-art="' + key + '">+</button>');
                parts.push('</span>');

                parts.push('<span>' + cart[key] * data[key].cost + '&#8372;</span>');

                parts.push('<span>');
                parts.push('<button class="delete" data-art="' + key + '">X</button>');
                parts.push('</span>');

                sum += goods[key]['cost'] * cart[key];
            }
            const result = parts.join('');

            $('#after').html(result);
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
        let articul = this.getAttribute('data-art');
        cart[articul]++;
        SaveCartToLS();
        showCart();
    }

    function minusGoods() {
        let articul = this.getAttribute('data-art');

        if (cart[articul] > 1) {
            cart[articul]--;
        } else {
            delete cart[articul];
        }
        SaveCartToLS();
        showCart();
    }

    function deleteGoods() {
        let articul = this.getAttribute('data-art');
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

function disBtn() {
    if (inputName.value.length > 0 && inputNum.value.length > 0) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}

inputName.addEventListener('keyup', disBtn);
inputNum.addEventListener('keyup', disBtn);