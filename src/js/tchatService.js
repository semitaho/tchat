angular.module('tchat-app').factory('tchatService', ['$http', 'Auth',function($http, Auth){
   
    
	return {
		uuid :  null,

		suscribe: function(connectedCallback, messageCallback){
			console.log('suscribing...');
			var source = new EventSource('/backend/'+Auth.getId());
			source.addEventListener('onconnect',connectedCallback);
			source.onmessage = messageCallback;
		},

		register: function(nick, email,done){
			var data =  {nick: nick, email: email};
			$http.post('/register', data).success(done);
		},

		addContext : function(context, doneCallback){
			var contextEncoded = encodeURIComponent(context);
			$http.get("/addcontext/"+Auth.getId()+"/"+contextEncoded).success(doneCallback);
		},
		communicate : function(context,  doneCallback){
			console.log('communicating...');
			$http.post('/communicate', context);
		}
	};

}]);