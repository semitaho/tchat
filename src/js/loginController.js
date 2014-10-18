angular.module('tchat-app').controller('LoginController', ['$scope', 'Auth', function($scope, Auth){
	$scope.login = function(){
		console.log('doing login...');

		Auth.login($scope.nick);
	}


}]);