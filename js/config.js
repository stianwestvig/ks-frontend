app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'views/frontpage.html'
        })
        .when('/article', {
            templateUrl: 'views/article.html'
        })
        .when('/article2', {
            templateUrl: 'views/article2.html'
        })
        .when('/persons', {
            templateUrl: 'views/persons.html'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html'
        })
        .when('/list', {
            templateUrl: 'views/list.html'
        })
        .when('/search', {
            templateUrl: 'views/search.html'
        })
        .when('/events', {
            templateUrl: 'views/events.html'
        });

});