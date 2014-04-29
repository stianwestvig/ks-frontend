app.directive('slider', function(){
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: 'views/slider.html'
    };
});