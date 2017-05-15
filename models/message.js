const db = require('../database/index.js');
const question = require('./question.js');

module.exports.createMessage = function(questionId, userId, body) {
  return db.Message.sync()
    .then(() => {
      return db.Message.create({
        QuestionId: questionId,
        date: new Date(),
        userId: userId,
        msg: body
      });
    });
};

module.exports.getMessages = function(questionId) {
  return db.Message.sync()
    .then(() => {
      return db.Message.findAll({
        where: { QuestionId: questionId },
        limit: 10,
        sort: { id: 1 }
      });
    });
};

