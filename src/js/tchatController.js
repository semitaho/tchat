
angular.module('tchat-app').controller('tchat-controller', ['$scope',  '$timeout','$rootScope', 'Auth','tchatService', 'contextService',function($scope, $timeout, $rootScope,Auth,tchatService, contextService){
	
	$scope.contexts = contextService.contexts;
	$scope.user = Auth.get();
	$scope.uuid = tchatService.uuid;


	$scope.$on('onsaid', function(event, message){
		
	});

	$scope.createMessage = function(message){
		var viesti = {message : message, 
									context : contextService.defaultContext.context, 
									nick: Auth.get(), 
									uuid: Auth.getId(), 
									timestamp : Date.now()};
		return viesti;
	}
	
	$scope.receive = function(e){
		var datamsg = angular.fromJson(e.data);
		console.log('message arrived: '+e.data);
		$timeout(function(){
			contextService.addMessage(datamsg);
		});
	};

	$scope.contextAddedCallback = function(context){
		console.log('context added: '+context);
		//$rootScope.$broadcast('contextadded', context);
		contextService.addContext(context);
	};

	$scope.connectedCallback = function(e){
		console.log('connected: '+e.data);
		var contexts = contextService.load();
		var promises = [];
		if (contexts.length > 0){
			contextService.contexts.length = 0;
			angular.forEach(contexts ,function(ctx){
				promises.push(tchatService.addContext(ctx.context));

			});
			
			var defaultName = contextService.loadDefault();
			angular.forEach(promises,function(promise){
			  promise.then(function(data){
				angular.forEach(contexts, function(ctx){
					if (data.data === ctx.context){
						contextService.contexts.push(ctx);
						if (ctx.context === defaultName){
							contextService.setDefaultCtx(ctx);
						}
					}
				});
			   });
			});
		}
	};

	$scope.imageCallback = function(e){
		var imagedata = angular.fromJson(e.data);
		$timeout(function(){
			contextService.addImage(imagedata);
		});
	};

	$scope.joinCallback = function(e){
		console.log('someone has joined...'+angular.toJson(e.data));
		var joindata = angular.fromJson(e.data);
		$timeout(function(){
			contextService.addJoin(joindata);
		});
	};

	$scope.say = function(){
		var viestiObject = $scope.createMessage($scope.message);
		tchatService.communicate(viestiObject, $scope.receive);
		$scope.message = '';
		$scope.showEnter = false;
	};

	$scope.fileChange = function(files){
		console.log('file changed: '+files);
		for (var i = 0; i < files.length; i++) { 
			tchatService.sendFile($scope.createMessage('kuva'), files[i]); 
		}
	};

	$scope.clickUpload = function(){
		//var querySelector = document.querySelector('#upload');
		//var angularElement = angular.element(querySelector);
		document.getElementById('upload').click();
		//angularElement.trigger('click');
	};

	tchatService.suscribe($scope.connectedCallback, $scope.receive, $scope.imageCallback, $scope.joinCallback);
}]);