app.controller('CalendarCtrl', function($scope, $http, helperService, dataService, asyncDataService) {

    var calendar = this;
    this.dataLoaded = false;


    calendar.regions = dataService.regions;
    calendar.refreshMonth = false;

    calendar.setStartDate = function(date){
        calendar.startDate = date;
    };

    calendar.getStartDate = function(){
        return calendar.startDate;
    };

    calendar.setEndDate = function(date){
        calendar.endDate = date;
    };

    calendar.getEndDate = function(){
        return calendar.endDate;
    };

    calendar.getMonthFromStartDate = function(){
        var mydate = new Date(calendar.getStartDate());
        return mydate.getMonth();
    };

    calendar.setMonthInStartDate = function(month){
        calendar.setStartDate(calendar.getStartDate().setMonth(month));
    };

    calendar.resetCalendar = function(){
        calendar.refreshMonth = true;
        calendar.init();
    };

    calendar.init = function($http)  {
        /* Initialize the date object to today */
        var firstOfTheMonth = new Date();
        firstOfTheMonth.setDate(1);
        calendar.dt = firstOfTheMonth;

        /* set the start date to display: */
        var newStartDate = helperService.addDaysToDate(calendar.dt, 0);
        calendar.setStartDate(newStartDate);

        /* set the end date to display: */
        var newEndDate = helperService.addDaysToDate(calendar.dt, 30);
        calendar.setEndDate(newEndDate);


        /* get initial data from server */
        calendar.data = [];
        asyncDataService.getData().
            success(function(data, status, headers, config) {
                console.log('--> ajax call success.');
                console.log(data);
                calendar.data = data;
                calendar.events = calendar.data;
                console.log(calendar);

                calendar.dataLoaded = true;
                calendar.initDataDates();
                console.log('--> running initDates');
            }).
            error(function(data, status, headers, config) {
                console.log('--> ajax call failed, getting local data.')
                calendar.data = dataService.data;
                calendar.events = calendar.data;
                console.log(calendar);


                calendar.dataLoaded = true;
                calendar.initDataDates();
                console.log('--> running initDates');
            });

    };



    calendar.initDataDates = function(){
        calendar.events.forEach(function(event){
            event.startDate = new Date(event.startDate);
            event.endDate = new Date(event.endDate);
        });
    };

    calendar.init($http);


    /* watch stuff: */
    $scope.$watch('calendar.dt', function(newVal, oldVal){

        var newValTimestamp = helperService.toTimestamp(newVal);
        var oldValTimestamp = helperService.toTimestamp(oldVal);

        /* Check if entire month will be displayed, or just one day */
        var entireMonth = calendar.dt.refreshMonth || calendar.refreshMonth;

        /* Reset entire month flag, so it is ready for next iteration */
        calendar.refreshMonth = false;

        if(oldValTimestamp !== undefined){
            if(oldValTimestamp !== newValTimestamp){
                calendar.setEndDate(oldVal);
                var days = 1;

                /* Test if new month or just within a month: */
                if (entireMonth || calendar.getMonthFromStartDate() !== newVal.getMonth()){

                    var newDate = new Date(newVal);

                    /* Set day to the first in the month */
                    newDate.setDate(1);
                    calendar.setStartDate(newDate);

                    /* Find number of days in the selected month to use as End Date */
                    var monthIndex = newDate.getMonth() +1;
                    days = helperService.daysInMonth(monthIndex,newDate.getFullYear());
                }
                else {
                    days = 1;
                    calendar.setStartDate(newVal);
                }

                /* add 1 or 30 days to copy of start date */
                var newEndDate = helperService.addDaysToDate(calendar.getStartDate(), days);
                calendar.setEndDate(newEndDate);
            }
        }

    }, true);


});