app.controller('statusUpdateCtrl', function(){
    var statusUpdate = this;


    statusUpdate.currentUser = "Adam Haeger";

        statusUpdate.updates = [
            {
                'image': 'img/statusimageplaceholder1.png',
                'name': 'Ole Jørgen Grann',
                'body' : "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
                'likes' : [
                     "Stain Westvig", "Silje Sletteng", "Per Atle Holvik"
                ]
            },
            {
                'image': 'img/statusimageplaceholder2.png',
                'name': 'Ole Jørgen Grann',
                'body' : "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
                'likes' : [
                    "Goran Stene", "Tore Dal"
                ]
            }
        ];


});