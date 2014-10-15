angular.module('tchat-app').factory('tchatService', ['$http',function($http){
    var source = new EventSource('/backend');
   
    

    function generateUUID(){
    	var d = new Date().getTime();
    	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
	};

	var ouid = generateUUID();
	return {
		uuid :  ouid,

		setOnMessageCallback : function(callback){
			source.onmessage = callback;
		},
		communicate : function(text, doneCallback){
			var data = {'message' : text, 'uuid' : this.uuid};
			$http.post('/communicate', data);
		}
	};

}]);