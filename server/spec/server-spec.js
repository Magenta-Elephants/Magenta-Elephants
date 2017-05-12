var mysql = require('mysql');
var request = require('request');
var expect = require('chai').expect;

describe('Persistent 4.um Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: 'plantlife',
      database: '4um'
    });
    dbConnection.connect();

    var tablename = // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert user to the DB', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000',
      json: {
        username: 'michaelDrew',
        currentCurrency: null,
        totalCurrency: null,
        noviceRating: null,
        minExpertRating: null
      }
    }, function () {
      var queryString = 'SELECT * FROM users';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        expect(results.length).to.equal(1);
        expect(results[0].username).to.equal('michaelDrew');
        done();
      });
    });
  });


});