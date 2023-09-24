const db = require("../models");
const bcrypt = require("bcrypt");
require('dotenv').config();

function firstUser(req, res) {
  db.User.findOne({ where: { username: "liline57" } })
    .then((user) => {
      if (!user) {
        bcrypt.hash(process.env.FIRSTUSERPASSWORD, 10)
          .then((hash) => {
            db.User.create({
              username: "liline57",
              password: hash,
            })
              .then((firstuser) => {
                console.log({ message: `Le compte ${firstuser.username} a été créé!`,});
              })
              .catch((error) => { 
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "le compte existe déjà" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = firstUser();