var Sequelize = require('sequelize');
var db = new Sequelize('4um', 'root', '', {
  logging: false
});

module.exports.User = db.define('User', {
  username: Sequelize.STRING,
  avatar_url: Sequelize.STRING,
  bio: Sequelize.TEXT,
  currentCurrency: { type: Sequelize.INTEGER, defaultValue: 100 },
  totalCurrency: { type: Sequelize.INTEGER, defaultValue: 100 }
}, {
  timestamps: false
});

module.exports.Question = db.define('Question', {
  questionTitle: Sequelize.TEXT,
  questionBody: Sequelize.TEXT,
  tags: Sequelize.TEXT,
  price: { type: Sequelize.INTEGER, defaultValue: 20 },
  answer: Sequelize.TEXT,
  Nid_User: Sequelize.INTEGER,
  Eid_User: Sequelize.INTEGER,
  minExpertRating: Sequelize.INTEGER,
  noviceRating: Sequelize.INTEGER,
  answered: { type: Sequelize.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports.Session = db.define('Session', {
  userid: Sequelize.INTEGER,
  cookieNum: Sequelize.STRING,
  userAgent: Sequelize.STRING,
  expirationDate: Sequelize.DATE
});