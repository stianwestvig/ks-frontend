app.controller('CalendarCtrl', function($scope, helperService, dataService) {

    var calendar = this;

    calendar.data = dataService.data;
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


    calendar.today = function()  {
        /* Initialize the date object to today */
        calendar.dt = new Date();

        /* Get timestamp version of the dateobject */
        var timeStamp = calendar.dt.getTime();

        /* set the start date to display: */
        calendar.setStartDate(timeStamp);

        /* set the end date to display: */
        calendar.setEndDate(calendar.getStartDate() + helperService.toSeconds(30));
    };

    calendar.today();
    calendar.events = calendar.data;

    /* watch stuff: */
    $scope.$watch('calendar.dt', function(newVal, oldVal){
        calendar.setEndDate(oldVal);
        var days = 1;

        if (calendar.getMonthFromStartDate() !== newVal.getMonth()){
            /* month changed: */
            days = 30;
        }
        else {
            /* day changed */
            days = 1;
        }

        calendar.setStartDate(newVal);

        /* copy start date */
        var newEndDate = new Date(calendar.getStartDate().getTime());

        /* add 1/30 days to copy of start date */
        newEndDate.setDate(newEndDate.getDate()+days);
        calendar.setEndDate(newEndDate);

        calendar.setStartDate(newVal);




        /*
        *
        * markering av dager med events
        *
        * - måned: sett dag til første
        * - og end dag til siste i måned
        *
        *
        * - lenke til eventside
        * */

    }, true);



});