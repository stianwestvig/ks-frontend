app.service('dataService', function () {
    return {
        regions: [
            { name: "Nord-Norge" },
            { name: "Østlandet" },
            { name: "Vestlandet" },
            { name: "Sørlandet" }
        ],
        data: [
            {
                title: "Norsk kommunesektor i EU/EØS teorien",
                description: "Kort om arrangementet. Fastsatt tegn. ",
                startDate: "2014-04-21T00:00:00",
                endDate: "2014-04-21T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Fagsamling for FoU",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: "2014-05-01T00:00:00",
                endDate: "2014-05-01T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Norsk kommunesektor i EU/EØS teorien, Øst",
                description: "Kort om arrangementet. Fastsatt tegn. ",
                startDate: "2014-05-10T00:00:00",
                endDate: "2014-05-10T00:00:00",
                region: "Østlandet",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Fagsamling for FoU Øst",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: "2014-05-21T00:00:00",
                endDate: "2014-05-21T00:00:00",
                region: "Østlandet",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Senkveldssamling 10. mai",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: "2014-06-21T00:00:00",
                endDate: "2014-06-21T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Fagsamling for FoU",
                description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
                startDate: "2014-06-20T00:00:00",
                endDate: "2014-06-20T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },
            {
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: "2014-07-21T00:00:00",
                endDate: "2014-07-21T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: "2014-05-15T00:00:00",
                endDate: "2014-05-15T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: "2014-05-04T00:00:00",
                endDate: "2014-05-04T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: "2014-05-19T00:00:00",
                endDate: "2014-05-19T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: "2014-05-19T00:00:00",
                endDate: "2014-05-19T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            },{
                title: "Finnmark: Fylkesmøte i juli",
                description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
                startDate: "2014-06-20T00:00:00",
                endDate: "2014-06-20T00:00:00",
                region: "Nord-Norge",
                url: "http://localhost:8888/#/article"
            }
        ],
        data2: [{"title":"Kalenderhendelse","description":"Ingresstekst - kalender","startDate":"2014-05-21T00:00:00","endDate":"2014-05-29T00:00:00","region":"Oslo","url":"/en/kalender/kalenderhendelse/"},{"title":"Kalenderhendelse2","description":"Ingress - kalender2","startDate":"2014-05-28T00:00:00","endDate":"2014-05-28T19:00:00","region":"Trondheim","url":"/en/kalender/kalenderhendelse2/"}],

        statuses: [
         {
         'image': 'img/statusimageplaceholder1.png',
         'name': 'Ole Jørgen Grann',
         'body' : "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
         'comments' : [
         {
         'name' : "Stian Westvig",
         'comment': "Jeg vil være med på klima konferanse!"
         },
         {
         'name' : "Silje Sletteng",
         'comment': "Jeg også!"
         },
         {
         'name' : "Per Atle Holvik",
         'comment': "Elsker klima!"
         }
         ],
         'likes' : [
         {
         name: "Stian Westvig"
         },
         {
         name: "Silje Sletteng"
         },
         {
         name: "Per Atle Holvik"
         }

         ],
         'hasLiked' : true

         },
         {
         'image': 'img/statusimageplaceholder2.png',
         'name': 'Ole Jørgen Grann',
         'body' : "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
         'comments' : [],
         'likes' : [
         {
         name: "Stian Westvig"
         },
         {
         name: "Silje Sletteng"
         },
         {
         name: "Per Atle Holvik"
         }

         ],
         'hasLiked' : false
         }
         ]
    };
});