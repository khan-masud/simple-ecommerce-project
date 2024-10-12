const sliderImages = ['../img/slider1.jpg', '../img/slider3.jpg', '../img/slider4.jpg', '../img/slider4.jpg'];

let index = 0;
const time = 3000; // Milliseconds

function slider () {
    const sliderContainer = document.getElementById('home-slider');
    const htmlCode = `<img src='${sliderImages[index]}' class='slider-img' />`
    sliderContainer.innerHTML = htmlCode;

    if(index < sliderImages.length - 1) {
        index++;
    }
    else {
        index = 0;
    }
}

setInterval(slider, time);
slider();