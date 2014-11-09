angular.module('tchat-app').controller('keskusteluController', ['$scope', 'contextService', 'Auth',function($scope, contextService, Auth){

  $scope.viestictx = contextService.defaultContext;

  $scope.isOwn = function(viesti){
    return viesti.uuid === Auth.getId();

  };

   $scope.isFriend = function(viesti){
    return viesti.uuid !== Auth.getId() && viesti.type !== 'join';

  };

}]); 