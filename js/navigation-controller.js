
function navigation($scope) {
    $scope.hideNavigation = true;
    $scope.myTimeStatus = {label: 'Inn', status: false};

    $scope.toggleNav = function(){
        $scope.hideNavigation = !$scope.hideNavigation;
    };

    $scope.toggleMyTime = function() {
        $scope.myTimeStatus.status = !$scope.myTimeStatus.status;
        if ($scope.myTimeStatus.status) {
            $scope.myTimeStatus.label = 'Ut';
        }
        else {
            $scope.myTimeStatus.label = 'Inn';
        }
    };

};