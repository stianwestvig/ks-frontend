app.controller('statusUpdateCtrl', function(asyncDataService, dataService){

    var statusUpdate = this;

    statusUpdate.currentUser = "Adam Haeger";
    
    var result = asyncDataService.getStatuses(); 
    
    result.success(function(data){
        statusUpdate.updates = data;
    }).error(function(){
        statusUpdate.updates = dataService.statuses;
        console.log('async status data failed - using local backup data');
    });





    statusUpdate.toggleLike = function(update){
        var index = update.likes.indexOf(statusUpdate.currentUser);
        if (index > -1) {
            update.likes.splice(index, 1);
            update.hasLiked = false;
        } else {
            update.likes.push(statusUpdate.currentUser);

            console.log('update.likes',update.likes);
            update.hasLiked = true;
        }
    };

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
    };

    statusUpdate.toggleComments = function(update){
        update.commentsVisible = !update.commentsVisible;
    };


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
            });

            element.bind('mouseout', function(event){
                console.log('mousing out');
            })

        }
    };
});


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
            });
            event.preventDefault();
        }
    };
});


app.filter('iif', function () {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});

app.filter('newlines', function () {
    return function(text) {
        return text.replace(/\n/g, '<br/>');
    }
});