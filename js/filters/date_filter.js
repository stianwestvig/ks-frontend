app.filter('dateFilter', function(){
    return function(events, startDate, endDate) {
        var filtered = [];

        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);

        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if(event.startDate >= startDate && event.startDate < endDate) {
                filtered.push(event);
            }
        }
        return filtered;
    }

});