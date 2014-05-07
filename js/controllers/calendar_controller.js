var CalendarCtrl = function () {
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


    calendar.today = function() {
        calendar.dt = new Date();
        calendar.setStartDate(new Date().getTime());
        calendar.setEndDate(new Date().setDate(calendar.getStartDate().getDate() + 30));

        /*tomorrow.setDate(today.getDate()+1);*/


        console.log(calendar.endDate);

        // Date.prototype.events.events = data;


        console.log('calendar controller happening');
        console.log(calendar.dt);
    };

    calendar.today();
    calendar.events = data;






    /*console.log('Vår json sin date:');
    console.log(calendar.events[2].startDate);*/









    /*
    calendar.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    calendar.initDate = new Date('2016-15-20');
    calendar.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    calendar.format = calendar.formats[0];*/
};







/*
var data = [
    {
        "title": "Norsk kommunesektor i EU/EØS teorien",
        "description": "Kort om arrangementet. Fastsatt tegn. ",
        "startDate": new Date("2014-05-07 09:00:00"),
        "endDate": new Date("2014-05-09 16:00:00"),
        "region": "Nord-Norge"
    },
    {
        "title": "Svensk kommunesektor i EU/EØS teorien",
        "description": "Kort om arrangementet. Fastsatt tegn. ",
        "startDate": new Date("2014-05-15 08:35:00"),
        "endDate": new Date("2014-05-15 10:15:00"),
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
    },{
        "title": "Finnmark: Fylkesmøte",
        "description": "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
        "startDate": new Date("2014-06-10 13:37:00"),
        "endDate": new Date("2014-06-11 13:37:00"),
        "region": "Nord-Norge"
    }
]*/
