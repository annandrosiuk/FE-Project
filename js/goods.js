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
            const myJson = json;

            //---------------------FILTER ITEMS (9 per page)
            const filterItems = (json, pageId, item, itemsPerPage = 9) =>
                json.filter((item, index) => {
                    const page = Math.floor(index / itemsPerPage);
                    return page === pageId;
                });

            //show them
            function showAll(data, index) {

                let arr = filterItems(data, index);
                console.log(arr);

                let out = '', out1 = '';
                for (let key in arr) {
                    out += '<div class="single-good" data-price="' + arr[key]['cost'] + '" data-name="' + arr[key]['name'] + '" data-art="' + arr[key]['id'] + '">';
                    out += '<img class="image" src=" ' + arr[key]['image'] + ' ">';
                    out += '<h4>' + arr[key]['name'] + '</h4>';
                    out += '<p>' + arr[key]['cost'] + ' &#8372;</p>';
                    out += '<button class="add-to-cart" data-art="' + arr[key]['id'] + '">Buy</button>';
                    out += '</div>';
                }
                out1 += '<p class="goods-count">Here`s all ' + data.length + ' delisious dishes for you.</p>';
                $('#goods-count').html(out1);
                $('#goods').html(out);
                $('button.add-to-cart').on('click', addToCard);
            }

            showAll(myJson, 0);

            //Filtration onclick
            $('#beer').on('click', filterGoods);
            $('#burger').on('click', filterGoods);
            $('#steak').on('click', filterGoods);
            $('#drink').on('click', filterGoods);
            $('#wok').on('click', filterGoods);
            $('#desert').on('click', filterGoods);
            $('#soup').on('click', filterGoods);
            $('#snack').on('click', filterGoods);
            $('#salad').on('click', filterGoods);
            $('#all').on('click', function () {
                showAll(myJson, 0);
                paginate(myJson, myJson.length);
                selectBox.addEventListener('change', function () {
                    changeFunc(myJson)
                });
            });

            //---------------------PAGINATION
            function paginate(elem, totalItems, currentPage = 1, itemsPerPage = 9, maxBtnPages = 5) {
                //count of all pages
                let totalPage = Math.ceil(totalItems / itemsPerPage);

                //check if current page isn't out of range
                if (currentPage < 1) {
                    currentPage = 1;
                } else if (currentPage > totalPage) {
                    currentPage = totalPage;
                }

                let startPage, endPage;

                if (totalPage <= maxBtnPages) {
                    startPage = 1;
                    endPage = totalPage;
                } else {
                    //totalPages more than maxPages, calculate start/end pages
                    let maxPageBeforeCurrentPage = Math.floor(maxBtnPages / 2);
                    let maxPageAfterCurrentPage = Math.ceil(maxBtnPages / 2) - 1;

                    if (currentPage <= maxPageBeforeCurrentPage) {
                        startPage = 1;
                        endPage = maxBtnPages;
                    } else if (currentPage + maxPageAfterCurrentPage >= totalPage) {
                        startPage = totalPage - maxBtnPages + 1;
                        endPage = totalPage;
                    } else {
                        startPage = currentPage - maxPageBeforeCurrentPage;
                        endPage = currentPage + maxPageAfterCurrentPage;
                    }
                }

                //calculate start and end item index
                let startIndex = (currentPage - 1) * itemsPerPage;
                let endIndex = Math.min(startPage + itemsPerPage - 1, totalItems - 1);


                // first prev i-2 i-1 i i+1 i+2 next last
                const params = new URLSearchParams(location.search);
                const pagesList = (totalItems, startIndex, variance = 1) => {

                    const pageIdFirst = 0;
                    const pageIdLast = Math.max(pageIdFirst, totalPage - 1);
                    const pageIdNext = Math.min(startIndex + 1, pageIdLast);
                    const pageIdPrev = Math.max(startIndex - 1, pageIdFirst);
                    const pages = [...Array(1 + 2 * variance)].map((item, index) => {
                        return index - variance + startIndex;
                    }).filter((page) => {
                        return pageIdFirst <= page && page <= pageIdLast;
                    }).map(page => {
                        const params = new URLSearchParams(location.search);
                        params.set('page', page);
                        return {
                            ...page === startIndex ? { class: 'current', current: true } : {},
                            link: `${location.pathname}?${params}`,
                            text: `${page + 1}`,
                        }
                    });
                    const result = [];
                    if (pageIdFirst < startIndex) {
                        const page = pageIdFirst;
                        const params = new URLSearchParams(location.search);
                        params.set('page', page);
                        result.push({
                            first: true,
                            class: 'first',
                            link: `${location.pathname}?${params}`,
                            text: `${page + 1}`,
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
                            text: `${page + 1}`,
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
                            text: `${page + 1}`,
                        });
                    }
                    if (startIndex < pageIdLast) {
                        const page = pageIdLast;
                        const params = new URLSearchParams(location.search);
                        params.set('page', page);
                        result.push({
                            last: true,
                            class: 'last',
                            link: `${location.pathname}?${params}`,
                            text: `${page + 1}`,
                        });
                    }
                    return result;
                }

                let pages;

                function showBtn(a, b) {
                    pages = pagesList(a, b);
                    let brr = pages;

                    let out = '';

                    if (totalItems > itemsPerPage) {
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
                    }

                    $('#pagination').html(out);
                    $('.single-btn').on('click', next);
                }
                showBtn(totalItems, 0);

                function next(e) {
                    e.preventDefault();
                    let articul = +$(this).attr('data-text') - 1;

                    showAll(elem, articul);
                    console.log(pagesList(totalItems, articul));
                    showBtn(totalItems, articul);
                }

                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    itemsPerPage: itemsPerPage,
                    totalPage: totalPage,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                };
            }

            console.log(paginate(myJson, myJson.length));
            paginate(myJson, myJson.length);

            //---------------------SORT by selected options
            let selectBox = document.getElementById("select");
            selectBox.addEventListener('change', function () {
                changeFunc(myJson)
            });

            //check which option was chosen
            function changeFunc(data) {
                let selectedValue = selectBox.options[selectBox.selectedIndex].value;

                if (selectedValue == 'price-low') {
                    mySort('cost', data);
                    paginate(data, data.length);
                }

                if (selectedValue == 'price-high') {
                    mySortToHigh('cost', data);
                    paginate(data, data.length);
                }

                if (selectedValue == 'default') {
                    mySort('id', data);
                    paginate(data, data.length);
                }

                if (selectedValue == 'sort-by-name') {
                    mySort('name', data);
                    paginate(data, data.length);
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
            function mySort(el, data) {
                let sortEl = data.sort(sortByProperty(el));
                showAll(sortEl, 0);
            }

            function mySortToHigh(el, data) {
                let sortEl = data.sort(sortByPropertyHigh(el));
                showAll(sortEl, 0);
            }

            //---------------------FILTRATION
            function filterGoods() {
                //filter by categories
                let articul = $(this).attr('id');
                let arr = [];

                for (let key in myJson) {
                    if ((myJson[key]["category"] == articul)) {
                        arr.push(myJson[key]);
                    }
                }

                showAll(arr, 0);
                paginate(arr, arr.length);
                selectBox.addEventListener('change', function () {
                    changeFunc(arr)
                });
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
        let input = document.getElementById('myinput');
        input.addEventListener("keyup", searchFunction);

        function searchFunction() {
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
        }
    })
