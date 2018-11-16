const express = require('express');
const router = express.Router();

router.post('/create', (req, res, next) => {
  let gameName = req.body.name;
  console.log("Creating new game: "+gameName+"...");

  sequelize.games.create({name: gameName})
  .then(() => {
    console.log("Created new game");
  }).catch(() => {
    console.log("Error");
    res.redirect("/error");
  });

});

module.exports = router;