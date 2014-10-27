angular.module('tchat-app').filter('messageDateFilter', ['$filter',function($filter){

	function isToday(firstDate, secondDate){
		var inputAsDate = new Date(firstDate);
		var inputAsSecondDate = new Date(secondDate);
		return (inputAsDate.getDate() === inputAsSecondDate.getDate() 
				&& inputAsDate.getMonth()  === inputAsSecondDate.getMonth() 
				&& inputAsDate.getFullYear() === inputAsSecondDate.getFullYear());

	}


	return function(input){
		var currentDate = Date.now();
		var pvmtext;
		if (isToday(input, currentDate)){
			pvmtext = 'Tänään';
		
		} else {
			pvmtext = $filter('date')(input, 'd.MM.yyyy');
		}
		pvmtext += ' klo ';
		pvmtext += $filter('date')(input, 'HH:mm');
		var current = new Date(input);
		return pvmtext;
	};

}]);