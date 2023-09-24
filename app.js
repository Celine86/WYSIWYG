require('dotenv').config();
const express = require('express'); 
const helmet = require('helmet');
const app = express();
const path = require("path");

const db = require("./models/index")
db.sequelize.sync().then(function () {
  require("./seeders/firstuser");
})

// Sync Tables and force modifications 
// Note, set force to true if error "Too many keys specified; max 64 keys allowed"
//db.sequelize.sync({ alter: true, force: false })


app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/images', require('./routes/image'));

module.exports = app;
