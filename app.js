require('dotenv').config();
const express = require('express'); 
const helmet = require('helmet');
const app = express();
const path = require("path");

const db = require("./models/index")
db.sequelize.sync().then(function () {
  require("./seeders/firstuser");
})

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb', extended: true }))


//app.use(express.urlencoded({extended: true }))
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/images', require('./routes/image'));

module.exports = app;
