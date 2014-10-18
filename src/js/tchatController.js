
angular.module('tchat-app').controller('tchat-controller', ['$scope', 'Auth','tchatService',function($scope,Auth,tchatService){
	$scope.henkilot = ['hanna', 'ville'];


	$scope.contexts = [{'#test1' : { 'messages' : [] } }];

	$scope.viestit = [];

	$scope.nick = Auth.get();
	$scope.uuid = tchatService.uuid;



	$scope.receive = function(e){
		var datamsg = angular.fromJson(e.data);
		console.log('viesti: '+datamsg);
		$scope.$apply(function(){
			var viesti = {'own': $scope.uuid === datamsg.uuid , 'nick': datamsg.nick,  'message': datamsg.message};
			
			$scope.viestit.push(viesti);
		});
	};

	tchatService.suscribe($scope.receive);

}]);