angular.module('tchat-app').controller('LoginController', ['$scope', '$state', 'Auth', 'tchatService', function($scope, $state,Auth, tchatService){
	$scope.login = function(){
		console.log('doing login...');
    if (!$scope.registerform.$valid){
      console.log('register not ok...');
      return;
    }
    tchatService.register($scope.nick, $scope.email, function(done){
      console.log('all OK!: '+done);
      Auth.login(done, $scope.nick);
    });
 	}


}]);