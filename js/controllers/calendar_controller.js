app.controller('CalendarCtrl', function() {

    var calendar = this;

    calendar.startDate;
    calendar.endDate;

    // date string format: YYYY-MM-DD hh:mm:ss
    // initielt fylt med 3 måneder events:
    var data = [
        {
            "title": "Norsk kommunesektor i EU/EØS teorien",
            "description": "Kort om arrangementet. Fastsatt tegn. ",
            "startDate": new Date(),
            "endDate": new Date(),
            "region": "Nord-Norge"
        },
        {
            "title": "Svensk kommunesektor i EU/EØS teorien",
            "description": "Kort om arrangementet. Fastsatt tegn. ",
            "startDate": new Date(),
            "endDate": new Date(),
            "region": "Østlandet"
        },
        {
            "title": "Fagsamling for FoU",
            "description": "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
            "startDate": new Date("2014-05-10 08:37:00"),
            "endDate": new Date("2014-05-15 10:06:00"),
            "region": "Nord-Norge"
        },
        {
            "title": "Fagsamling for FoU",
            "description": "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
            "startDate": new Date("2014-05-10 08:37:00"),
            "endDate": new Date("2014-05-15 10:06:00"),
            "region": "Nord-Norge"
        },
        {
            "title": "Finnmark: Fylkesmøte",
            "description": "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            "startDate": new Date("2014-06-4 13:37:00"),
            "endDate": new Date("2014-06-11 13:37:00"),
            "region": "Nord-Norge"
        },{
            "title": "Finnmark: Fylkesmøte",
            "description": "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            "startDate": new Date("2014-06-10 13:37:00"),
            "endDate": new Date("2014-06-11 13:37:00"),
            "region": "Nord-Norge"
        },{
            "title": "Finnmark: Fylkesmøte",
            "description": "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            "startDate": new Date("2014-06-10 13:37:00"),
            "endDate": new Date("2014-06-11 13:37:00"),
            "region": "Nord-Norge"
        },{
            "title": "Finnmark: Fylkesmøte",
            "description": "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            "startDate": new Date("2014-06-10 13:37:00"),
            "endDate": new Date("2014-06-11 13:37:00"),
            "region": "Nord-Norge"
        },{
            "title": "Finnmark: Fylkesmøte",
            "description": "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            "startDate": new Date("2014-06-10 13:37:00"),
            "endDate": new Date("2014-06-11 13:37:00"),
            "region": "Nord-Norge"
        }
    ]

    calendar.setStartDate = function(date){
        calendar.startDate = date;
    }
    calendar.getStartDate = function(){
        return calendar.startDate;
    }

    calendar.setEndDate = function(date){
        calendar.endDate = date;
    }
    calendar.getEndDate = function(){
        return calendar.endDate;
    }


    calendar.today = function()  {
        /* Initialize the date object to today */

        calendar.dt = new Date();

        /* Get timestamp version of the dateobject */
        var timeStamp = calendar.dt.getTime();

        /* set the start date to display: */
        calendar.setStartDate(timeStamp);

        /* set the end date to display: */
        calendar.setEndDate(calendar.getStartDate() + calendar.toSeconds(30));
    };


    calendar.toSeconds = function(days){
        var oneDay =  1 * 24 * 60 * 60 * 1000;
        return days * oneDay;
    }


    calendar.dateToString = function(timestamp){
        /* Take a timestamp, convert to string */
        var date =  new Date()
        date.setTime(timestamp);
        return date.toUTCString();
    }

    calendar.today();
    calendar.events = data;

});