angular.module('tchat-app').directive('autoScroll', ['$timeout', 'contextService',function($timeout, contextService){
	return {
		link : function(scope, element, attrs) {
			scope.$watch(function() {
				var length = contextService.defaultContext.messages.length;
				console.log('length: '+length);
				return length;
			}, function() {
				$timeout(function() {
					var div = document.getElementById(attrs.id);
					console.log('eme: '+div.scrollHeight);
					div.scrollTop = div.scrollHeight;
				});
			});
		}
	};
}]);