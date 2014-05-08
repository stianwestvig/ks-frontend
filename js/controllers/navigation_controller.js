

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


    navigation.menuItems = [
        {
            'href' : '#/article',
            'linkText' : 'Artikkelside',
            'categories' : [
                {
                    'href' : '#/article',
                    'linkText' : 'secondLevelItem',
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'thirdLevelItem'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'thirdLevelItem'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'thirdLevelItem'
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'secondLevelItem'
                },
                {
                    'href' : '#/article',
                    'linkText' : 'secondLevelItem'
                }
            ]
        },
        {
            'href' : '#/persons',
            'linkText' : 'Finn kollega'
        },
        {
            'href' : '#/events',
            'linkText' : 'Events'
        },
        {
            'href' : '#/profile',
            'linkText' : 'Profilside'
        },
        {
            'href' : '#/list',
            'linkText' : 'Listeside'
        },
        {
            'href' : '#/search',
            'linkText' : 'Søkeresultat'
        }
    ]



});

