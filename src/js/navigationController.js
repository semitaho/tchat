angular.module('tchat-app').controller('navigationController',  ['$scope', '$filter', 'contextService','tchatService', function($scope,$filter, contextService, tchatService){
	$scope.contexts = contextService.contexts;

	$scope.contextActive = contextService.defaultContext;

	$scope.toggleMenu = false;
	$scope.toggle = function(ctx){

		$scope.toggleMenu = !$scope.toggleMenu;
		if (ctx.context === $scope.contextActive.context){
			return;
		}
		var movingChannelIndex = -1;
		angular.forEach($scope.contexts, function(iterContext, index){
			if (iterContext.context === ctx.context){
				movingChannelIndex = index;
			}
		});
		$scope.contexts.move(movingChannelIndex,0);
		contextService.setDefaultCtx($scope.contexts[0]);
	};

	$scope.$on('contextadded', function(event,data){
		console.log('context: '+data);
		contextService.addContext(data);		
	});

	$scope.addContext = function(){
		var newcontext = $scope.newcontext;
		tchatService.addContext(newcontext, function(done){
			console.log('done adding context: '+done);
			$scope.newcontext = '';
			$scope.toggleMenu = false;
			contextService.addContext(done);

		});
		
	};

	$scope.show = function(ctx){
		if (ctx.context === $scope.contextActive.context){
			return true;
		}
		if ($scope.toggleMenu){
			return true;
		}
		return false;
	};

	$scope.showAddNew = function(){
		return $scope.toggleMenu;
	};

	

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