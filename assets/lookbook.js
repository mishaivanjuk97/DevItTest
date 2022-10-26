document.querySelectorAll('.lookbook-modal__wrapper').forEach(item => {
   item.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      if(e.target.classList.contains('lookbook-modal__wrapper')) {
         item.classList.remove('show')
      }
   }) 
})

document.querySelectorAll('.lookbook').forEach(item => {
   item.addEventListener('click', (e) => {
      if(!item.classList.contains('show')) {
         item.querySelector('.lookbook-modal__wrapper').classList.add('show')
      }
   })
})