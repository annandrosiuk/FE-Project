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
        function showAll() {
            let out = '';
            for (let key in data) {
                out += '<div class="single-good" data-price="' + data[key]['cost'] + '" data-name="' + data[key]['name'] + '" data-art="' + key + '">';
                out += '<img class="image" src=" ' + data[key]['image'] + ' ">';
                out += '<h4>' + data[key]['name'] + '</h4>';
                out += '<p>' + data[key]['cost'] + ' &#8372;</p>';
                out += '<button class="add-to-cart" data-art="' + key + '">Buy</button>';
                out += '</div>';
            }

            $('#goods').html(out);
            $('button.add-to-cart').on('click', addToCard);
        }

        showAll();

        $('#beer').on('click', filterGoods);
        $('#beer').on('click', function(){
            $("#select").val('default');
        });
        
        $('#burger').on('click', filterGoods);
        $('#burger').on('click', function(){
            $("#select").val('default');
        });

        $('#steak').on('click', filterGoods);
        $('#steak').on('click', function(){
            $("#select").val('default');
        });

        $('#drink').on('click', filterGoods);
        $('#drink').on('click', function(){
            $("#select").val('default');
        });

        $('#wok').on('click', filterGoods);
        $('#wok').on('click', function(){
            $("#select").val('default');
        });

        $('#desert').on('click', filterGoods);
        $('#desert').on('click', function(){
            $("#select").val('default');
        });

        $('#soup').on('click', filterGoods);
        $('#soup').on('click', function(){
            $("#select").val('default');
        });

        $('#snack').on('click', filterGoods);
        $('#snack').on('click', function(){
            $("#select").val('default');
        });

        $('#salad').on('click', filterGoods);
        $('#salad').on('click', function(){
            $("#select").val('default');
        });

        $('#all').on('click', showAll);
        $('#all').on('click', function(){
            $("#select").val('default');
        });
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

function filterGoods() {
    //filter dy categories
    let articul = $(this).attr('id');

    $.getJSON('goods.json', function (data) {

        let out = '';
        for (let key in data) {
            if (data[key]['category'] == articul) {
                out += '<div class="single-good" data-price="' + data[key]['cost'] + '" data-name="' + data[key]['name'] + '" data-art="' + key + '">';
                out += '<img class="image" src=" ' + data[key]['image'] + ' ">';
                out += '<h4>' + data[key]['name'] + '</h4>';
                out += '<p>' + data[key]['cost'] + ' &#8372;</p>';
                out += '<button class="add-to-cart" data-art="' + key + '">Buy</button>';
                out += '</div>';
            }

        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCard);
    });

}

let selectBox = document.getElementById("select");
selectBox.addEventListener('change', changeFunc);

function changeFunc() {
    //function for select options
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue == 'price-low') {
        mySort('data-price');
    }

    if (selectedValue == 'price-high') {
        mySortHigh('data-price');
    }

    if (selectedValue == 'default') {
        mySort('data-art');
    }

    if (selectedValue == 'sort-by-name') {
        mySortByName('data-name');
    }
}

//sort elements
function mySort(sortType) {
    let goods = document.querySelector('#goods');
    for (let i = 0; i < goods.children.length; i++) {
        for (let j = i; j < goods.children.length; j++) {
            if (+goods.children[i].getAttribute(sortType) > +goods.children[j].getAttribute(sortType)) {
                replacedNode = goods.replaceChild(goods.children[j], goods.children[i]);
                insertAfter(replacedNode, goods.children[i]);
            }
        }
    }
}

function mySortHigh(sortType) {
    let goods = document.querySelector('#goods');
    for (let i = 0; i < goods.children.length; i++) {
        for (let j = i; j < goods.children.length; j++) {
            if (+goods.children[i].getAttribute(sortType) < +goods.children[j].getAttribute(sortType)) {
                replacedNode = goods.replaceChild(goods.children[j], goods.children[i]);
                insertAfter(replacedNode, goods.children[i]);
            }
        }
    }
}

function mySortByName(sortType) {
    let goods = document.querySelector('#goods');
    for (let i = 0; i < goods.children.length; i++) {
        for (let j = i; j < goods.children.length; j++) {
            if (goods.children[i].getAttribute(sortType) > goods.children[j].getAttribute(sortType)) {
                replacedNode = goods.replaceChild(goods.children[j], goods.children[i]);
                insertAfter(replacedNode, goods.children[i]);
            }
        }
    }
}

function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

//search
function searchFunction() {
    let input, filter, goodsWrapper, singleGood, h4, i;
    input = document.getElementById('myinput');
    filter = input.value.toUpperCase();
    goodsWrapper = document.getElementById('goods');
    singleGood = goodsWrapper.getElementsByClassName('single-good');

    for(i=0 ; i< singleGood.length; i++){
        h4 = singleGood[i].getElementsByTagName('h4')[0];
        if(h4.innerHTML.toUpperCase().indexOf(filter) > -1){
            singleGood[i].style.display = "";
        }

        else{
            singleGood[i].style.display = 'none';
        }
    }
}
