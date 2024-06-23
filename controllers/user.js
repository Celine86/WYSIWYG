const db = require("../models"); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const xss = require("xss");

exports.signup = async (req, res, next) => {
  if (req.body.username && req.body.password) {
    try {
      const user = await db.User.findOne({
        where: {username: req.body.username},
      });
      if (user !== null) {
          return res.status(401).json({ error: "Ce pseudonyme est déjà utilisé" });
      } else { 
            const hashed = await bcrypt.hash(req.body.password, 10)
            db.User.create({
            username: xss(req.body.username),
            password: hashed,
          });
          res.status(201).json({ message: "Votre compte est créé. Vous pouvez vous connecter avec votre identifiant et mot de passe !" });
      }
    } catch (error) {
        console.log(error);
        //return error;
    }
  } else {
    return res.status(401).json({ error: "Vous devez renseigner tous les champs pour vous inscrire !" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {username: req.body.username},
    });
    if (user === null) {
      return res.status(401).json({ error: "Connexion impossible, merci de vérifier votre login" });
    } else {
      const hashed = await bcrypt.compare(req.body.password, user.password);
      if (!hashed) {
        return res.status(401).json({ error: "Le mot de passe est incorrect !" });
      } else {
        res.status(200).json({
          message: "Vous êtes connecté",
          username: user.username,
          userId: user.id,
          token: jwt.sign({userId: user.id}, process.env.TOKEN, {expiresIn: '24h'})
      })
      }
    }
  } catch (error) {
      console.log(error);
      //return error;
  }
};