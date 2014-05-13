

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
    }


    navigation.menuItems =
        [
        {
            'href' : '#/article',
            'linkText' : 'Artikkelside',
            'active' : false,
            'categories' : [
                {
                    'href' : '#/article',
                    'linkText' : ' Artikkelside 2',
                    'active' : false,
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 3',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 3',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 3',
                            'active' : false
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : ' Artikkelside 2 childs',
                    'active' : false,
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 32',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 32',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 32',
                            'active' : false
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Artikkelside 2',
                    'active' : false
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Artikkelside 2',
                    'active' : false
                }
            ]
        },

        {
            'href' : '#/persons',
            'linkText' : 'Finn kollega',
            'active' : false,
            'categories' : [
                {
                    'href' : '#/article',
                    'linkText' : 'Finn kollega 2',
                    'active' : false,
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Finn kollega 3',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Finn kollega 3',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Finn kollega 3',
                            'active' : false
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Finn kollega 2',
                    'active' : false
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Finn kollega 2',
                    'active' : false
                }
            ]
        },
            {
            'href' : '#/events',
            'linkText' : 'Events',
            'active' : false,
            'categories' : [
                {
                    'href' : '#/article',
                    'linkText' : 'Events 2',
                    'active' : false,
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Events 3',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events 3',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events 3',
                            'active' : false
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Events stian',
                    'active' : false,
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'stians partytelt',
                            'active' : false,
                            'categories' : [
                                {
                                    'href' : '#/article',
                                    'linkText' : 'Streetdancers',
                                    'active' : false
                                },
                                {
                                    'href' : '#/article',
                                    'linkText' : 'Pølsespisekonkurranse',
                                    'active' : false
                                },
                                {
                                    'href' : '#/article',
                                    'linkText' : 'en millioooon gjester.',
                                    'active' : false
                                }
                            ]
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events stian 2',
                            'active' : false
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events stian 3',
                            'active' : false
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Events 2',
                    'active' : false
                }
            ]
        },
        {
            'href' : '#/profile',
            'linkText' : 'Profilside',
            'active' : false
        },
        {
            'href' : '#/list',
            'linkText' : 'Listeside',
            'active' : false
        },
        {
            'href' : '#/search',
            'linkText' : 'Søkeresultat',
            'active' : false
        }
    ]



});

