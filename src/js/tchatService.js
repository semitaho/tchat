angular.module('tchat-app').factory('tchatService', ['$http', 'Auth', '$upload', function($http, Auth, $upload){
   
    
	return {
		uuid :  null,

		suscribe: function(connectedCallback, messageCallback, imageCallback, joinCallback){
			console.log('suscribing...');
			var source = new EventSource('/backend/'+Auth.getId());
			source.addEventListener('onconnect',connectedCallback);
			source.addEventListener('onimage',imageCallback);
			source.addEventListener('onjoin',joinCallback);
			source.onmessage = messageCallback;
		},

		register: function(nick, email,done){
			var data =  {nick: nick, email: email};
			$http.post('/register', data).success(done);
		},

		addContext : function(context, doneCallback){
			var body = {context : context, 
						 nick: Auth.get(), 
						 uuid: Auth.getId(), 
							timestamp : Date.now()};
			
			return $http.post("/addcontext", body);
		},
		communicate : function(context,  doneCallback){
			console.log('communicating...');
			$http.post('/communicate', context);
		},

		sendFile : function(body,file){
			var uploadUrl="/sendfile";
			$upload.upload({
				url: uploadUrl,
				data : body,
				method: 'POST',
				file: file
			}).success(function(data){
				console.log('done!');
			});

        	
		}
	};

}]);