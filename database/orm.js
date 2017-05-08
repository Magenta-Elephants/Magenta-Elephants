var Sequelize = require('sequelize');
var db = new Sequelize('4um', 'root', '');


var User = db.define('User', {
  username: Sequelize.STRING,
  currentCurrency: Sequelize.INTEGER,
  totalCurrency: Sequelize.INTEGER,
  noviceRating: Sequelize.INTEGER,
  expertRating: Sequelize.INTEGER
}, {
  timestamps: false
});

var Question = db.define('Question', {
  questionTitle: Sequelize.STRING,
  questionBody: Sequelize.TEXT,
  answer: Sequelize.TEXT,
  Qid_User: Sequelize.INTEGER,
  Aid_User: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports.checkIfUserExists = function(userid, cb) {
  return User.sync()
    .then(() => {
      return User.findById(userid);
    })
    .then((data) => {
      console.log('the data');
      if (data) {
        cb(true);
      } else {
        cb(false);
      }
    })
};

// EXAMPLE USAGE OF UPDATE QUESTION:
// updateQuestion(3, 1, 'this is another example answer!!!');

module.exports.updateQuestion = function(questionId, expertId, answer, res) {
  Question.sync()
    .then(() => {
      return Question.findAll({
        where: { id: questionId }
      })
    })
    .then((data) => {
      return data[0].update({
        answer: answer,
        Aid_User: expertId
      })
    })
    .then((data) => {
      res.end('success!');
    });
}

// EXAMPLE USAGE OF CREATE NEW QUESTION
// createNewQuestion('heliu', 'is the sky blue?', 'yes it is blue.');

module.exports.createNewQuestion = function(username, title, body) {
  Question.sync()
    .then(() => {
      return User.findAll({
        where: { username: username }
      })
    })
    .then((user) => {
      return Question.create({
        Qid_User: user[0].id,
        questionTitle: title,
        questionBody: body
      })
    })
    .then((result) => {
      // db.close();
    })
    .catch((err) => {
      // I have not added actual error catching yet
      console.log(err);
      db.close();
    })
};



// User.sync()
//   .then(function() {
//     User.create({
//       username: "heliu",
//       currentCurrency: 0,
//       totalCurrency: 0,
//       noviceRating: 0,
//       expertRating:0
//     });
//     User.create({
//       username: "john",
//       currentCurrency: 0,
//       totalCurrency: 0,
//       noviceRating: 0,
//       expertRating:0
//     })
//   })
//   .then(function() {
//     return User.findAll({where: {username: "heliu"}});
//   })
//   .then(function(user) {
//     // console.log('the user', user);
//     user.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
//     db.close();
//   })
//   .catch(function(err) {
//     console.log(err);
//     db.close();
//   });

module.exports.retrieveAll = function (res) {
  Question.findAll()
    .then(questions => { 
      var response = [];
      questions.forEach(question => {

        var questionObj = {  
          id: question.id,
          username: User.findById(question.Qid_User).username || 'Anonymous',
          avatar: User.findById(question.Qid_User).avatar || 'https://placeholdit.imgix.net/~text?txtsize=9&txt=100%C3%97100&w=100&h=100',
          title: question.questionTitle,
          body: question.questionBody,
          answer: question.answer || null
        }

        response.push(questionObj);
      });
      return response;
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      // need to improve this error handling
      console.error('There was an error!', err)
      db.close();
    })
}

