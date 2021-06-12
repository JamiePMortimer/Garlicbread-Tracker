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
  userId: String,
  snack: String,
  snackId: String,
  number: Number,
  date: Date,
};


const Snack = mongoose.model('Snack', snackSchema);
const User = mongoose.model('User', userSchema);
const Eat = mongoose.model('Eat', eatSchema);

app
  .get('/', function (req, res) {
    res.render('home');
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
          userId: user._id,
          snack: snack.name,
          snackId: snack._id,
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
      res.render('users',{users:users, theId:'', lastSnack:'', lastSnackNum:'', topSnacks:[]} );
    })
  })
  .post(function(req,res){
      res.redirect('/users/'+req.body.users)
 
    // Chart of snacks
    // Select a specific snack and see the volume
  });

  app.route('/user-add')
  .get(function(req,res){
    res.render('user-add')
  })
  .post(function(req,res){
    const newUser = new User({
      name: req.body.name,
      age: req.body.age
    });
    newUser.save();
    res.redirect('/user-add')
  })

  app.route('/snacks')
  .get(function(req,res){
    Snack.find(function(err,snacks){
      res.render('snack',{snacks:snacks})
    })
  })
  .post(function(req,res){
    res.redirect('snacks/'+req.body.snacks)
  })

  app.get("/users/:userId", function(req,res){
    User.find(function(err,user){
      Eat.find({userId: req.params.userId},'snack number', {limit: 2,sort:{date: -1}},function(err, eats) {
        if(eats.length === 0){
          res.render('users',{theId:req.params.userId,users:user, lastSnack: "", lastSnackNum: "", topSnacks: ""})
        } else {
        Eat.aggregate([
          {$match: {userId: req.params.userId}},
          {$group: {_id: "$snack", total:{$sum: "$number"}
        },
        }, {$sort: {total: -1}},{$limit: 3}]
        ,function (err,snacks){
            res.render('users',{theId:req.params.userId,users:user, lastSnack: eats[0].snack, lastSnackNum: eats[0].number, topSnacks: snacks})
          })}
      })
    })
  })

app.get("/snacks/:snack", function(req,res){
  Eat.find({snackId: req.params.snack})
  res.send("Working the snack " + req.params.snack)
})

app.listen(3000, function () {
  console.log('Server has started, yo!');
});


