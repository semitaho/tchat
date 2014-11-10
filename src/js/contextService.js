angular.module('tchat-app').factory('contextService', ['localStorageKeyContexts', 'localStorageKeyDefault',function(localStorageKeyContexts,localStorageKeyDefault){
  
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

    addJoin : function(joinObject){
      joinObject.type = 'join';
      joinObject.uuid = undefined;
      joinObject.message = 'Keskusteluun saapui: '+joinObject.nick;
      this.doAdd(joinObject);
       
    },

    doAdd : function(object){
      angular.forEach(this.contexts, function(contextObj){
        if (contextObj.context === object.context){
          contextObj.messages.push(object);
        }
      });
      this.save();
    },

    addMessage : function(msgObject){
      msgObject.type = 'message';
      this.doAdd(msgObject);
    },

    addImage : function(msgObject){
      msgObject.type = 'image';
       this.doAdd(msgObject);
    },
    setDefaultCtx : function(context){
      this.defaultContext.context = context.context;
      this.defaultContext.messages = context.messages;
      console.log('default context: '+angular.toJson(this.defaultContext));
    },

    load: function(){
      if (localStorage){
        var items = localStorage.getItem(localStorageKeyContexts);
        if (items !== null){
          return angular.fromJson(items);
        }
      }
      return [];
    },

    loadDefault : function(){
      return localStorage.getItem(localStorageKeyDefault);
    },

    save : function(){
      if (localStorage){
        localStorage.setItem(localStorageKeyContexts, angular.toJson(this.contexts));
        if (this.defaultContext){
           localStorage.setItem(localStorageKeyDefault, this.defaultContext.context);
        }
      }
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
}]);