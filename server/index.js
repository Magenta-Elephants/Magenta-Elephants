var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var promisify = require('js-promisify');
var cors = require('cors');
var db = require('../database/orm.js');
var request = require('request');
var config = require('../config/vars.js');


process.env.PWD = process.cwd();

app.use(express.static(process.env.PWD + '/client'));
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port 3000 the dirname is', process.env.PWD + '/../client');
});

// EXAMPLE DATA SENT FOR A PUT TO /QUESTIONS
/* {
*    questionId: 2, 
*    expertId: 1,
*    answer: 'this is an example answer'
*  }
*/

app.put('/questions', function(req, res) {
  db.updateQuestion(req.body.questionId, req.body.expertId, req.body.answer, res);
});

app.get('/login', function(req, res) {
  var redirectURL = `https://github.com/login/oauth/authorize?client_id=27528fcf2f382e8c76ff&state=xUbA6qeu6HvPGPvsOjuZRILAU0Bolgpv&scope=user,repo,gist`;
  res.redirect(redirectURL);
});

app.get('/callback', function(req, res) { 
  var code = req.query.code;
  var url = `https://github.com/login/oauth/access_token?client_id=${config.clientID}&redirect_uri=http://localhost:3000/callback&client_secret=${config.clientSecret}&code=${code}`;

  request.post(url, function(err, httpResponse, body) {
    var options = {
      url: `https://api.github.com/user?access_token=bc5d227184dedb04e0d25c77cf01fc9119734626`,
      headers: {
        'User-Agent': '4um'
      }
    };

    request.get(options, function(err, httpResponse, body) {
      res.end(body);
      db.checkIfUserExists(2, (boolean) => {
        // I'M GOING TO ADD LOGIC TO THIS BUT IT ESSENTIALLY CHECK IF THE USER IS ALREADY IN THE DATABASE
      })
    });
  });

});





// EXAMPLE DATA SENT FOR A POST TO /QUESTIONS
/* {
*    username: 'Oliver',
*    title: 'Why is Oliver so Awesome?',
*    body: 'This is an example body' 
*  }
*/

app.post('/questions', function(req, res) {
  db.createNewQuestion(req.body.username, req.body.title, req.body.body);
  res.end();
});

