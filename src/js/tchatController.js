
angular.module('tchat-app').controller('tchat-controller', ['$scope', 'tchatService',function($scope,tchatService){
	$scope.henkilot = ['hanna', 'ville'];

	$scope.viestit = [];




	$scope.receive = function(e){
		var datamsg = angular.fromJson(e.data);
		console.log('viesti: '+datamsg);
		$scope.$apply(function(){
			var viesti = {'own': tchatService.uuid === datamsg.uuid , 'message': datamsg.message};
			$scope.viestit.push(viesti);
		});
	};

	tchatService.setOnMessageCallback($scope.receive);
}]);