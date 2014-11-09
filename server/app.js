
require('array.prototype.find');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://tchatuser:tchat123@ds045970.mongolab.com:45970/tchatdb');

var Schema = mongoose.Schema;  

var UserModel = new Schema({  
    nick: { type: String, required: true },  
    email: { type: String, required: true }, 
});

var User = mongoose.model('User', UserModel);

var app = express();
app.use(express.static(__dirname + '/../www'));
app.use(bodyParser.json());
app.use(multer({ dest: './www/uploads/'}))

app.listen(9001);

var router =express.Router();
var suscribers = [];

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/register', function(req, res){
	var body = req.body;

	User.findOne({'nick' : body.nick}).select('id').exec(function(err, done){
		if (err){
			console.log('something went wrong!');
		} else {
			if (done === null || done === undefined){
				console.log('no results found: creating new:');
				var user = new User({nick: body.nick, email : body.email});
				user.save(function(err, storedUser){
					if (err){
						console.error(err);
						return;
					}
					console.log('CREATED new: '+storedUser._id.toString());
					res.write(storedUser._id.toString());
					res.end();
				});
			} else {
				console.log('got something: '+done._id);
				res.write(done._id.toString());
				res.end();
			}
		}

	});
});

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
	 var uuid = req.params.uuid;
	 var suscriber = {uuid: uuid, response : res, contexts : []};
	 console.log('new suscriber: '+uuid);
	 suscribers.push(suscriber);
	 connected(res, uuid);
	

}).post('/communicate', function(req,res){
	var text = req.body;
	console.log('text: '+JSON.stringify(text));
	receive(text);
	res.end();
}).post('/sendfile',function(req,res){
	onImage(req.body,req.files);
	res.end();
}).post('/addcontext', function(req, res){
	var body = req.body;
	var suscriber = getSuscriberByUuid(body.uuid);
	var context  = body.context;
	console.log('context joining: '+context);
	if (suscriber.contexts.indexOf(context) === -1){
		suscriber.contexts.push(context);
	} else {
		console.log('WARN! context already exists: '+context);
	}
	onjoin(body);
	res.write(context);
	res.end();

});

function onjoin(body){
	suscribers.forEach(function(suscriber){
		if (suscriber.uuid !== body.uuid){
			if (suscriber.contexts.indexOf(body.context) !== -1){
				suscriber.response.write('id:'+Date.now()+'\n');
				suscriber.response.write('event:onjoin\n');
				suscriber.response.write('data:'+JSON.stringify( body )+'\n\n');
			}
		}
	});
}


function onImage(body, file){
	console.log('got imaage: '+body);
	var cloneBody = JSON.parse( JSON.stringify( body ) );
	cloneBody.relativepath = '/uploads/'+file.file.name;
	var cloneBodyJSON = JSON.stringify(cloneBody);
	suscribers.forEach(function(suscriber){
		if (suscriber.uuid === body.uuid){
			if (suscriber.contexts.indexOf(body.context) === -1){
				console.log('not found: creating ctx: '+body.context);
				suscriber.contexts.push(body.context);
			}
		}

		if (suscriber.contexts.indexOf(body.context) !== -1){
			suscriber.response.write('id:'+Date.now()+'\n');
			suscriber.response.write('event:onimage\n');

			suscriber.response.write('data:'+cloneBodyJSON+'\n\n');
		}
	});
}


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
}


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