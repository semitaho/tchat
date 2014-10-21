angular.module('tchat-app').controller('navigationController',  ['$scope', '$filter',function($scope,$filter){
	$scope.contexts = [];	

	$scope.contextActive = {};

	$scope.toggleMenu = false;
	$scope.toggle = function(ctx){

		$scope.toggleMenu = !$scope.toggleMenu;
		if (ctx.context === $scope.contextActive.context){
			return;
		}
		$scope.contextActive = ctx;
		var movingChannelIndex = -1;
		angular.forEach($scope.contexts, function(iterContext, index){
			if (iterContext.context === ctx.context){
				movingChannelIndex = index;
			}
		});

		$scope.contexts.move(movingChannelIndex,0);


	};

	$scope.$on('contextadded', function(event,data){
		console.log('context: '+data);
		var context = $scope.find(data);
		if (context === undefined || context === null){
			console.log('which is new context...');
			var newContext = {context: data, messages: []};
			$scope.contexts.push(newContext);
			$scope.contextActive = newContext;
		}
	});

	$scope.addContext = function(){
		$scope.plus = false;
	};

	$scope.show = function(ctx){
		if (ctx.context === $scope.contextActive.context){
			return true;
		}
		if ($scope.toggleMenu){
			return true;
		}
		return false;
	}

	$scope.find = function(ctxname){
		var contextFound;
		angular.forEach($scope.contexts, function(context){
			if (context.context === ctxname){
				contextFound = context; 
			}
		});
		return contextFound;
	}

	$scope.toggleRemove = function(context){
		if (context.remove === undefined ||context.remove === null){
			context.remove = true;
		}
		else {
			context.remove = !context.remove;
		}
	}

	$scope.hideRemove = function(context){
		context.remove = false;
	}

	$scope.remove = function(context){
		console.log('removing: '+context);
		var removingChannelIndex = -1;
		angular.forEach($scope.contexts, function(ctx, index){
			if (ctx.context === context){
				removingChannelIndex = index;
			}
		});
		var wasActive = $scope.contexts[removingChannelIndex].active;
		$scope.contexts.splice(removingChannelIndex, 1);
		if (wasActive !== null && wasActive !== undefined && wasActive && removingChannelIndex >= 1){
			$scope.contexts[removingChannelIndex-1].active = true;
		}
	};

	$scope.doAddContext = function(){
		console.log('context: '+$scope.contextName);
		$scope.contexts.push({'context' : $scope.contextName})
		$scope.plus = true;
		$scope.contextName = '';

	};
}]);