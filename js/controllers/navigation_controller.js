

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
                    'linkText' : ' Artikkelside 2',
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 3'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 3'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 3'
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Artikkelside 2'
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Artikkelside 2'
                }
            ]
        },
        {
            'href' : '#/persons',
            'linkText' : 'Finn kollega',
            'categories' : [
                {
                    'href' : '#/article',
                    'linkText' : 'Finn kollega 2',
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Finn kollega 3'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Finn kollega 3'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Finn kollega 3'
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Finn kollega 2'
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Finn kollega 2'
                }
            ]
        },
        {
            'href' : '#/events',
            'linkText' : 'Events',
            'categories' : [
                {
                    'href' : '#/article',
                    'linkText' : 'Events 2',
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Events 3'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events 3'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events 3'
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Events 2'
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Events 2'
                }
            ]
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

