const menuSelect = document.querySelectorAll('.nav-box');

menuSelect.forEach(e => {
  e.addEventListener('click', ()=>{
      e.classList.remove('inactive')
      e.classList.add('active')
      menuSelect.forEach(ev => {
        if(ev === e){
          return
        } else {
          ev.classList.add('inactive')
          ev.classList.remove('active')
        }
      })
  })
})
