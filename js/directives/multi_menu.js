angular.module('agh.multimenu', ['views/multimenu.html'])

    .controller('MenuController', ['$scope', '$attrs', function($scope, $attrs) {

        var menu = this;

        $scope.activeLevel = 0;

        $scope.activeitem = 0;

        $scope.subMenuCount = 0;

        menu.menuItems = [];

        menu.activeItem = null;

        menu.previousItem = null;

        menu.clickPath = [];


        menu.init = function(menuItems, startlevel){
            $scope.menuItems = menuItems;
            menu.level = startlevel;

        }

        menu.addMenuItem = function(item){
            item.active = false;
            menu.menuItems.push(item);
        }

        menu.clearActive = function(){
            for(var i = 0; i < menu.menuItems.length; i++){
                $(menu.menuItems[i][0]).removeClass();
            }

        }

        menu.incrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel + 1;
        }

        menu.decrementActiveLevel = function(){

            $scope.activeLevel = $scope.activeLevel - 1;

            /*menu.setActiveItem(menu.previousItem);*/
            var previousItem = menu.clickPath[menu.clickPath.length - 1];
            previousItem.removeClass('active');
            menu.clickPath.pop();

            console.log(menu.clickPath);

            $scope.$apply();
        }

        menu.setActiveItem = function(element){



            if(!menu.clickPath.length){
                /* we have clicked root level */

                menu.clickPath.push(element);
                element.addClass('active');

            } else {
                element.addClass('active');
                menu.clickPath.push(element);
            }
            $scope.$apply();
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
                    menuCtrl.init(scope.menuitems, scope.startlevel);
                }
            }
        };
    })

    .directive( 'menuitem', function () {
        return {
            restrict: 'EA',
            require: '^multimenu',
            link: function(scope, element, attrs, ctrls) {

                var menuCtrl = ctrls;
                menuCtrl.addMenuItem(element);
                element.bind('click', function(){
                    menuCtrl.incrementActiveLevel();
                    menuCtrl.setActiveItem(element);
                });
            }
        };
    })

    .directive( 'backbutton', function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '^multimenu',
            link: function(scope, element, attrs, ctrls) {
                element.bind('click', function(){
                    ctrls.decrementActiveLevel();
                })
            }
        };
    })


angular.module("views/multimenu.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("menu_item.html",
            "<a ng-if=\"item.categories.length\" menuitem>{{ item.linkText }}</a>" +
            "<a ng-if=\"!item.categories.length\" href=\"{{item.href}}\">{{ item.linkText }}</a>" +
                "<ul >" +
                    "<li ng-repeat=\"item in item.categories\" ng-include=\"'menu_item.html'\"></li>" +
                "</ul>"
    );
}]);
