window.addEventListener('load', function () {

    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
    let slider = document.getElementById('slider');
    let total = 0, step = 100;

    prev.addEventListener('click', slide);
    next.addEventListener('click', slide);

    function slide() {
        if (this.getAttribute('id') == 'prev') {
            if (total == 0) {
                total = -400;
                slider.style.left = total + '%';
                console.log(total);
            }
            else {
                total += step;
                slider.style.left = total + '%';
            }
        }
        else {
            if (total == -400) {
                total = 0;
                slider.style.left = total;
            }
            else {
                total -= step;
                slider.style.left = total + '%';
            }
        }
    }
    // Simulate click function 
    function clickButton() {
        click_event = new CustomEvent('click');
        btn_element = document.getElementById('next');
        btn_element.dispatchEvent(click_event);
    }

    let nIntervId;

    function setIntervale() {
        nIntervId = setInterval(clickButton, 2000);
    }

    function stopInterval() {
        clearInterval(nIntervId);
    }

    setIntervale();
    let container = document.getElementById('wrapper');
    container.onmouseover = container.onmouseout = handler;

    function handler(event) {

        if (event.type == 'mouseover') {
            stopInterval();
        }
        if (event.type == 'mouseout') {
            setIntervale();
        }
    }
});
