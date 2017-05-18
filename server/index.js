const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../models/index'));
const sessionParser = require('../middleware/sessionParser.js');
const request = require('request');
const config = require('../config/vars.js');
const login = require('../middleware/onLogin.js');
const port = process.env.PORT || 3000;
const app = express();

process.env.PWD = process.cwd();
app.use(cookieParser());

var jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/testing', function(req, res, next) {
  res.end('this is a test');
});

// app.get('/', function(req, res, next) {
//   console.log('got to index!');
//   // res.redirect('/dashboard');
// });

app.get('/dashboard', sessionParser, function(req, res, next) {
  res.sendFile(process.env.PWD + '/client/index.html');
});

app.get('/callback', function(req, res, next) { 
  var code = req.query.code;
  var url = `https://github.com/login/oauth/access_token?client_id=${config.clientID}&redirect_uri=https://fast-forest-86732.herokuapp.com/callback&client_secret=${config.clientSecret}&code=${code}`;
  console.log('do we at least get here????\n\n\n\n\n\n\n\n\n\n\n');
  request.post(url, function(err, httpResponse, body) {
    var accessToken = body.substring(13);
    var options = {
      url: `https://api.github.com/user?access_token=${accessToken}`,
      headers: {
        'User-Agent': '4um'
      }
    };
    console.log('this is the access token', accessToken);

    request.get(options, function(err, httpResponse, body) {
      login(req, res, next, body);
    });
  });
});

app.get('/expertRating', function(req, res) {
  db.User.getRating('expert', req.body.username)
  .then((result) => {
    res.end(result);
  });
});

app.get('/noviceRating', function(req, res) {
  db.User.getRating('novice', req.body.username)
  .then((result) => {
    res.end(result);
  })
});

app.get('/questions/*', function(req, res) {
  var slashIndex = req.url.lastIndexOf('/') + 1;
  var tag = req.url.substring(slashIndex).toLowerCase();

  db.Tag.getQuestionsFromTag(tag, questions => res.end(JSON.stringify(questions)));
});

app.get('/questions', function (req, res) {
  db.Question.getQuestions('', arr => res.send(arr));
});

app.post('/questions', jsonParser, function(req, res) {
  console.log('client request from IOS!!');
  req.body.tags = JSON.parse(req.body.tags);
  db.Question.createNewQuestion(req.body.username, req.body.title, req.body.body, Number(req.body.price), req.body.tags, req.body.minExpertRating );
  db.User.updateCurrency(req.body.username, Number(req.body.price));
  res.end();
});

app.put('/questions', function(req, res) {
  var questionId = req.body.questionId;
  delete req.body.questionId;
  db.Question.updateQuestion(questionId, req.body)
  .then((result) => {
    res.end(JSON.stringify(result));
  });
});

app.post('/messages', function(req, res) {
  console.log('this is happening');
  db.Message.createMessage(req.body.questionId, req.body.userId, req.body.body);
  res.end();
});

app.post('/messages/*', function(req, res) {
  var slashIndex = req.url.lastIndexOf('/') + 1;
  var destination = req.url.substring(slashIndex);
  if (!namespaces.includes(destination)) {
    namespaces.push(destination);
    createNamespace(destination);
  }
})

app.use(express.static(process.env.PWD + '/client'));
app.get('/users*', function(req, res) {
  var slashIndex = req.url.lastIndexOf('/') + 1;
  var user = req.url.substring(slashIndex);
  console.log('this is the user', user);
  console.log('this is the url', req.url);
  db.User.getUserInfo(user, userInfo => res.end(JSON.stringify(userInfo)));
});

app.get('*', function(req, res) {
  // res.redirect('/dashboard');
});


var server = app.listen(port, function() {
  console.log('Listening on port 3000 the dirname is', process.env.PWD + '/../client');
});
const io = require('socket.io')(server);
var namespaces = [] 
connections = [];
users = [];

var createNamespace = function(destination) {
  var nsp = io.of(`/${destination}`);
  nsp.on('connection', function(socket) {
    connections.push(socket);
    console.log(`someone connected`);
    socket.on('disconnect', function() {
      console.log('user disconnected');
    })

    socket.on('new user', function(data, callback) {
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsernames();
    });

    socket.on('new message', function(msg){
      console.log('message: ' + msg);
      nsp.emit('new message', msg);
    });

    socket.on('finish', function(msg) {
      db.Question.finishQuestion(destination);
      nsp.emit('finish');
    });
  });

  var updateUsernames = function() {
    nsp.emit('get users', users);
  };
};

