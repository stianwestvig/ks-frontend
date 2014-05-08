app.filter('dateFilter', function(){
    return function(events, startDate, endDate) {
        var filtered = [];

        /*console.log('filter start: '+startDate);
        console.log('filter end: '+endDate);*/

        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if(event.startDate > startDate && event.startDate < endDate) {
                filtered.push(event);
            }
        }
        return filtered;
    }

});