angular.module('tchat-app').controller('LoginController', ['$scope', '$state', 'Auth', function($scope, $state,Auth){
	$scope.login = function(){
		console.log('doing login...');

		Auth.login($scope.nick);
    $state.go('main');
	}


}]);