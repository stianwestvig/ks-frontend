app.controller('sliderController', function($window){
    var slider = this;

    slider.slides = [];
    slider.slides = $window.sliderData;


    console.log(slider);


    if(slider.slides){
        slider.slides[0].active = true;
    }

    slider.setActive = function (currentSlide){

        for (var i = 0; i < slider.slides.length; i++){
            slider.slides[i].active = false;
        }
        currentSlide.active = !currentSlide.active;

    }
});
