const Sequelize = require('sequelize');

const db = new Sequelize('test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {freezeTableName: true}
});

// const db = new Sequelize('heroku_689621e8f649711', 'b12eb2bede6b4d', 'ad517216', {
//   host: 'us-cdbr-iron-east-03.cleardb.net',
//   logging: false
// });

const timestampsAreFalse = { timestamps: false };

var User = db.define('User', {
  username: Sequelize.STRING,
  avatar_url: Sequelize.STRING,
  bio: Sequelize.TEXT,
  currentCurrency: { type: Sequelize.INTEGER, defaultValue: 100 },
  totalCurrency: { type: Sequelize.INTEGER, defaultValue: 100 }
}, timestampsAreFalse);

var Question = db.define('Question', {
  questionTitle: Sequelize.TEXT,
  questionBody: Sequelize.TEXT,
  tags: Sequelize.TEXT,
  price: { type: Sequelize.INTEGER, defaultValue: 20 },
  answer: Sequelize.TEXT,
  Nid_User: Sequelize.INTEGER,
  Eid_User: Sequelize.INTEGER,
  expertRating: Sequelize.INTEGER,
  requiredRating: Sequelize.INTEGER,
  noviceRating: Sequelize.INTEGER,
  answered: { type: Sequelize.BOOLEAN, defaultValue: false }
}, timestampsAreFalse);

var Session = db.define('Session', {
  userid: Sequelize.INTEGER,
  cookieNum: Sequelize.STRING,
  userAgent: Sequelize.STRING,
  expirationDate: Sequelize.DATE
});

var Tag = db.define('Tag', {
  title: Sequelize.STRING
}, timestampsAreFalse);

var QuestionTag = db.define('QuestionTag', {}, timestampsAreFalse);

var Message = db.define('Message', {
  userId: Sequelize.INTEGER,
  date: Sequelize.DATE,
  msg: Sequelize.TEXT
}, timestampsAreFalse);

User.hasMany(Question);
Question.belongsTo(User);
Question.hasMany(Message);
Question.hasMany(QuestionTag);
Tag.hasMany(QuestionTag);
QuestionTag.belongsTo(Tag);
QuestionTag.belongsTo(Question);
Message.belongsTo(Question);

module.exports.User = User;
module.exports.Question = Question;
module.exports.Session = Session;
module.exports.Tag = Tag;
module.exports.QuestionTag = QuestionTag;
module.exports.Message = Message;
