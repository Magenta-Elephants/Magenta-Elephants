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
      db.close();
      res.end('success!');
    });
}

// createNewQuestion(3, 1, 'this is another example answer!!!');

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
      db.close();
    })
    .catch((err) => {
      // I have not added actual error catching yet
      console.log(err);
      db.close();
    })
};
// EXAMPLE USAGE OF CREATE NEW QUESTION
// createNewQuestion('heliu', 'is the sky blue?', 'yes it is blue.');


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
