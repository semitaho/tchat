angular.module('tchat-app').controller('keskusteluController', ['$scope', 'contextService', 'Auth',function($scope, contextService, Auth){

  $scope.viestictx = contextService.defaultContext;

  $scope.isOwn = function(viesti){
    return viesti.uuid === Auth.getId();

  };

}]); 