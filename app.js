// import Users from 'users.js'

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
      if (ev === e) {
        return;
      } else {
        ev.classList.add('inactive');
        ev.classList.remove('active');
      }
    });
  });
});
