angular.module('tchat-app').directive('autoScroll', ['$timeout', function($timeout){
	return {
		link : function(scope, element, attrs) {
			scope.$watch(function() {
				return element.children().length;
			}, function() {
				$timeout(function() {
					var div = document.getElementById(attrs.id);
					div.scrollTop = div.scrollHeight;
				});
			});
		}
	};
}]);