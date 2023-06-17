const loadingScreen = document.querySelector('.loading-screen');
var slideIndex = 0;
showSlide(slideIndex);

function changeSlide(n) {
    showSlide(slideIndex += n);
}

async function showSlide(n) {
    var slides = document.getElementsByClassName("banner-slideshow")[0].getElementsByTagName("a");

    if (n >= slides.length) {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "flex";
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

setInterval(function() {
    changeSlide(1);
}, 3000);

document.getElementsByClassName("prev")[0].addEventListener("click", function() {
    changeSlide(-1);
});

document.getElementsByClassName("next")[0].addEventListener("click", function() {
    changeSlide(1);
});
// Code for showing/hiding the virtual assistant widget
const chatWidget = document.getElementById('chat-widget');

chatWidget.addEventListener('click', function() {
    chatWidget.classList.toggle('open');
});