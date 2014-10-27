
angular.module('tchat-app').controller('tchat-controller', ['$scope',  '$timeout','$rootScope', 'Auth','tchatService', 'contextService',function($scope, $timeout, $rootScope,Auth,tchatService, contextService){
	
	$scope.contexts = [];
	$scope.user = Auth.get();
	$scope.uuid = tchatService.uuid;


	$scope.$on('onsaid', function(event, message){
		var viestiObject = $scope.createMessage(message);
		console.log('viestibody: '+angular.toJson(viestiObject));
		tchatService.communicate(viestiObject, $scope.receive);
	});

	$scope.createMessage = function(message){
		var viesti = {message : message, 
									context : contextService.defaultContext.context, 
									nick: Auth.get(), 
									uuid: Auth.getId(), 
									timestamp : Date.now()};
		return viesti;
	}
	


	$scope.receive = function(e){
		var datamsg = angular.fromJson(e.data);
		console.log('message arrived: '+e.data);
		$timeout(function(){
			contextService.addMessage(datamsg);
		});
	};

	$scope.contextAddedCallback = function(context){
		console.log('context added: '+context);
		//$rootScope.$broadcast('contextadded', context);
		contextService.addContext(context);
	};

	$scope.connectedCallback = function(e){
		console.log('connected: '+e.data);
		tchatService.addContext('#test1',$scope.contextAddedCallback);
	};

	tchatService.suscribe($scope.connectedCallback, $scope.receive);
}]);