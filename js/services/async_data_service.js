
app.service('asyncDataService', function ($http) {

    // this.getEvents
    this.getData = function(startDate, endDate) {

        if (startDate && endDate) {
            var urlString = '/api/CalendarEvent';
            var intervalString = '/';

            var startYear = startDate.getFullYear();
            var startMonth = ('0' + (startDate.getMonth() + 1)).slice(-2);
            var startDay = ('0' + startDate.getDate()).slice(-2);

            var endYear = endDate.getFullYear();
            var endMonth = ('0' + (endDate.getMonth() + 1)).slice(-2);
            var endDay = ('0' + endDate.getDate()).slice(-2);

            intervalString += startYear + '-' + startMonth + '-' + startDay + '/' + endYear + '-' + endMonth + '-' + endDay + '';

            return $http({
                method: 'GET',
                url: urlString + intervalString
            });
        }

    };

    this.getStatuses = function(user){
        var serviceUrl = '/api/statuses';
        if (user) {
            serviceUrl += '/' + user;
        }
        return $http({
            method: 'GET',
            url: serviceUrl
        });

    };

    this.postStatus = function(text){
        return $http({
            method: 'POST',
            url: '/api/statuses/',
            data: {
                statusText: text
            }
        });
    }

});

