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
      const newEat = {
        name: req.body.users,
        snack: req.body.snacks,
        number: req.body.number,
        date: new Date(),
      };
      console.log(newEat);
      res.redirect('/add')
    }
  });

// import {UserList} from './users.js'
// import {SnackList} from './snacks.js'

// const menuSelect = document.querySelectorAll('.nav-box');
// const mainSelect = document.querySelector('.centre-main');
// const mainSection = mainSelect.querySelectorAll('.main-section');
// const userBtn = document.querySelector('.main-section.users').querySelector('.add-new');
// const snackBtn = document.querySelector('.main-section.snacks').querySelector('.add-new');
// const modalBox = document.querySelector('.add-modal');
// const modalInputBox = document.querySelector('.modal-input');
// const modalInputLabel = modalInputBox.querySelectorAll('label');
// const modalInputText = modalInputBox.querySelectorAll('input');
// const backdrop = document.querySelector('.backdrop');

// console.log(modalInputText)
// userBtn.addEventListener('click', modalSelect)
// snackBtn.addEventListener('click', modalSelect)

// function modalSelect (type) {
//   console.log(type.path[2].classList[1])
//   if(type.path[2].classList[1] === 'users'){
//     modalInputLabel[0].textContent = 'Name';
//     modalInputLabel[1].textContent = 'Age';
//     modalDisplay()
//   } else if (type.path[2].classList[1] === 'snacks'){
//     modalInputLabel[0].textContent = 'Snack';
//     modalInputLabel[1].textContent = 'Details';
//     modalDisplay()
//   } else {return}
// }

// function modalDisplay () {
// modalBox.classList.remove('hide');
// backdrop.classList.remove('hide');
// }

// backdrop.addEventListener('click', () =>{
//   backdrop.classList.add('hide');
//   modalBox.classList.add('hide');
//   modalInputText.forEach( (e) => {
//     e.value = ""
//   })

// })

// menuSelect.forEach((e) => {
//   e.addEventListener('click', () => {
//     e.removeAttribute('inactive');
//     e.classList.add('active');
//     mainSection.forEach((evnt) => {
//       if (evnt.classList[1] === e.classList[1]) {
//         evnt.classList.remove('hide');
//       } else {
//         evnt.classList.add('hide');
//       }
//     });
//     menuSelect.forEach((ev) => {
//       if (ev.classList[1] === e.classList[1]) {
//         ev.classList.remove('inactive');
//       } else {
//         ev.classList.add('inactive');
//         ev.classList.remove('active');
//       }
//     });
//   });
// });

// const userList = new UserList();
// userList.render('users');
// const snackList = new SnackList();
// snackList.render('snacks');

app.listen(3000, function () {
  console.log('Server has started, yo!');
});
