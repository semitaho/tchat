var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../www'));
app.listen(9001);

var router =express.Router();
var messages = [];
var connections = [];
app.get('/backend', function(req,res){
	 req.connection.addListener("close", function () {
	 	console.log('closing connection...');
	 	connections.forEach(function(response, index){
	 		if (res === response){
	 			connections.splice(index, 1);
	 		} 
	 	});

	 	console.log('size after removal: '+connections.length);
   
    }, false);
	 res.writeHead(200, {
	 	'Content-Type': 'text/event-stream',
	 	'Cache-Control': 'no-cache',
	 	'Connection': 'keep-alive'
  	});
	 connections.push(res);
	

}).get('/communicate/:text', function(req,res){
	var text = req.params.text;
	messages.push(req.params.text);
	res.send(text);
	receive(text);
});

function receive(text){
	connections.forEach(function(res){
		res.write('id: '+new Date().toLocaleTimeString()+'\n');
	 	res.write('data:'+text+'\n\n');
 	})
}



console.log('server running...: '+__dirname);