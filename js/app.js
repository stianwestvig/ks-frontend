
/*var app = angular.module('app', ['mm.foundation', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap.datepicker']);*/

var app = angular.module('app', [
    'mm.foundation',
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap.datepicker',
    'agh.multimenu',
    'agh.tooltip'
]);


app.run(function(){
    FastClick.attach(document.body);
});

