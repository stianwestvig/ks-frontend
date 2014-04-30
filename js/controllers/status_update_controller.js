app.controller('statusUpdateCtrl', function(){

    var statusUpdate = this;

    statusUpdate.currentUser = "Adam Haeger";

        statusUpdate.updates = [
            {
                'image': 'img/statusimageplaceholder1.png',
                'name': 'Ole Jørgen Grann',
                'body' : "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
                'comments' : [
                    {
                        'name' : "Stain Westvig",
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
                     "Stain Westvig", "Silje Sletteng", "Per Atle Holvik", "Adam Haeger"
                ],
                'hasLiked' : true

            },
            {
                'image': 'img/statusimageplaceholder2.png',
                'name': 'Ole Jørgen Grann',
                'body' : "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
                'comments' : [],
                'likes' : [
                    "Goran Stene", "Tore Dal"
                ],
                'hasLiked' : false
            }
        ];

    statusUpdate.toggleLike = function(update){
        var index = update.likes.indexOf(statusUpdate.currentUser);
        if (index > -1) {
            update.likes.splice(index, 1);
            update.hasLiked = false;
        } else {
            update.likes.push(statusUpdate.currentUser);
            update.hasLiked = true;
        }
    }

    statusUpdate.addUpdate = function(update){
        statusUpdate.updates.push(
            {
                'image' : 'img/statusimageplaceholder1.png',
                'name' : statusUpdate.currentUser,
                'body' : update,
                'comments' : [],
                likes : []
            }
        )
    }


});

app.filter('iif', function () {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});