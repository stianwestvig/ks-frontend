/*
angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/datepicker.html",
            "<div class=\"calendar\">\n" +
            "<table>\n" +
            "  <thead>\n" +
            "    <tr>\n" +
            "      <th><a class=\"left\" ng-click=\"move(-1)\"><i class=\"icon-arrow-left\"></i></a></th>\n" +
            "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><h5><a class=\"\" ng-click=\"toggleMode()\">{{title}}</a></h5></th>\n" +
            "      <th><a class=\"right\" ng-click=\"move(1)\"><i class=\"icon-arrow-right\"></i></a></th>\n" +
            "    </tr>\n" +
            "    <tr ng-show=\"labels.length > 0\" class=\"h6\">\n" +
            "      <th ng-show=\"showWeekNumbers\" class=\"text-center\">#</th>\n" +
            "      <th ng-repeat=\"label in labels\" class=\"text-center\">{{label}}</th>\n" +
            "    </tr>\n" +
            "  </thead>\n" +
            "  <tbody>\n" +
            "    <tr ng-repeat=\"row in rows\">\n" +
            "      <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
            "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
            "        <a ng-class=\"{'selected': dt.selected, 'inactive': dt.secondary, 'current': dt.current}\" ng-click=\"select(dt.date)\">{{dt.label}}</a>\n" +
            "      </td>\n" +
            "    </tr>\n" +
            "  </tbody>\n" +
            "</table>\n" +
            "</div>\n" +
            "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/popup.html",
            "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
            "	<li ng-transclude></li>\n" +
            "	<li ng-show=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
            "		<span class=\"btn-group\">\n" +
            "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"today()\">{{currentText}}</button>\n" +
            "			<button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"showWeeks = ! showWeeks\" ng-class=\"{active: showWeeks}\">{{toggleWeeksText}}</button>\n" +
            "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"clear()\">{{clearText}}</button>\n" +
            "		</span>\n" +
            "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"isOpen = false\">{{closeText}}</button>\n" +
            "	</li>\n" +
            "</ul>\n" +
            "");
}]);
*/


var app = angular.module('app', ['mm.foundation', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap.datepicker']);

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