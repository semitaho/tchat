angular.module('tchat-app').factory('tchatService', ['$http',function($http){
    var source = new EventSource('/backend');
   

	return {

		setOnMessageCallback : function(callback){
			source.onmessage = callback;
		},
		communicate : function(text, doneCallback){
			$http.get('/communicate/'+text);
		}
	};

}]);