// ////////////// RESERVATION
let tables = {};

fetch('tables.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        const myJson = json;
        let showTables = document.getElementById('showMore');

        function loadGoods() {
            let out = '';
            for (let key in myJson) {
                if (myJson[key].isAvailable == false) {
                    out += '<div class="single-table not-available" id="table-' + myJson[key]['id'] + '" data-name="' + myJson[key]['name'] + '" data-art="' + myJson[key]['id'] + '">';
                    out += '<h4>' + myJson[key]['name'] + '</h4>';
                    out += '<p>' + myJson[key]['location'] + '</p>';
                    out += '</div>';
                } else {
                    out += '<div class="single-table" id="table-' + myJson[key]['id'] + '"  data-name="' + myJson[key]['name'] + '" data-art="' + myJson[key]['id'] + '">';
                    out += '<h4>' + myJson[key]['name'] + '</h4>';
                    out += '<p>' + myJson[key]['location'] + '</p>';
                    out += '</div>';
                }
            }
            $('#tables-wrapper').html(out);
        }

        function classChange() {
            console.log(this.getAttribute('data-art'));
            if(!this.classList.contains('not-available')){
                this.classList.add('not-available');
            }
        }

        function setDate() {
            let inputDay = document.getElementById('form-date').value;
            let inputTime = document.getElementById('form-time').value;
            let hours = +inputTime.slice(0, 2);
            let minutes = inputTime.slice(2, 5);
            let countTime = hours + 1;
            let endTime = countTime.toString() + minutes;
            let arr = [];

            for (let i = 0; i < myJson.length; i++) {
                if (this.getAttribute('data-art') == myJson[i].id) {
                    console.log(myJson[i]);
                    myJson[i]['date']['day'] = inputDay;
                    myJson[i]['date']['time'] = inputTime;
                    myJson[i]['date']['endTime'] = endTime;
                    myJson[i]['isAvailable'] = false;

                    arr.push(myJson[i]);
                }
            }

        }

        function addToLS() {
            //add good in cart
            const wrapper = document.getElementById('tables-wrapper');
            var LIST_ID = 'tables';
            let arr = [];

            for (let i = 0; i < myJson.length; i++) {
                if (myJson[i].isAvailable == false) {
                    if (myJson[i].id == wrapper.children[i].getAttribute('data-art')) {
                        items = JSON.parse(localStorage.getItem(LIST_ID)) || [];
                        items.push(myJson[i])
                        arr.push(myJson[i]);
                    }
                }
            }
            localStorage.setItem(LIST_ID, JSON.stringify(items));
        }

        function getElemFromLS() {
            //get elements from LS
            let inputDay = document.getElementById('form-date').value;
            let inputTime = document.getElementById('form-time').value;
            let hours = +inputTime.slice(0, 2);
            let minutes = inputTime.slice(2, 5);
            let countTime = hours + 1;
            let endTime = countTime.toString() + minutes;

            let local = JSON.parse(localStorage.getItem('tables'));
            const wrapper = document.getElementById('tables-wrapper');
            console.log(local);

            for (let i = 0; i < local.length; i++) {
                if (inputDay == local[i].date.day) {
                    if (inputTime == local[i].date.time) {
                        if (local[i].isAvailable == false) {
                            console.log('work');
                            wrapper.children[i].classList.add('not-available');
                        }
                    }
                }
            }
        }

        function checkLS() {
            //check if Local Storage is empty
            if (localStorage.getItem('tables') != null) {
                getElemFromLS();
            }
        }

        let reserveBtn = document.getElementById('reserve');
        reserveBtn.addEventListener('click', function () {
            addToLS();
            location.href = "check-out.html";
        });

        showTables.addEventListener('click', function () {
            let wrapper = document.getElementById('wrapper');
            wrapper.classList.toggle('show');

            if (wrapper.classList.contains('show')) {
                //close menu if click out
                window.addEventListener('click', function (e) {
                    if (wrapper.contains(e.target) || document.getElementById('showMore').contains(e.target)) {
                        console.log("Clicked in Box");
                    } else {
                        wrapper.classList.remove('show');
                    }
                });
            }


            loadGoods();
            checkLS();

            let singleTable = document.getElementsByClassName('single-table');
            Array.from(singleTable).forEach(function (element) {
                element.addEventListener('click', classChange);
                element.addEventListener('click', setDate);
            });
        });

    })

//disable/enable btn submit
const inputDate = document.getElementById('form-date');
const inputName = document.getElementById('form-name');
const inputTime = document.getElementById('form-time');
const inputEmail = document.getElementById('form-email');
const btnSubmit = document.getElementById('showMore');

function disBtn(e) {
    e.preventDefault();
    if (inputName.value.length > 0 && inputDate.value.length > 0 && inputTime.value.length > 0 && inputEmail.value.length > 0) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}
// disBtn();

inputName.addEventListener('keyup', disBtn);
inputDate.addEventListener('keyup', disBtn);
inputTime.addEventListener('keyup', disBtn);
inputEmail.addEventListener('keyup', disBtn);