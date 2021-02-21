import {UserList} from './users.js'
import {SnackList} from './snacks.js'

const menuSelect = document.querySelectorAll('.nav-box');
const mainSelect = document.querySelector('.centre-main');
const mainSection = mainSelect.querySelectorAll('.main-section');
const userBtn = document.querySelector('.main-section.users').querySelector('.add-new');
const snackBtn = document.querySelector('.main-section.snacks').querySelector('.add-new');
const modalBox = document.querySelector('.add-modal');
const backdrop = document.querySelector('.backdrop');

userBtn.addEventListener('click', modalSelect)
snackBtn.addEventListener('click', modalSelect)

function modalSelect (type) {
  if(type.path[2].classList[1] === 'users'){
    // console.log('This is Users')
    modalDisplay()
  } else if (type.path[2].classList[1] === 'snacks'){
    console.log('This is Snacks')
  } else {return}
}

function modalDisplay (type) {
modalBox.classList.remove('hide');
backdrop.classList.remove('hide');
}

backdrop.addEventListener('click', () =>{
  backdrop.classList.add('hide');
  modalBox.classList.add('hide');
  

})

menuSelect.forEach((e) => {
  e.addEventListener('click', () => {
    e.removeAttribute('inactive');
    e.classList.add('active');
    mainSection.forEach((evnt) => {
      if (evnt.classList[1] === e.classList[1]) {
        evnt.classList.remove('hide');
      } else {
        evnt.classList.add('hide');
      }
    });
    menuSelect.forEach((ev) => {
      if (ev.classList[1] === e.classList[1]) {
        ev.classList.remove('inactive');
      } else {
        ev.classList.add('inactive');
        ev.classList.remove('active');
      }
    });
  });
});

const userList = new UserList();
userList.render('users');
const snackList = new SnackList();
snackList.render('snacks');

// function store () {
// document.cookie = 'Note=Boop'
// }

