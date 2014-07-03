app.controller('statusUpdateCtrl', function($window, asyncDataService, dataService){

    var statusUpdate = this;
    currentProfileLoginName = $window.currentProfileLoginName;
    statusUpdate.currentUser = $window.currentUser;



    // get aync data:
    var result = asyncDataService.getStatuses(currentProfileLoginName);
    result.success(function(data){
        statusUpdate.updates = data;
    }).error(function(){
        statusUpdate.updates = dataService.statuses;
        console.log('async status data failed - using local backup data');
    });

    statusUpdate.toggleLike = function(update){

        if (update.hasLiked) {
            var index = update.likes.indexOf(statusUpdate.currentUser.name);
            // post to server:
            asyncDataService.toggleLike(update.id, false);

            update.likes.splice(index, 1);
            update.hasLiked = false;
        } else {

            // post to server:
            asyncDataService.toggleLike(update.id, true);

            update.likes.push(statusUpdate.currentUser.name);
            update.hasLiked = true;
        }

    };

    statusUpdate.addUpdate = function(update){

        // post to server:
        var result = asyncDataService.postStatus(update);

        // if success, update frontend with new post:
        result.success(function(data){

            console.log(result, data);
            statusUpdate.updates.unshift(
                {
                    'id': data.pageId,
                    'image' : statusUpdate.currentUser.imageUrl,
                    'name' : statusUpdate.currentUser.name,
                    'body' : update,
                    'comments' : [],
                    likes : []
                }
            );
        });

    };

    statusUpdate.toggleComments = function(update){
        update.commentsVisible = !update.commentsVisible;
    };


    statusUpdate.addComment = function(update, comment){

        // post to server:
        asyncDataService.postComment(update.id, comment);

        update.comments.push(
            {
                'name' : statusUpdate.currentUser.name,
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
        if (text) {
            return text.replace(/\n/g, '<br/>');
        }
        else return '';

    }
});