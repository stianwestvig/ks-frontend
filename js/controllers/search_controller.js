
app.controller('searchCtrl', function($scope){

    var search = this;

    // initial tabs - "alle sider" and "ansatt" - made to work with only these two.
    search.tabs = [
        { active: true },
        { active: false }
    ];

    // look for 'sider' in querystring, and select that tab if found:
    if(location.search.indexOf('sider=true') > 0) {
        search.tabs[1].active = true;
    }
});




