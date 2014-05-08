angular.module('agh.multimenu', [])

    .controller('MenuController', ['$scope', '$attrs', function($scope, $attrs) {

        var menu = this;
        $scope.activeLevel = 1;

        menu.init = function(menuItems){
            $scope.menuItems = menuItems;
        }

        menu.incrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel + 1;
            console.log($scope.activeLevel);
        }

        menu.decrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel - 1;
            console.log($scope.activeLevel);
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

    .directive( 'menuitem', function () {
        return {
            restrict: 'EA',
            replace: true,
            require: '^multimenu',
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls;
                element.bind('click', function(){
                    menuCtrl.incrementActiveLevel();
                })
            }
        };
    })

    .directive( 'backbutton', function () {
        return {
            restrict: 'EA',
            require: '^multimenu',
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls;
                element.bind('click', function(){
                    menuCtrl.decrementActiveLevel();
                })
            }
        };
    })
