angular.module('tchat-app').factory('Auth', function(){


	return {
		isLoggedIn  : function(){
			return localStorage.getItem('nick') !== null;
		},

		login:  function(nick){
			localStorage.setItem('nick', nick);
		},

		get: function() {
			return localStorage.getItem('nick');
		}
	}

});