angular.module('tchat-app').directive('ngEnter', ['$timeout', 'tchatService',function($timeout, tchatService){
	return {
		link: function(scope,element){ 

			scope.say = function(){

        scope.$emit('onsaid', scope.message);
				scope.message = '';
			};

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
