app.service('helperService', function () {
    var helperService = {

        toSeconds : function(days){
            var oneDay =  24 * 60 * 60 * 1000;
            return days * oneDay;
        },

        dateToString : function(timestamp){
            /* Take a timestamp, convert to string */
            var date =  new Date()
            date.setTime(timestamp);
            return date.toUTCString();
        }
    };

    return helperService;

});