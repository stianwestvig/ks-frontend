app.filter('hasEventFilter', function(){
    return function(events, day) {
        return day ;
    }

});