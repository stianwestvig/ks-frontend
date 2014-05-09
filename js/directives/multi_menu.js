angular.module('agh.multimenu', [])

    .controller('MenuController', ['$scope', '$attrs', function($scope, $attrs) {

        var menu = this;
        $scope.activeLevel = 0;


        $scope.activeitem = 0;

        menu.init = function(menuItems, startlevel){
            $scope.menuItems = menuItems;

            menu.level = startlevel;

        }

        menu.incrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel + 1;
        }

        menu.decrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel - 1;
            $scope.$apply();
        }

        menu.setActiveItem = function(index){

            console.log("active index:");

            console.log($scope.activeLevel);

            $scope.activeitem = index;
            $scope.$apply();

            console.log($scope.activeitem);

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
            scope : {
                activeitem: "="
            },
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls;
                element.bind('click', function(){
                    menuCtrl.incrementActiveLevel();
                    menuCtrl.setActiveItem(scope.activeitem);
                    console.log("directive");
                    console.log(scope.activeitem);
                })
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
