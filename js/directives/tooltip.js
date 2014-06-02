angular.module('agh.tooltip', ['views/tooltip.html'])

    .directive( 'tooltipHover', function () {
        return {
            restrict: 'A',
            replace: false,
            transclude: false,
            templateUrl: 'views/tooltip.html',
            scope: {
                items: '=',
                visible: '='
            },
            link: function(scope, element, attrs, ctrl){
                element.bind('mouseover mouseout', function(){
                    console.log("yooo");
                    scope.visible = !scope.visible;
                    console.log(scope.visible);
                    scope.$apply();

                })
            }
        };
    })


angular.module("views/tooltip.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("views/tooltip.html",
            "<div class='likes-list' >" +
            "<span>{{ items.length }}</span>" +
            "<ul ng-show=\"visible\">" +
            "<li ng-repeat=\"item in items\" >{{ item.name }}</li>" +
         "</ul>"
     + "<div>"
    );
}]);