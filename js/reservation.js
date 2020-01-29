// ////////////// RESERVATION
let tables = {};

fetch('tables.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        const myJson = json;
        const showTables = document.getElementById('showMore');
        dateValid()

        function dateValid() {
            //check if date is valid (not yesterday...)
            const inputDate = document.getElementById('form-date');
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }

            today = yyyy + '-' + mm + '-' + dd;
            inputDate.setAttribute("min", today);
        }

        function loadGoods() {
            //load tables onpage
            const parts = [];
            for (let key in myJson) {
                parts.push('<div class="single-table" id="table-' + myJson[key]['id'] + '"  data-name="' + myJson[key]['name'] + '" data-art="' + myJson[key]['id'] + '">');
                parts.push('<h4>' + myJson[key]['name'] + '</h4>');
                parts.push('<p>' + myJson[key]['location'] + '</p>');
                parts.push('</div>');
            }
            const result = parts.join('');

            $('#tables-wrapper').html(result);
        }

        function classChange() {
            // add/remove Reserve class
            if (!this.classList.contains('not-available')) {
                if ($(this).hasClass('reserved')) {
                    $(this).removeClass('reserved');
                } else {
                    $(' .single-table.reserved').removeClass('reserved');
                    $(this).addClass('reserved');
                }
            }
        }

        function setDate() {
            //get data from inputs and push it to arr
            const inputDay = document.getElementById('form-date').value,
                inputTime = document.getElementById('form-time').value,
                hours = +inputTime.slice(0, 2),
                minutes = inputTime.slice(2, 5),
                countTime = hours + 1,
                endTime = countTime.toString() + minutes;

            const name = document.getElementById('form-name').value,
                email = document.getElementById('form-email').value,
                tel = document.getElementById('form-tel').value,
                additional = document.getElementById('form-message').value;
            let arr = [];

            for (let i = 0; i < myJson.length; i++) {
                if (this.getAttribute('data-art') == myJson[i].id) {
                    console.log(myJson[i]);
                    myJson[i]['user']['name'] = name;
                    myJson[i]['user']['email'] = email;
                    myJson[i]['user']['number'] = tel;
                    myJson[i]['user']['additional'] = additional;

                    myJson[i]['date']['day'] = inputDay;
                    myJson[i]['date']['time'] = inputTime;
                    myJson[i]['date']['endTime'] = endTime;
                    myJson[i]['isAvailable'] = false;

                    arr.push(myJson[i]);
                }
            }

        }

        function addToLS() {
            //add reservation to Local Storage
            const wrapper = document.getElementById('tables-wrapper');
            let listId = 'tables';

            for (let i = 0; i < myJson.length; i++) {
                if (myJson[i].isAvailable == false) {
                    if (wrapper.children[i].classList.contains('reserved')) {
                        if (myJson[i].id == wrapper.children[i].getAttribute('data-art')) {

                            items = JSON.parse(localStorage.getItem(listId)) || [];
                            items.push(myJson[i])
                            console.log(items);
                        }
                    }
                }
            }
            localStorage.setItem(listId, JSON.stringify(items));
        }

        function getElemFromLS() {
            //get elements from Local Storage (check date, time, isAvailable) and set availability
            const inputDay = document.getElementById('form-date').value;
            const inputTime = document.getElementById('form-time').value;

            const local = JSON.parse(localStorage.getItem('tables'));
            const wrapper = document.getElementById('tables-wrapper');
            console.log(local);

            for (let i = 0; i < local.length; i++) {
                if (inputDay == local[i].date.day) {
                    if (inputTime == local[i].date.time) {
                        if (local[i].isAvailable == false) {
                            let k = local[i].id;
                            wrapper.children[k].classList.add('not-available');
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

        //onclick ReserveBtn - add to LS
        const reserveBtn = document.getElementById('reserve');
        reserveBtn.addEventListener('click', function () {
            addToLS();
            location.href = "check-out.html";
        });

        function onShowTableList(e) {
            e.preventDefault();
            const wrapper = document.getElementById('wrapper');
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

            //onclick table - add class Reserve, set data from inputs
            let singleTable = document.getElementsByClassName('single-table');
            Array.from(singleTable).forEach(function (element) {
                element.addEventListener('click', classChange);
                element.addEventListener('click', setDate);
            });
        }
        //onclick ShowTables - show tables
        showTables.addEventListener('click', onShowTableList);
    })

//disable/enable btn submit
const inputDate = document.getElementById('form-date');
const inputName = document.getElementById('form-name');
const inputTime = document.getElementById('form-time');
const inputEmail = document.getElementById('form-email');
const inputTel = document.getElementById('form-tel');
const btnSubmit = document.getElementById('showMore');

function disBtn(e) {
    e.preventDefault();

    if (inputName.value.length > 0 && inputDate.value.length > 0 && inputTime.value.length > 0 && inputEmail.value.length > 0 && inputTel.value.length > 0) {
        console.log(inputDate.value);
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}

inputName.addEventListener('keyup', disBtn);
inputDate.addEventListener('keyup', disBtn);
inputTime.addEventListener('keyup', disBtn);
inputEmail.addEventListener('keyup', disBtn);
inputTel.addEventListener('keyup', disBtn);