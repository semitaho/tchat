
angular.module('tchat-app').controller('tchat-controller', ['$scope', '$rootScope', 'Auth','tchatService',function($scope, $rootScope,Auth,tchatService){
	$scope.henkilot = ['hanna', 'ville'];


	$scope.contexts = [];

	$scope.viestit = [];

	$scope.nick = Auth.get();
	$scope.uuid = tchatService.uuid;



	$scope.receive = function(e){
		var datamsg = angular.fromJson(e.data);
		console.log('viesti: '+datamsg);
		$scope.$apply(function(){
			
			var viesti = {'own': tchatService.uuid === datamsg.uuid , 'timestamp' : datamsg.timestamp, 'nick': datamsg.nick,  'message': datamsg.message};
			
			$scope.viestit.push(viesti);
		});
	};

	$scope.contextAddedCallback = function(context){
		$rootScope.$broadcast('contextadded', context);
	};

	$scope.connectedCallback = function(e){
		console.log('connected: '+e.data);
		tchatService.uuid = e.data;
		tchatService.addContext('#test1',$scope.contextAddedCallback);
	};

	tchatService.suscribe($scope.connectedCallback, $scope.receive);
	//tchatService.addContext('test1', ;

}]);