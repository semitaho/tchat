var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../www'));
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.listen(9001);

var router =express.Router();
var suscribers = [];
app.get('/backend/:uuid', function(req,res){
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
	 var suscriber = {uuid: req.params.uuid, response : res, contexts : []};
	 console.log('new suscriber: '+suscriber.uuid);
	 suscribers.push(suscriber);
	

}).post('/communicate', function(req,res){
	var text = req.body;
	console.log('text: '+JSON.stringify(text));
	receive(text)
//	messages.push(text);
//	res.send(text);
	//var message = {own: true, message: text};
//	receive(text);
});

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
			suscriber.response.write('id:'+new Date()+'\n');
			suscriber.response.write('data:'+dataToSent+'\n\n');
		}
	});
}



console.log('server running...: '+__dirname);