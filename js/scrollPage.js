window.addEventListener('scroll', () => {
    let page = this;
    let pageTop = this.scrollY;
    let pageHeight = this.outerHeight / 2;

    let frames = document.querySelectorAll('.scrollPage');
    frames.forEach(frame => {
        let frameTop = frame.offsetTop;
        let frameHeight = frame.offsetHeight;

        if (pageTop >= frameTop - pageHeight &&
            pageTop < frameTop + frameHeight / 2) {
            frame.classList.add('animation');
        } else {
            //frame.classList.remove('animation');
        }
    });
});