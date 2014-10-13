angular.module('tchat-app').directive('ngEnter', ['tchatService',function(tchatService){
	return {
		link: function(scope,element){ 

			scope.say = function(){
				console.log('aaa');
				tchatService.communicate(scope.message);
				scope.message = '';
			};

			element.bind('keypress', function(event) {
				if (event.which === 13) {
					scope.$apply(function() {
                    scope.say();
                    event.preventDefault();
                 });
               }
            });
		}
	}
}]);
