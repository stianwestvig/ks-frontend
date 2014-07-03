app.directive('statusupdate', function(){
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: 'views/status_update.html',
        scope: {
            field: '@'
        }
    };
});