angular.module('tchat-app').factory('Auth', function(){


	return {
		isLoggedIn  : function(){
			return localStorage.getItem('nick') !== null;
		}
	}

});