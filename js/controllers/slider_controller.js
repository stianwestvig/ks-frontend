app.controller('sliderController', function(){
    var slider = this;
    slider.slides = [
        {
            'image': 'img/meeting.png',
            'title': 'Påmelding til kommunalpolitisk toppmøte 2014',
            'author': 'Sissel Ambjør',
            'date': '17.03.2014',
            'teaser': 'Hva skal vårt lokaldemokrati bygge på i fremtiden? Tillit eller tilsyn? Skjønn eller regler? Står det så bra til at vi bare kan lene oss tilbake - eller har vi grunn til uro? Hør statsminister Erna Solberg, tidligere statsminister Jens Stoltenberg og andre topppolitikeres ideer og løsninger.',
            'link': '#/article',
            'active': false
        },
        {
            'image': 'img/window_wash.png',
            'title': 'Utvendig vindusvask 17. mars',
            'author': 'Sissel Ambjør',
            'date': '18.03.2014',
            'teaser': 'Denne dagen får vi vindusvask. Vær hjelpsom når de kommer.',
            'link': '#/article',
            'active': false
        },
        {
            'image': 'img/meeting.png',
            'title': 'Påmelding til kommunalpolitisk toppmøte 2014',
            'author': 'Sissel Ambjør',
            'date': '17.03.2014',
            'teaser': 'Hva skal vårt lokaldemokrati bygge på i fremtiden? Tillit eller tilsyn? Skjønn eller regler? Står det så bra til at vi bare kan lene oss tilbake - eller har vi grunn til uro? Hør statsminister Erna Solberg, tidligere statsminister Jens Stoltenberg og andre topppolitikeres ideer og løsninger.',
            'link': '#/article',
            'active': false
        }
    ];

    slider.slides[0].active = true;

    slider.setActive = function (currentSlide){

        for (var i = 0; i < slider.slides.length; i++){
            slider.slides[i].active = false;
        }
        currentSlide.active = !currentSlide.active;

    }
});