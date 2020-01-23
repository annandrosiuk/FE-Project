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
            const filterItems = (json, pageId, item, itemsPerPage = 9) =>
                json.filter((item, index) => {
                    const page = Math.floor(index / itemsPerPage);
                    return page === pageId;
                });

            //show them
            function showAll(data, index, item) {

                let arr = filterItems(data, index, item);
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

            showAll(json, 0);

            //Filtration onclick
            $('#beer').on('click', filterGoods);
            $('#beer').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#burger').on('click', filterGoods);
            $('#burger').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#steak').on('click', filterGoods);
            $('#steak').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#drink').on('click', filterGoods);
            $('#drink').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#wok').on('click', filterGoods);
            $('#wok').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#desert').on('click', filterGoods);
            $('#desert').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#soup').on('click', filterGoods);
            $('#soup').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#snack').on('click', filterGoods);
            $('#snack').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#salad').on('click', filterGoods);
            $('#salad').on('click', function () {
                $("#select").val('default');
                firstPagination();
            });

            $('#all').on('click', function () {
                showAll(json, 0);
                $("#select").val('default');
                firstPagination();
            });

            // first prev i-2 i-1 i i+1 i+2 next last
            const params = new URLSearchParams(location.search);

            const pagesList = (json, pageId, itemsPerPage = 9, variance = 1) => {

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
            function firstPagination() {


                let brr = pagesList(json, 0);
                let out = '';
                for (let key in brr) {
                    if (brr[key]['class'] == 'next') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '>' + '</a>';
                        out += '</div>';
                    } if (brr[key]['class'] == 'last') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '>>' + '</a>';
                        out += '</div>';
                    } if (brr[key]['class'] == 'prev') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '<' + '</a>';
                        out += '</div>';
                    } if (brr[key]['class'] == 'first') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '<<' + '</a>';
                        out += '</div>';
                    }
                    else if (brr[key]['class'] !== 'next' && brr[key]['class'] !== 'last' && brr[key]['class'] !== 'prev' && brr[key]['class'] !== 'first') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + brr[key]['text'] + '</a>';
                        out += '</div>';
                    }
                }

                $('#pagination').html(out);
                $('.single-btn').on('click', changePagination);
            }
            firstPagination();
            function changePagination(e) {
                //change page
                e.preventDefault();
                let articul = +$(this).attr('data-text') - 1;
                showAll(json, articul);
                console.log(pagesList(json, articul));

                let brr = pagesList(json, articul);
                let out = '';
                for (let key in brr) {
                    if (brr[key]['class'] == 'next') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '>' + '</a>';
                        out += '</div>';
                    } if (brr[key]['class'] == 'last') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '>>' + '</a>';
                        out += '</div>';
                    } if (brr[key]['class'] == 'prev') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '<' + '</a>';
                        out += '</div>';
                    } if (brr[key]['class'] == 'first') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + '<<' + '</a>';
                        out += '</div>';
                    }
                    else if (brr[key]['class'] !== 'next' && brr[key]['class'] !== 'last' && brr[key]['class'] !== 'prev' && brr[key]['class'] !== 'first') {
                        out += '<div  data-text="' + brr[key]['text'] + '" data-href="' + brr[key]['link'] + '" class="single-btn ' + brr[key]['class'] + '">';
                        out += '<a href="' + brr[key]['link'] + '" data-text="' + brr[key]['text'] + '">' + brr[key]['text'] + '</a>';
                        out += '</div>';
                    }
                }

                $('#pagination').html(out);
                $('.single-btn').on('click', changePagination);
            }

            let selectBox = document.getElementById("select");
            selectBox.addEventListener('change', changeFunc);

            function changeFunc() {
                //function for select options
                let selectedValue = selectBox.options[selectBox.selectedIndex].value;

                if (selectedValue == 'price-low') {
                    mySort('cost');
                    firstPagination();
                }

                if (selectedValue == 'price-high') {
                    mySortToHigh('cost');
                    firstPagination();
                }

                if (selectedValue == 'default') {
                    mySort('id');
                    firstPagination();
                }

                if (selectedValue == 'sort-by-name') {
                    mySort('name');
                    firstPagination();
                }
            }

            function sortByProperty(property) {
                return function (a, b) {
                    if (a[property] > b[property])
                        return 1;
                    else if (a[property] < b[property])
                        return -1;

                    return 0;
                }
            }

            function sortByPropertyHigh(property) {
                return function (a, b) {
                    if (a[property] < b[property])
                        return 1;
                    else if (a[property] > b[property])
                        return -1;

                    return 0;
                }
            }

            //sort elements
            function mySort(el) {
                let goods = json;
                let sortEl = goods.sort(sortByProperty(el));
                showAll(sortEl, 0);
            }

            function mySortToHigh(el) {
                let goods = json;
                let sortEl = goods.sort(sortByPropertyHigh(el));
                showAll(sortEl, 0);
            }

            function filterGoods() {
                //filter by categories
                let goods = json;
                let articul = $(this).attr('id');
                // console.log(goods);

                let divs = '';
                for (let key in goods) {

                    if ((goods[key]["category"] == articul)) {
                        divs += '<div class="single-good" data-price="' + goods[key]['cost'] + '" data-name="' + goods[key]['name'] + '" data-art="' + goods[key]['id'] + '">';
                        divs += '<img class="image" src=" ' + goods[key]['image'] + ' ">';
                        divs += '<h4>' + goods[key]['name'] + '</h4>';
                        divs += '<p>' + goods[key]['cost'] + ' &#8372;</p>';
                        divs += '<button class="add-to-cart" data-art="' + goods[key]['id'] + '">Buy</button>';
                        divs += '</div>';
                    }

                }
                $('#goods').html(divs);

                // let some;
                // let arr = [];
                // for (let key in json) {
                //     if ((json[key]["category"] == articul)) {
                //         some = json[key];
                //         //console.log(some);
                //         // if (json[key]["category"] != null) {
                //         arr[key] = some;
                //         // } 

                //     }
                // }
                // console.log(arr);
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

        //search
        // function searchFunction() {
        //     let input, filter, goodsWrapper, singleGood, h4, i;
        //     input = document.getElementById('myinput');
        //     filter = input.value.toUpperCase();
        //     goodsWrapper = json;
        //     let div = document.getElementsByClassName('single-good');

        //     singleGood = goodsWrapper;
        //     // console.log(singleGood[key]);
        //     for (i = 0; i < singleGood.length; i++) {
        //         h4 = singleGood[i]['name'][0];

        //         if (h4.toUpperCase().indexOf(filter) > -1) {
        //             console.log('correct');
        //             //console.log(singleGood[i]);
        //             // div.style.display = "";
        //             //singleGood[i].style.display = "";
        //         }

        //         else {
        //             //let div = document.getElementsByClassName('single-good');
        //             // div.style.display = "none";
        //             console.log('no correct');
        //             // console.log(singleGood[i]);
        //             // singleGood[i].style.display = 'none';
        //         }
        //     }
        //     //singleGood = goodsWrapper.getElementsByClassName('single-good');
        // }

        // let input = document.getElementById('myinput');
        // input.addEventListener("keyup", searchFunction);
    })

// //search
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
