var CalendarCtrl = function () {
    var calendar = this;

    calendar.today = function() {
        calendar.dt = new Date();
    };

    var events = [
        {
            "title": "Norsk kommunesektor i EU/EØS teorien",
            "description": "Kort om arrangementet. Fastsatt tegn. ",
            "startDate": "",
            "endDate": "",
            "region": "Nord-Norge"
        }
    ]




    calendar.today();




    /*console.log(calendar.dt);


     // Disable weekend selection
    calendar.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    calendar.toggleMin = function() {
        calendar.minDate = calendar.minDate ? null : new Date();
    };
    calendar.toggleMin();

    calendar.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        calendar.opened = true;
    };

    calendar.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    calendar.initDate = new Date('2016-15-20');
    calendar.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    calendar.format = calendar.formats[0];*/
};


