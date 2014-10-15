var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../www'));
var bodyParser = require('body-parser')
app.use(bodyParser.json());
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
	

}).post('/communicate', function(req,res){
	var text = req.body;
	messages.push(text);
	res.send(text);
	//var message = {own: true, message: text};
	receive(text);
});

function receive(body){
	var dataToSent = JSON.stringify(body);
	connections.forEach(function(res){
		res.write('id:'+new Date()+"\n");
	 	res.write('data:'+dataToSent+'\n\n');
 	})
}



console.log('server running...: '+__dirname);