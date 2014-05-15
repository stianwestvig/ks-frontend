app.controller('CalendarCtrl', function($scope, helperService, dataService) {

    var calendar = this;

    calendar.data = dataService.data;
    calendar.regions = dataService.regions;
    calendar.startDate;
    calendar.endDate;
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

    calendar.init = function()  {
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
    };

    calendar.init();
    calendar.events = calendar.data;

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