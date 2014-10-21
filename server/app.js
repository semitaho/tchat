
require('array.prototype.find');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../www'));
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.listen(9001);

var router =express.Router();
var suscribers = [];

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/backend', function(req,res){
	 req.connection.addListener("close", function () {
	 	console.log('closing connection...');
	 	suscribers.forEach(function(suscriber, index){
	 		if (res ===  suscriber.response){
	 			suscribers.splice(index, 1);
	 		} 
	 	});

	 	console.log('size after removal: '+suscribers.length);
   
    }, false);
	 res.writeHead(200, {
	 	'Content-Type': 'text/event-stream',
	 	'Cache-Control': 'no-cache',
	 	'Connection': 'keep-alive'
  	});
	 	var uuid = generateUUID();

	 var suscriber = {uuid: uuid, response : res, contexts : []};
	 console.log('new suscriber: '+suscriber.uuid);
	 suscribers.push(suscriber);
	 connected(res, uuid);
	

}).post('/communicate', function(req,res){
	var text = req.body;
	console.log('text: '+JSON.stringify(text));
	receive(text)
//	messages.push(text);
//	res.send(text);
	//var message = {own: true, message: text};
//	receive(text);
}).get('/addcontext/:uuid/:context', function(req, res){
	var suscriber = getSuscriberByUuid(req.params.uuid);
	var context  = req.params.context;
	console.log('context joining: '+context);
	if (suscriber.contexts.indexOf(context) === -1){
		suscriber.contexts.push(context);
	} else {
		console.log('WARN! context already exists: '+context);
	}
	res.write(context);
	res.end();

});

function generateUUID(){
	var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
   });
   return uuid;
};

function connected(res,uuid){
	console.log('uuid: '+uuid);
	res.write('id:'+Date.now()+'\n');
	res.write('event:onconnect\n');
	res.write('data:'+uuid+'\n\n');
};
function getSuscriberByUuid(uuid){
	var suscriber = suscribers.find(function(suscriber){
		return suscriber.uuid === uuid;
	});
	return suscriber;
}


function receive(body){
	var dataToSent = JSON.stringify(body);
	suscribers.forEach(function(suscriber){
		if (suscriber.uuid === body.uuid){
			if (suscriber.contexts.indexOf(body.context) === -1){
				console.log('not found: creating ctx: '+body.context);
				suscriber.contexts.push(body.context);
			}
		}

		if (suscriber.contexts.indexOf(body.context) !== -1){
			suscriber.response.write('id:'+Date.now()+'\n');
			suscriber.response.write('data:'+dataToSent+'\n\n');
		}
	});
}



console.log('server running...: '+__dirname);