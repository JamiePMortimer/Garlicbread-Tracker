const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

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

app.get('/', function (req, res) {
  let titleList = ["Snack 'n' Track", 'Snacker Tracker'];
  let titleNum = Math.floor(Math.random() * titleList.length);
  let title = titleList[titleNum];
  console.log(titleNum, title);
  res.render('home', { title: title });
});

app
  .route('/add')
  .get(function (req, res) {
    User.find(function (err, foundUsers) {
      Snack.find(function (err, foundSnacks) {
        res.render('add-eats', {
          users: foundUsers,
          snacks: foundSnacks,
        });
      });
    });
  })
  .post(function (req, res) {
    if (req.body.users === '' || req.body.snacks === '') {
      return;
    } else {
      Snack.findById(req.body.snacks, function (err, snack) {
        User.findById(req.body.users, function (err, user) {
          const newEat = new Eat({
            name: user.name,
            userId: user._id,
            snack: snack.name,
            snackId: snack._id,
            number: req.body.number,
            date: new Date(),
          });
          newEat.save();
        });
      });
      res.redirect('/add');
    }
  });

app.route('/dash')
.get(function (req, res) {
  User.find(function (err, foundUsers) {
    Snack.find(function (err, foundSnacks) {
      res.render('chart', {
        users: foundUsers,
        snacks: foundSnacks,
      });
    });
  });
})

app
  .route('/users')
  .get(function (req, res) {
    User.find(function (err, users) {
      res.render('users', {
        users: users,
        theId: '',
        lastSnack: '',
        snackTime: '',
        lastSnackNum: '',
        topSnacks: [],
      });
    });
  })
  .post(function (req, res) {
    res.redirect('/users/' + req.body.users);

    // Chart of snacks
    // Select a specific snack and see the volume
  });

app
  .route('/user-add')
  .get(function (req, res) {
    res.render('user-add');
  })
  .post(function (req, res) {
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
    });
    newUser.save();
    res.redirect('/user-add');
  });

app.route('/snack-add')
.get(function (req, res) {
  res.render('add-snack');
})
.post(function(req,res){
  const newSnack = new Snack({
    name: req.body.name,
    description: req.body.desc,
    imageURL: req.body.url,
  })
  newSnack.save();
  res.redirect('/snack-add');
});

app
  .route('/snacks')
  .get(function (req, res) {
    Snack.find(function (err, snacks) {
      res.render('snack', {
        snacks: snacks,
        theId: '',
        lastUser: '',
        lastUserNum: '',
        topUser: [],
      });
    });
  })
  .post(function (req, res) {
    res.redirect('snacks/' + req.body.snacks);
  });

app.get('/users/:userId', function (req, res) {
  User.find(function (err, user) {
    Eat.find(
      { userId: req.params.userId },
      'snack number date',
      { limit: 2, sort: { date: -1 } },
      function (err, eats) {
        if (eats.length === 0) {
          res.render('users', {
            theId: req.params.userId,
            users: user,
            lastSnack: '',
            lastSnackNum: '',
            topSnacks: '',
          });
        } else {
          Eat.aggregate(
            [
              { $match: { userId: req.params.userId } },
              { $group: { _id: '$snack', total: { $sum: '$number' } } },
              { $sort: { total: -1 } },
              { $limit: 3 },
            ],
            function (err, snacks) {
              let thisOne = new Date();
              let gap = Math.round(
                (thisOne - eats[0].date) / 1000 / 60 / 60 / 24
              );
              if (gap < 8) {
                let snackDay = days[eats[0].date.getDay()];
                res.render('users', {
                  theId: req.params.userId,
                  users: user,
                  snackTime: snackDay,
                  lastSnack: eats[0].snack,
                  lastSnackNum: eats[0].number,
                  topSnacks: snacks,
                });
              } else {
                let snackDay =
                  months[eats[0].date.getMonth()] + ' ' + eats[0].date.getDay();
                res.render('users', {
                  theId: req.params.userId,
                  users: user,
                  snackTime: snackDay,
                  lastSnack: eats[0].snack,
                  lastSnackNum: eats[0].number,
                  topSnacks: snacks,
                });
              }
            }
          );
        }
      }
    );
  });
});

app.get('/snacks/:snackId', function (req, res) {
  Snack.find(function (err, snack) {
    console.log(snack);
    Eat.find(
      { snackId: req.params.snackId },
      'snack number name date',
      { limit: 1, sort: { date: -1 } },
      function (err, eats) {
        console.log(eats);
        if (eats.length === 0) {
          res.render('snack', {
            theId: req.params.snackId,
            snacks: snack,
            lastUser: '',
            lastUserNum: '',
            topUser: '',
          });
        } else {
          Eat.aggregate(
            [
              { $match: { snackId: req.params.snackId } },
              { $group: { _id: '$name', total: { $sum: '$number' } } },
              { $sort: { total: -1 } },
              { $limit: 3 },
            ],
            function (err, users) {
              console.log(users);
              res.render('snack', {
                theId: req.params.snackId,
                snacks: snack,
                lastUser: eats[0].name,
                lastUserNum: eats[0].number,
                topUsers: users,
              });
            }
          );
        }
      }
    );
  });
});

app.listen(3000, function () {
  console.log('Server has started, yo!');
});
