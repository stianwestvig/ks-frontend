var app = angular.module('app', ['mm.foundation', 'ngRoute']);


app.config(function($routeProvider, $locationProvider){




    $routeProvider
        .when('/', {
            templateUrl: 'views/frontpage.html'
        })
        .when('/article', {
            templateUrl: 'views/article.html'
        });


});