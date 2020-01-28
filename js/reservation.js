// ////////////// RESERVATION
let tables = {};

fetch('tables.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        const myJson = json;
        let showTables = document.getElementById('showMore');
        dateValid()

        function dateValid() {
            //check if date is valid (not yesterday...)
            const inputDate = document.getElementById('form-date');
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
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
            let out = '';
            for (let key in myJson) {
                out += '<div class="single-table" id="table-' + myJson[key]['id'] + '"  data-name="' + myJson[key]['name'] + '" data-art="' + myJson[key]['id'] + '">';
                out += '<h4>' + myJson[key]['name'] + '</h4>';
                out += '<p>' + myJson[key]['location'] + '</p>';
                out += '</div>';
            }
            $('#tables-wrapper').html(out);
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
            let inputDay = document.getElementById('form-date').value;
            let inputTime = document.getElementById('form-time').value;
            let hours = +inputTime.slice(0, 2);
            let minutes = inputTime.slice(2, 5);
            let countTime = hours + 1;
            let endTime = countTime.toString() + minutes;

            let name = document.getElementById('form-name').value;
            let email = document.getElementById('form-email').value;
            let tel = document.getElementById('form-tel').value;
            let additional = document.getElementById('form-message').value;
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
            var listId = 'tables';

            for (let i = 0; i < myJson.length; i++) {
                if (myJson[i].isAvailable == false) {
                    console.log(myJson[i].id);
                    console.log(wrapper.children[i].getAttribute('data-art'));
                    if (myJson[i].id == wrapper.children[i].getAttribute('data-art')) {
                        items = JSON.parse(localStorage.getItem(listId)) || [];
                        items.push(myJson[i])
                        console.log(items);
                    }
                }
            }
            localStorage.setItem(listId, JSON.stringify(items));
        }

        function getElemFromLS() {
            //get elements from Local Storage (check date, time, isAvailable) and set availability
            let inputDay = document.getElementById('form-date').value;
            let inputTime = document.getElementById('form-time').value;

            let local = JSON.parse(localStorage.getItem('tables'));
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
        let reserveBtn = document.getElementById('reserve');
        reserveBtn.addEventListener('click', function () {
            addToLS();
            location.href = "check-out.html";
        });

        //onclick ShowTables - show tables
        showTables.addEventListener('click', function (e) {
            e.preventDefault();
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

            //onclick table - add class Reserve, set data from inputs
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