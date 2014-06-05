

app.controller('navigationController', function($scope){

    var navigation = this;
    navigation.hideNavigation = true;
    navigation.myTimeStatus = {label: 'Inn', status: false};

    navigation.toggleNav = function(){
        navigation.hideNavigation = !navigation.hideNavigation;
    };

    navigation.clicked = function(){
        navigation.hideNavigation = true;
    }

    navigation.toggleMyTime = function() {
        navigation.myTimeStatus.status = !navigation.myTimeStatus.status;
        if (navigation.myTimeStatus.status) {
            navigation.myTimeStatus.label = 'Ut';
        }
        else {
            navigation.myTimeStatus.label = 'Inn';
        }
    };

    navigation.setActive = function(item){
        item.active = true;
    };

    navigation.menuItems = menudata;

});


