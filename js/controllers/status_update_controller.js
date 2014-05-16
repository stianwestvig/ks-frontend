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
        statusUpdate.updates.unshift(
            {
                'image' : 'img/statusimageplaceholder1.png',
                'name' : statusUpdate.currentUser,
                'body' : update,
                'comments' : [],
                likes : []
            }
        )
    }

    statusUpdate.toggleComments = function(update){
        update.commentsVisible = !update.commentsVisible;
    }


    statusUpdate.addComment = function(update, comment){
        update.comments.push(
            {
                'name' : statusUpdate.currentUser,
                'comment' : comment
            }
        )
    }

});

app.directive( 'likeslist', function () {
    return {
        restrict: 'A',
        scope: {
            'likes' : '='
        },
        link: function(scope, element, attrs, ctrl){


            element.bind('mouseover', function(event){
                console.log('mousing');
            })

            element.bind('mouseout', function(event){
                console.log('mousing out');
            })

        }
    };
})


app.directive( 'comment', function () {
    return {
        restrict: 'A',
        scope: {},
        controller: 'statusUpdateCtrl',
        link: function(scope, element, attrs, ctrl){
            element.bind('keydown keypress', function(event){
                if(event.which === 13){
                    console.log(element[0].value);
                    ctrl.addComment();
                }
            })
            event.preventDefault();
        }
    };
})


app.filter('iif', function () {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});