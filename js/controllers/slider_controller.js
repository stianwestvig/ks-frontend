app.controller('sliderController', function($window){
    var slider = this;

    slider.slides = [{active:false},{active:false},{active:false}];
    slider.slides = $window.sliderData;
    slider.slides[0].active = true;

    slider.setActive = function (currentSlide){
        for (var i = 0; i < slider.slides.length; i++){
            slider.slides[i].active = false;
        }
        currentSlide.active = !currentSlide.active;
    }
});