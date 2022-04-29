const router = require("express").Router();
const Character = require("../models/Character.model");

const axios = require("axios");
const { response } = require("../app");

router.get("/", (req, res, next) => {
  axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then( response => {
      res.render("characters/characters-list", {characters: response.data});
    })
    .catch( err => console.log('Error getting characters from DB...', err));
});


// CREATE: display form
router.get("/create", (req, res, next) => {
  res.render("characters/character-create");
});


// CREATE: process form
router.post('/create', (req, res, next) => {

  const characterDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon
  }

  axios.post("https://ih-crud-api.herokuapp.com/characters", characterDetails)
    .then( response => {
      res.redirect("/characters");
    })
    .catch( err => {
      console.log('Error creating new character in the API...', err);
    })
})


router.get("/:characterId", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then( response => {
      res.render("characters/character-details", response.data);
    } )
    .catch( err => {
      console.log('Error getting character details from API', err);
    })
});


router.get("/:characterId/edit", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
  .then( response => {
    res.render("characters/character-edit", response.data);
  } )
  .catch( err => {
    console.log('Error getting character details from API', err);
  })
});

router.post("/:characterId/edit", (req, res, next) => {
  const characterId = req.params.characterId;

  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  axios.post(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`, newDetails)
    .then( newDetails => {
      res.redirect(`/characters/${characterId}`);
    })
    .catch( err => {
      console.log('Error updating character in the API...', err);
    })
});


router.post("/:characterId/delete", (req, res, next) => {
  axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then(() => {
      res.redirect("/characters")
    })
    .catch( err => {
      console.log('Error deleting character in the API...', err);
    })
});

module.exports = router;
