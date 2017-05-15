const db = require('../database/index.js');

module.exports.createUser = function(username, avatar_url, bio) {
  return db.User.sync()
    .then(() => {
      return db.User.create({
        username: username,
        avatar_url: avatar_url,
        bio: bio
      });
    });
};

module.exports.checkIfUserExists = function(username) {
  return db.User.sync()
    .then(() => {
      return db.User.findAll({
        where: {
          username: username
        }
      });
    })
    .then((data) => {
      if (data[0]) {
        return data[0].id;
      } else {
        return false;
      }
    });
};

module.exports.updateCurrency = function(username, change) {
  return db.User.sync()
    .then(() => {
      return db.User.findOne({
        where: { username: username }
      });
    })
    .then((user) => {
      if (change > 0) {
        return user.update({
          currentCurrency: user.currentCurrency + change,
          totalCurrency: user.currentCurrency + change
        });
      } else {
        return user.update({
          currentCurrency: user.totalCurrency + change
        });
      }
    });
};

var getQuestions = function(type, userid, cb) {
  var parameter = (type === 'expert') ? 'E' : 'N';
  db.Question.sync()
    .then(() => {
      return db.Question.findAll({
        where: {
          [parameter + 'id_User']: userid
        }
      });   
    })
    .then((questions) => {
      var standardizedQuestions = questions.map(element => element.dataValues);
      cb(standardizedQuestions);
    });
};

var findRatingFromQuestions = function(type, questions) {
  var totalRatings = 0;
  var totalScore = 0;
  for (var i = 0; i < questions.length; i++) {
    if (questions[i][type + 'Rating']) {
      totalRatings++;
      totalScore += questions[i][type + 'Rating'];
    }
  }
  return (totalScore === 0 && totalRatings === 0) ? 0 : totalScore / totalRatings;
};


// OK I KNOW THIS FUNCTION LOOKS HELLA DIRTY, BUT THIS IS ACTUALLY THE FASTEST WAY OF DOING THIS BECAUSE IT MAKES LESS DATABASE CALLS AND PERFORMS THE TWO BIG CALLS ASYNCHRONOUSLY (HENCE THE CALLBACKS WITHIN THE PROMISE)

module.exports.getUserInfo = function(username, cb) {
  var user;
  db.User.sync()
    .then(() => {
      return db.User.findOne({ where: { username: username } });
    })
    .then((result) => {
      if (result) {
        user = result.dataValues;
      } else {
        throw 'user not found';
      }

      var counter = 0;

      getQuestions('novice', user.id, (noviceQuestions) => {
        noviceQuestions = noviceQuestions || [];
        user.recentNoviceQuestions = noviceQuestions.slice(0, 10).reverse();
        user.noviceRating = findRatingFromQuestions('novice', noviceQuestions);
        (counter === 1) ? cb(user) : counter++;
      });

      getQuestions('expert', user.id, (expertQuestions) => {
        expertQuestions = expertQuestions || [];
        user.recentExpertQuestions = expertQuestions.slice(0, 10).reverse();
        user.expertRating = findRatingFromQuestions('expert', expertQuestions);
        (counter === 1) ? cb(user) : counter++;
      });

    })
    .catch((err) => {
      console.log('err!', err);
    });
};


// THIS FUNCTION IS CALLED WHEN YOU WANT TO JUST GET A USERS RATING AND NOT OTHER PROFILE INFO
// EXAMPLE USAGE OF GET RATING:
// THE TWO TYPES ARE expert AND novice
// IT IS CRUCIAL THAT THEY ARE NOT CAPITALIZED
// getRating('novice', 1)
//   .then((data) => {
//     console.log(' the data', data);
//   })


module.exports.getRating = function(type, username) {
  return db.Question.sync()
    .then(() => {
      db.User.findOne({
        where: { username: username }
      });
    })
    .then((userid) => {
      var parameter = (type === 'expert') ? 'E' : 'N';
      return db.Question.findAll({
        where: {
          [parameter + 'id_User']: userid
        }
      });
    })
    .then((result) => {
      var totalRatings = 0;
      var totalScore = 0;
      for (var i = 0; i < result.length; i++) {
        if (result[i][type + 'Rating']) {
          totalRatings++;
          totalScore += result[i][type + 'Rating'];
        }
      }
      return (totalScore === 0 && totalRatings === 0) ? 0 : totalScore / totalRatings;
    });
};
