angular.module('tchat-app').factory('contextService', function(){
  
  return {
    defaultContext : {messages: []},
    contexts : [],

    addContext : function(contextName){
      console.log('adding new ctx: '+contextName);
      var newContext = this.find(contextName);
      if (newContext === undefined || newContext === null){
        console.log('which is new context...');
        newContext = {context: contextName, messages: []};
        this.contexts.push(newContext);
      }
      this.setDefaultCtx(newContext);
    },

    addMessage : function(msgObject){
      angular.forEach(this.contexts, function(contextObj){
        if (contextObj.context === msgObject.context){
          contextObj.messages.push(msgObject);

        }
      });

      console.log('default context: '+this.defaultContext.messages.length);
  },
    setDefaultCtx : function(context){
      this.defaultContext.context = context.context;
      this.defaultContext.messages = context.messages;
      console.log('default context: '+angular.toJson(this.defaultContext));
    },

    find  : function(ctxname){
      var contextFound;
      angular.forEach(this.contexts, function(context){
        if (context.context === ctxname){
          contextFound = context; 
        }
      });
      return contextFound;
    }
  };
});