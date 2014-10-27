angular.module('tchat-app').factory('Auth', function(){


	return {
		isLoggedIn  : function(){
			return localStorage.getItem('user') !== null;
		},

		login:  function(uid,nick){
			var sessionObject =  {id: uid, nick: nick};
			localStorage.setItem('user', angular.toJson(sessionObject));

		},

		get: function() {
			var userJSON=  localStorage.getItem('user');
			return angular.fromJson(userJSON).nick;
		},

		getId: function(){
			var userJSON=  localStorage.getItem('user');
			return angular.fromJson(userJSON).id;

		}
	}

});