
var app = angular.module('app', ['mm.foundation', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap.datepicker']);

var app = angular.module('app', [
    'mm.foundation',
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap.datepicker',
    'agh.multimenu'
]);


app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'views/frontpage.html'
        })
        .when('/article', {
            templateUrl: 'views/article.html'
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