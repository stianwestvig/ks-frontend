

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

    var menudata = [

        {
            'href': '/en/profilside/',
            'linkText': 'Profilside'
        },



        {
            'href': '/en/listeside/',
            'linkText': 'Listeside',
            'categories': [
                {
                    'href': '/en/listeside/nyhet-3/',
                    'linkText': 'Cognos',
                    'categories': [
                        {
                            'href': '/en/listeside/nyhet-3/test/',
                            'linkText': 'test'
                        }]
                },
                {
                    'href': '/en/listeside/nyhet-4/',
                    'linkText': '360'
                },
                {
                    'href': '/en/listeside/artikkelside/',
                    'linkText': 'Fiks'
                },
                {
                    'href': '/en/listeside/nyhet-1/',
                    'linkText': 'EyeShare'
                },
                {
                    'href': '/en/listeside/nyhet-2/',
                    'linkText': 'Current - reiseregninger og utlegg'
                }]
        },



        {
            'href': '/en/artikkelside/',
            'linkText': 'Nyheter',
            'categories': [
                {
                    'href': '/en/artikkelside/nyhet-4/',
                    'linkText': 'Nyhet 4'
                },
                {
                    'href': '/en/artikkelside/nyhet-3/',
                    'linkText': 'Nyhet 3'
                },
                {
                    'href': '/en/artikkelside/nyhet-2/',
                    'linkText': 'Nyhet 2'
                },
                {
                    'href': '/en/artikkelside/nyhet-1/',
                    'linkText': 'Nyhet 1'
                }]
        },



        {
            'href': '/en/kalender/',
            'linkText': 'Kalender',
            'categories': [
                {
                    'href': '/en/kalender/kalenderhendelse/',
                    'linkText': 'Kalenderhendelse'
                },
                {
                    'href': '/en/kalender/kalenderhendelse2/',
                    'linkText': 'Kalenderhendelse2'
                }]
        },



        {
            'href': '/en/sok/',
            'linkText': 'Søk'
        }


    ];

    navigation.menuItems = menudata;
        /*[
        {
            'href' : '#/article',
            'linkText' : 'Kategori 1',
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
                    'linkText' : ' Artikkelside 2 childs',
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 32'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 32'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Artikkelside 32'
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
            'linkText' : 'Kategori 2',
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
            'linkText' : 'Kategori 3',
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
                    'linkText' : 'Events stian',
                    'categories' : [
                        {
                            'href' : '#/article',
                            'linkText' : 'stians partytelt',
                            'categories' : [
                                {
                                    'href' : '#/article',
                                    'linkText' : 'Streetdancers'
                                },
                                {
                                    'href' : '#/article',
                                    'linkText' : 'Pølsespisekonkurranse'
                                },
                                {
                                    'href' : '#/article',
                                    'linkText' : 'en millioooon gjester.'
                                }
                            ]
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events stian 2'
                        },
                        {
                            'href' : '#/article',
                            'linkText' : 'Events stian 3'
                        }
                    ]
                },
                {
                    'href' : '#/article',
                    'linkText' : 'Events 2'
                }
            ]
        },
            {
                'href' : '#/persons',
                'linkText' : 'Finn ansatte'
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
            'href' : '#/events',
            'linkText' : 'Kalender'
        }
    ]*/
});

