angular.module('tchat-app').factory('tchatService', ['$http', 'Auth',function($http, Auth){
   
    
	return {
		uuid :  null,

		suscribe: function(connectedCallback, messageCallback){
			console.log('suscribing...');
			var source = new EventSource('/backend');
			source.addEventListener('onconnect',connectedCallback);
			source.onmessage = messageCallback;


		},

		addContext : function(context, doneCallback){
			var contextEncoded = encodeURIComponent(context);
			$http.get("/addcontext/"+this.uuid+"/"+contextEncoded).success(doneCallback);
		},
		communicate : function(context, text, doneCallback){
			var data = {'message' : text, 'uuid' : this.uuid, 'timestamp' : Date.now(), 'context' : context, 'nick': Auth.get()};
			$http.post('/communicate', data);
		}
	};

}]);