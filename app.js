const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(
  'mongodb+srv://admin-jamie:Test123@cluster0.vzkqh.mongodb.net/garlicBreadDB',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

const snackSchema = {
  name: String,
  description: String,
  imageURL: String,
};

const userSchema = {
  name: String,
  age: Number,
};

const eatSchema = {
  name: String,
  snack: String,
  number: Number,
  date: Date,
};


const Snack = mongoose.model('Snack', snackSchema);
const User = mongoose.model('User', userSchema);
const Eat = mongoose.model('Eat', eatSchema);

app
  .get('/', function (req, res) {
    res.send('Hello');
  })

  app.route('/add')
  .get(function(req,res){

  User.find(function(err,foundUsers){
  Snack.find(function(err,foundSnacks){
    res.render('snack', {
      users: foundUsers,
      snacks: foundSnacks
    })
  })
})
})
  .post(function (req, res) {
    if(req.body.users === "" || req.body.snacks === ""){
      return
    } else {
      Snack.findById(req.body.snacks, function(err, snack){
      User.findById(req.body.users, function(err,user){
        const newEat = new Eat(
{          name: user.name,
          snack: snack.name,
          number: req.body.number,
          date: new Date(),}
        );
        newEat.save();
      })
      })
      res.redirect('/add')
    }
  });

app.route('/users')
  .get(function(req,res){
    User.find(function(err,users){
      res.render('users',{users:users, theId:''} );

    })
  })
  .post(function(req,res){
      res.redirect('/users/'+req.body.users)
 
    // Passed the value into USers
    // Now need to pull (default) out and check if it exists
    // If it exists, check the forEach loop for that entry and make it the default
    // if a value passed in, use this as the default selection
    // render the data for that user
    // Fave snack
    // Last snack
    // Chart of snacks
    // Select a specific snack and see the volume

  })

  app.get("/users/:userId", function(req,res){
    User.find(function(err,users){
      console.log("params.userId: "+req.params.userId);
      console.log("users: "+users[0]._id);
      res.render('users',{theId:req.params.userId,users:users });
    })
  })

app.listen(3000, function () {
  console.log('Server has started, yo!');
});


