// ////////////// Pagination
let cart = {};

fetch('goods.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        //load goods
        loadGoods();
        checkCart()


        function loadGoods() {
            //filter items (9 per page)
            const filterItems = (json, pageId, itemsPerPage = 9) =>
                json.filter((item, index) => {
                    const page = Math.floor(index / itemsPerPage);
                    return page === pageId;
                });

            //show them
            function showAll(index) {

                let arr = filterItems(json, index);
                console.log(arr);

                let out = '';
                for (let key in arr) {
                    out += '<div class="single-good" data-price="' + arr[key]['cost'] + '" data-name="' + arr[key]['name'] + '" data-art="' + arr[key]['id'] + '">';
                    out += '<img class="image" src=" ' + arr[key]['image'] + ' ">';
                    out += '<h4>' + arr[key]['name'] + '</h4>';
                    out += '<p>' + arr[key]['cost'] + ' &#8372;</p>';
                    out += '<button class="add-to-cart" data-art="' + arr[key]['id'] + '">Buy</button>';
                    out += '</div>';
                }

                $('#goods').html(out);
                $('button.add-to-cart').on('click', addToCard);
            }

            showAll(0);

            $('#beer').on('click', filterGoods);
            $('#beer').on('click', function () {
                $("#select").val('default');
            });

            $('#burger').on('click', filterGoods);
            $('#burger').on('click', function () {
                $("#select").val('default');
            });

            $('#steak').on('click', filterGoods);
            $('#steak').on('click', function () {
                $("#select").val('default');
            });

            $('#drink').on('click', filterGoods);
            $('#drink').on('click', function () {
                $("#select").val('default');
            });

            $('#wok').on('click', filterGoods);
            $('#wok').on('click', function () {
                $("#select").val('default');
            });

            $('#desert').on('click', filterGoods);
            $('#desert').on('click', function () {
                $("#select").val('default');
            });

            $('#soup').on('click', filterGoods);
            $('#soup').on('click', function () {
                $("#select").val('default');
            });

            $('#snack').on('click', filterGoods);
            $('#snack').on('click', function () {
                $("#select").val('default');
            });

            $('#salad').on('click', filterGoods);
            $('#salad').on('click', function () {
                $("#select").val('default');
            });

            $('#all').on('click', function () {
                showAll(0);
                $("#select").val('default');
            });

            // first prev i-2 i-1 i i+1 i+2 next last
            const params = new URLSearchParams(location.search);

            const pagesList = (json, pageId, itemsPerPage = 9, variance = 2) => {

                pageId = Math.max(0, +pageId || 0);
                itemsPerPage = Math.max(1, +itemsPerPage || 0);

                const pagesAmount = Math.ceil(json.length / itemsPerPage);
                const pageIdFirst = 0;
                const pageIdLast = Math.max(pageIdFirst, pagesAmount - 1);
                const pageIdNext = Math.min(pageId + 1, pageIdLast);
                const pageIdPrev = Math.max(pageId - 1, pageIdFirst);
                const pages = [...Array(1 + 2 * variance)].map((item, index) => {
                    return index - variance + pageId;
                }).filter((page) => {
                    return pageIdFirst <= page && page <= pageIdLast;
                }).map(page => {
                    const params = new URLSearchParams(location.search);
                    params.set('page', page);
                    return {
                        ...page === pageId ? { class: 'current', current: true } : {},
                        link: `${location.pathname}?${params}`,
                        text: `${page + 1}`,
                    }
                });
                const result = [];
                if (pageIdFirst < pageId) {
                    const page = pageIdFirst;
                    const params = new URLSearchParams(location.search);
                    params.set('page', page);
                    result.push({
                        first: true,
                        class: 'first',
                        link: `${location.pathname}?${params}`,
                        text: `${page + 1}`, // ???
                    });
                }
                if (pageIdFirst < pageIdPrev) {
                    const page = pageIdPrev;
                    const params = new URLSearchParams(location.search);
                    params.set('page', page);
                    result.push({
                        prev: true,
                        class: 'prev',
                        link: `${location.pathname}?${params}`,
                        text: `${page + 1}`, // ???
                    });
                }
                result.push(...pages);
                if (pageIdNext < pageIdLast) {
                    const page = pageIdNext;
                    const params = new URLSearchParams(location.search);
                    params.set('page', page);
                    result.push({
                        next: true,
                        class: 'next',
                        link: `${location.pathname}?${params}`,
                        text: `${page + 1}`, // ???
                    });
                }
                if (pageId < pageIdLast) {
                    const page = pageIdLast;
                    const params = new URLSearchParams(location.search);
                    params.set('page', page);
                    result.push({
                        last: true,
                        class: 'last',
                        link: `${location.pathname}?${params}`,
                        text: `${page + 1}`, // ???
                    });
                }
                return result;
            }

            let brr = pagesList(json, 0);
            let out = '';
            for (let key in brr) {
                out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + brr[key]['text'] + '</a>';
                out += '</div>';
            }

            $('#pagination').html(out);
            $('.single-btn').on('click', changePagination);

            function changePagination(e) {
                //change page
                e.preventDefault();
                let articul = +$(this).attr('data-text') - 1;
                showAll(articul);
                console.log(pagesList(json, articul));

                let brr = pagesList(json, articul);
                let out = '';
                for (let key in brr) {
                    out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                    out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + brr[key]['text'] + '</a>';
                    out += '</div>';
                }

                $('#pagination').html(out);
                $('.single-btn').on('click', changePagination);
            }
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

            fetch('goods.json')
                .then(response => response.json())
                .then(function (data) {

                    let out = '';
                    for (let key in data) {
                        if (data[key]['category'] == articul) {
                            out += '<div class="single-good" data-price="' + data[key]['cost'] + '" data-name="' + data[key]['name'] + '" data-art="' + data[key]['id'] + '">';
                            out += '<img class="image" src=" ' + data[key]['image'] + ' ">';
                            out += '<h4>' + data[key]['name'] + '</h4>';
                            out += '<p>' + data[key]['cost'] + ' &#8372;</p>';
                            out += '<button class="add-to-cart" data-art="' + data[key]['id'] + '">Buy</button>';
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
    })

//search
function searchFunction() {
    let input, filter, goodsWrapper, singleGood, h4, i;
    input = document.getElementById('myinput');
    filter = input.value.toUpperCase();
    goodsWrapper = document.getElementById('goods');
    singleGood = goodsWrapper.getElementsByClassName('single-good');

    for (i = 0; i < singleGood.length; i++) {
        h4 = singleGood[i].getElementsByTagName('h4')[0];
        if (h4.innerHTML.toUpperCase().indexOf(filter) > -1) {
            singleGood[i].style.display = "";
        }

        else {
            singleGood[i].style.display = 'none';
        }
    }
}