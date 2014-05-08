/*myApp.run(function($templateCache) {
    $templateCache.put('templateId.html', 'This is the content of the template');
});*/

/*
angular.module("menu_item.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("menu_item.html",
    "<ul><li ng-repeat=\"item in item.categories\" ng-include=\"'menu_item.html'\"></li></ul>");
}]);
*/



angular.module('agh.multimenu', [])

    .controller('MenuController', ['$scope', '$attrs', function($scope, $attrs) {
        var menu = this;

        $scope.activeLevel = 1;


        menu.init = function(menuItems){
            $scope.menuItems = menuItems;
        }

        menu.setActiveLevel = function(level){
            $scope.activeLevel = level;
        }

    }])

    .directive( 'multimenu', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/multimenu.html',
            scope: {
                menuitems: '='
            },
            controller: 'MenuController',
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls[0];
                if ( menuCtrl) {
                    menuCtrl.init(scope.menuitems);
                }
            }
        };
    })
/*


    .directive( 'menuitem', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/multimenu.html',
            scope: {
                menuitems: '='
            },
            controller: 'MenuController',
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls[0];
                if ( menuCtrl) {
                    menuCtrl.init(scope.menuitems);
                }
            }
        };
    })
*/

