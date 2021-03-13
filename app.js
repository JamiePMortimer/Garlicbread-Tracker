import {UserList} from './users.js'
import {SnackList} from './snacks.js'

const menuSelect = document.querySelectorAll('.nav-box');
const mainSelect = document.querySelector('.centre-main');
const mainSection = mainSelect.querySelectorAll('.main-section');
const userBtn = document.querySelector('.main-section.users').querySelector('.add-new');
const snackBtn = document.querySelector('.main-section.snacks').querySelector('.add-new');
const modalBox = document.querySelector('.add-modal');
const modalInputBox = document.querySelector('.modal-input');
const modalInputLabel = modalInputBox.querySelectorAll('label');
const modalInputText = modalInputBox.querySelectorAll('input');
const backdrop = document.querySelector('.backdrop');


// console.log(modalInputText)
userBtn.addEventListener('click', modalSelect)
snackBtn.addEventListener('click', modalSelect)

function modalSelect (type) {
  console.log(type.path[2].classList[1])
  if(type.path[2].classList[1] === 'users'){
    modalInputLabel[0].textContent = 'Name';
    modalInputLabel[1].textContent = 'Age';
    modalDisplay()
  } else if (type.path[2].classList[1] === 'snacks'){
    modalInputLabel[0].textContent = 'Snack';
    modalInputLabel[1].textContent = 'Details';
    modalDisplay()
  } else {return}
}

function modalDisplay () {
modalBox.classList.remove('hide');
backdrop.classList.remove('hide');
}

backdrop.addEventListener('click', () =>{
  backdrop.classList.add('hide');
  modalBox.classList.add('hide');
  modalInputText.forEach( (e) => {
    e.value = ""
  })

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
