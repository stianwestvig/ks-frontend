app.service('dataService', function () {
    return {
        regions: [
            { name: "Nord-Norge" },
            { name: "Østlandet" },
            { name: "Vestlandet" },
            { name: "Sørlandet" }
        ],
        data: [
            /*

            Tips til backend utvikler: new Date(year, month, day, hours, minutes, seconds, milliseconds)
            - Datoformatet må være rett, hvis ikke fungerer ikke event kalenderen...

            */
            {
                title: "Norsk kommunesektor i EU/EØS teorien",
                description: "Kort om arrangementet. Fastsatt tegn. ",
                startDate: new Date(2014, 4, 8, 9, 0, 0, 0),
                endDate: new Date(2014, 4, 8, 17, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Fagsamling for FoU",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: new Date(2014, 4, 10, 9, 0, 0, 0),
                endDate: new Date(2014, 4, 10, 9, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Norsk kommunesektor i EU/EØS teorien, Øst",
                description: "Kort om arrangementet. Fastsatt tegn. ",
                startDate: new Date(2014, 4, 8, 9, 0, 0, 0),
                endDate: new Date(2014, 4, 9, 17, 0, 0, 0),
                region: "Østlandet",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Fagsamling for FoU Øst",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: new Date(2014, 4, 10, 10, 0, 0, 0),
                endDate: new Date(2014, 4, 10, 19, 0, 0, 0),
                region: "Østlandet",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Senkveldssamling 10. mai",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: new Date(2014, 4, 10, 9, 0, 0, 0),
                endDate: new Date(2014, 4, 10, 17, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Fagsamling for FoU",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: new Date(2014, 4, 10, 9, 0, 0, 0),
                endDate: new Date(2014, 4, 10, 17, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: new Date(2014, 5, 4, 9, 0, 0, 0),
                endDate: new Date(2014, 5, 10, 9, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: new Date(2014, 5, 9, 9, 0, 0, 0),
                endDate: new Date(2014, 5, 10, 16, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: new Date(2014, 5, 13, 13, 37, 0, 0),
                endDate: new Date(2014, 5, 13, 13, 37, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: new Date(2014, 5, 2, 9, 0, 0, 0),
                endDate: new Date(2014, 5, 2, 16, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: new Date(2014, 5, 7, 9, 0, 0, 0),
                endDate: new Date(2014, 5, 9, 9, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte i juli",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: new Date(2014, 3, 10, 9, 0, 0, 0),
                endDate: new Date(2014, 3, 13, 9, 0, 0, 0),
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            }
        ]
    };
});