
app.controller('searchCtrl', function($scope, $window){

    var search = this;

    var active = location.search.indexOf('ansatt') > 0;
    console.log('QUERY',location.search, active);

    this.active = active;

});


