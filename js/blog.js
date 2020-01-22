// open photo in gallery
(function () {
    var modal = document.getElementById('modal');

    window.addEventListener('click', function (e) {
        if (e.target && e.target.parentNode.parentNode.classList.contains("gallery-wrapper")) {
            var img = document.createElement('img');
            img.src = e.target.src;
            img.setAttribute("class", "image-popup");
            modal.style.display = "flex";
            modal.appendChild(img);
        }
    });

    window.addEventListener('click', closeModal);

    function closeModal(e) {
        if (e.target === modal || e.target.nodeName === "SPAN") {
            modal.style.display = "none";
            e.target.removeChild(e.target.lastChild);
        }
    }
})();