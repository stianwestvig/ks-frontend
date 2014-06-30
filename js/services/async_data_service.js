
app.service('asyncDataService', function ($http) {

    this.getData = function(startDate, endDate) {

        if (startDate && endDate) {
            // var urlString = 'http://fiks7.peratle.dev.bouvet.no/api/CalendarEvent';
            var urlString = window.location.host + '/api/CalendarEvent';
            var intervalString = '/';

            var startYear = startDate.getFullYear();
            var startMonth = ('0' + (startDate.getMonth() + 1)).slice(-2);
            var startDay = ('0' + startDate.getDate()).slice(-2);

            var endYear = endDate.getFullYear();
            var endMonth = ('0' + (endDate.getMonth() + 1)).slice(-2);
            var endDay = ('0' + endDate.getDate()).slice(-2);

            // looking into the future:
            if (endDate > startDate) {
                intervalString += startYear + '-' + startMonth + '-' + startDay + '/' + endYear + '-' + endMonth + '-' + endDay + '';
            }

            // looking into the past:
            else {
                intervalString += endYear + '-' + endMonth + '-' + endDay + '/' + startYear + '-' + startMonth + '-' + startDay + '';
            }

            console.log('asyncDataService: getting data in interval: ', urlString + intervalString);

            return $http({
                method: 'GET',
                url: urlString + intervalString
            });
        }

    };

});

