app.service('helperService', function () {
    var helperService = {

        toTimestamp : function(date){
            var factor =  24 * 60 * 60 * 1000;
            return date * factor;
        },

        dateToString : function(timestamp){
            /* Take a timestamp, convert to string */
            var date =  new Date()
            date.setTime(timestamp);
            return date.toUTCString();
        },
        addDaysToDate: function(date, days){
            var newDate = new Date(date.getTime());
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        }
    };

    return helperService;

});