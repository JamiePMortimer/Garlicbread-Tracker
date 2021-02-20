import {UserList} from './users.js'
import {SnackList} from './snacks.js'

const menuSelect = document.querySelectorAll('.nav-box');
const mainSelect = document.querySelector('.centre-main');
const mainSection = mainSelect.querySelectorAll('.main-section');

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

function store () {
document.cookie = 'Note=Boop'
}