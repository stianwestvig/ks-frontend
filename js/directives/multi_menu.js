angular.module('agh.multimenu', ['views/multimenu.html'])

    .controller('MenuController', ['$scope', '$attrs', function($scope) {

        var menu = this;
        $scope.activeLevel = 0;
        menu.clickPath = [];

        $scope.isVisible;

        menu.init = function(visible){
            $scope.isVisible = visible;
        }

        menu.toggleVisible = function(){
            console.log("call");
            $scope.isVisible = !$scope.isVisible;
            $scope.$apply();
        }


        menu.incrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel + 1;
        }

        menu.decrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel - 1;
            menu.clickPath[menu.clickPath.length - 1].removeClass('active');
            menu.clickPath.pop();
            $scope.$apply();
        }

        menu.setActiveItem = function(element){
            element.addClass('active');
            menu.clickPath.push(element);
            $scope.$apply();
        }
    }])

    .directive( 'multimenu', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/multimenu.html',
            scope: {
                menuitems: '=',
                visible: '='
            },
            controller: 'MenuController',
            link: function(scope, element, attrs, ctrl){
                ctrl.init(scope.visible)
            }
        };
    })

    .directive( 'backbutton', function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '^multimenu',
            link: function(scope, element, attrs, ctrl) {
                element.bind('click', function(){
                    ctrl.decrementActiveLevel();
                })
            }
        };
    })

    .directive( 'closebutton', function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '^multimenu',
            link: function(scope, element, attrs, ctrl) {
                element.bind('click', function(){
                    console.log('click');

                    ctrl.toggleVisible();
                })
            }
        };
    })

    .directive( 'menuitem', function () {
        return {
            restrict: 'EA',
            require: '^multimenu',
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls;
                element.bind('click', function(){
                    menuCtrl.incrementActiveLevel();
                    menuCtrl.setActiveItem(element);
                });
            }
        };
    })



angular.module("views/multimenu.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("menu_item.html",
            "<a ng-if=\"item.categories.length\" menuitem>{{ item.linkText }}<span class=\"icon-arrow-right\"></span></a>" +
            "<a ng-if=\"!item.categories.length\" href=\"{{item.href}}\">{{ item.linkText }}</a>" +
                "<ul ng-if=\"item.categories.length\">" +
                    "<li ng-repeat=\"item in item.categories\" ng-include=\"'menu_item.html'\"></li>" +
                "</ul>"
    );
}]);
