app.controller('CalendarCtrl', function($scope, helperService, dataService) {

    /*
     *
     * TODO:
     *
     * - klikk på måned - viser hele måned
     *
     *
     * DONE:
     *
     * - markering av dager med events
     * - klokkeuavhengighet
     * - inactive lenker til dager utenfor måned
     * - måned: sett dag til første
     * - og end dag til siste i måned
     * - lenke til eventside
     * - filtrer på region
     *
     * */

    var calendar = this;

    calendar.data = dataService.data;
    calendar.regions = dataService.regions;
    calendar.startDate;
    calendar.endDate;

    calendar.setStartDate = function(date){
        calendar.startDate = date;
    }
    calendar.getStartDate = function(){
        return calendar.startDate;
    }

    calendar.setEndDate = function(date){
        calendar.endDate = date;
    }
    calendar.getEndDate = function(){
        return calendar.endDate;
    }

    calendar.getMonthFromStartDate = function(){
        var mydate = new Date(calendar.getStartDate());
        return mydate.getMonth();
    }

    calendar.setMonthInStartDate = function(month){
        calendar.setStartDate(calendar.getStartDate().setMonth(month));
    }


    calendar.init = function()  {
        /* Initialize the date object to today */
        calendar.dt = new Date();

        /* set the start date to display: */
        var newStartDate = helperService.addDaysToDate(calendar.dt, 0);
        calendar.setStartDate(newStartDate);

        /* set the end date to display: */
        var newEndDate = helperService.addDaysToDate(calendar.dt, 30);
        calendar.setEndDate(newEndDate);

        /*console.log('init start: ' + calendar.getStartDate());
        console.log('init end: ' + calendar.getEndDate());*/
    };

    calendar.init();
    calendar.events = calendar.data;

    /* watch stuff: */
    $scope.$watch('calendar.dt', function(newVal, oldVal){

        var newValTimestamp = helperService.toTimestamp(newVal);
        var oldValTimestamp = helperService.toTimestamp(oldVal);

        /*console.log('new: ' + newValTimestamp);
        console.log('old: ' + oldValTimestamp);*/

        if(oldValTimestamp !== undefined){
            if(oldValTimestamp !== newValTimestamp){

                /*console.log('watcher on the wall reporting');
                console.log('start: '+$scope.calendar.startDate);
                console.log('end:   '+$scope.calendar.endDate);
                console.log('dt:    '+$scope.calendar.dt);
                console.log('\n');*/

                calendar.setEndDate(oldVal);
                var days = 1;


                /* Test if new month or just within a month: */
                if (calendar.getMonthFromStartDate() !== newVal.getMonth()){

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