var db = require('../models/userData.js'),
    Auth  = require ('./auth.js');

module.exports = {

  getDecks: function(req, res) {
    // var googleId = "mvp_test";
    var googleId = req.headers.userid;
    db.getDecks(googleId)
      .then(function(decks) {
        res.send(decks);
      })
      .catch(function(err) {
        console.log(err, "handler");
        res.send(500, err);
      });
  },

  // getDecks: function(req, res) {
  //   // With Auth:
  //   Auth.getId(req)
  //     .catch(function(err) {
  //       // Handler for unsuccessful auth with Google
  //       res.send(401, err);
  //     })
  //     .then(function(googleId) {
  //       console.log(googleId, " :id in reqh auth")
  //       return db.getDecks(googleId)
  //     })
  //     .then(function(decks) {
  //       console.log(decks, " : decks passed to reqH")
  //       res.send(decks);
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //       res.send(500, err);
  //     });
  // },

  refreshDecks: function(req, res) {
    var decks = req.body.decks; //use just body when Auth integrated/tested
    Auth.getId(req)
      .catch(function(err) {
      // Handler for unsuccessful auth with Google
      res.send(401, err);
      })
      .then(function(googleId) {
        return db.refreshDecks(googleId, decks)
      })
      .then(function() {
          res.send(201)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  createDecks: function(req, res) {
    var googleId = req.body.googleId;
    var deckName = req.body.deckName;
    // var googleId = req.get('googleId');
    // var googleId = 'mvp_test';
    db.createDecks(googleId, deckName, req.body.cards)
      .then(function(deck_id) {
        res.send(201, deck_id)
      })
      .catch(function(err) {
        console.log(err);
        res.send(500, err);
      });
  },

  createUser: function(req,res) {
    console.log(req.headers, " :check for chrome token")
    Auth.getId(req)
      .catch(function(err) {
        res.send(401,err);
      })
      .then(function(googleId) {
        return db.createUser(googleId);
      })
      .then(function() {
        res.send(201);
      })
      .catch(function(err) {
        console.log(err);
        res.send(501, err);
      });
  }

  // createDeck: function(req, res) {
  //   // With Auth:
  //   var deckName = req.body.deckName;

  //   Auth.getId(req)
  //     .catch(function(err) {
  //       // Handler for unsuccessful auth with Google
  //       res.send(401, err);
  //     })
  //     .then(function(googleId) {
  //       return db.createDeck(googleId, deckName, req.body);
  //     })
  //     .then(function(deckId) {
  //       res.send(201, deckId)
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //       res.send(500, err);
  //     });
  // }

};

console.log(Auth.getId);

