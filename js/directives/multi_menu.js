angular.module('agh.multimenu', [])

    .controller('MenuController', ['$scope', '$attrs', function($scope, $attrs) {

        var menu = this;
        $scope.activeLevel = 0;
        $scope.activeitem = 0;
        $scope.subMenuCount = 0;
        menu.menuItems = [];

        menu.init = function(menuItems, startlevel){
            $scope.menuItems = menuItems;
            menu.level = startlevel;

        }

        menu.addMenuItem = function(item){
            item.active = false;
            menu.menuItems.push(item);
        }

        menu.clearActive = function(){


            /*console.log(menu.menuItems);*/

            for(var i = 0; i < menu.menuItems.length; i++){

                /*console.log(menu.menuItems[i][0]);*/

                    $(menu.menuItems[i][0]).removeClass();
            }

/*            console.log(menu.menuItems);*/

        }

        menu.incrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel + 1;
        }

        menu.decrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel - 1;
            $scope.$apply();
        }

        menu.setActiveItem = function(element){
            console.log(element);
            menu.clearActive();
            element.addClass('active');
            $scope.$apply();

        }

        menu.incrementSubmenus = function(){
            $scope.subMenuCount++;
            console.log("how many submenus?");
            console.log($scope.subMenuCount);
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
                activeitem: "=",
                activelevel: "=",
                menuitemindex: "="
            },
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls;
                menuCtrl.addMenuItem(element);

                element.bind('click', function(){
                    menuCtrl.incrementActiveLevel();
                    /*menuCtrl.setActiveItem(element);*/
                    /*this.activeLevel = scope.activelevel;*/
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
