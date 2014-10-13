
angular.module('tchat-app').controller('tchat-controller', ['$scope', 'tchatService',function($scope,tchatService){
	$scope.henkilot = ['hanna', 'ville'];

	$scope.viestit = [];

	$scope.receive = function(e){
		$scope.$apply(function(){
			var viesti = {'own': false, 'message': e.data};
			$scope.viestit.push(viesti);
		});
	};

	tchatService.setOnMessageCallback($scope.receive);
}]);