app.service('dataService', function () {
    // date string format: YYYY-MM-DD hh:mm:ss
    // initielt fylt med 3 måneder events:

    var dataService = {
        data: [
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
            },{
                "title": "Finnmark: Fylkesmøte i juli",
                "description": "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                "startDate": new Date("2014-07-10 13:37:00"),
                "endDate": new Date("2014-07-11 13:37:00"),
                "region": "Nord-Norge"
            }
        ]
    }


    return dataService;

});