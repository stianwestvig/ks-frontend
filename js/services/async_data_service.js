app.service('asyncDataService', function ($http) {
    // delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function() {
        return $http({
            method: 'GET',
            url: 'http://fiks7.peratle.dev.bouvet.no/api/CalendarEvent/2014-01-01/2016-01-01'
            // url: '/js/services/data_service.js'
            //params: 'limit=10, sort_by=created:desc',
            //headers: {'Content-type': 'application/json'}
        });
    };


    // not in use, just example:
    this.doRequest = function() {
        var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
        var url = "/js/services/pure_events_data_service.json";
        return $http.jsonp(url)
            .success(function(data){
                console.log(data);
            });
    };


    /*var deferred = $q.defer();
    $http.get('http://localhost:1337/js/services/pure_events_data_service.json').then(function(data) {
        deferred.resolve(data);
    });

    this.getEventData = function(){
        return deferred.promise;
    }*/
});

