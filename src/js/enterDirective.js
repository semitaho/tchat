angular.module('tchat-app').directive('ngEnter', ['$timeout', 'tchatService',function($timeout, tchatService){
	return {
		link: function(scope,element){ 

			element.bind('keypress', function(event) {
				if (event.which === 13) {
					//$timeout(function() {
            scope.say();
            event.preventDefault();
          //});
        }
      });
		}
	}
}]);
