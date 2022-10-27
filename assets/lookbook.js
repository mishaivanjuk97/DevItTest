document.querySelectorAll('.lookbook-modal__wrapper').forEach(item => {
   item.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      e.target.classList.contains('lookbook-modal__wrapper') ? item.classList.remove('show') : null;
   }) 
})

document.querySelectorAll('.lookbook').forEach(item => {
   item.addEventListener('click', (e) => {
      !item.classList.contains('show') ? item.querySelector('.lookbook-modal__wrapper').classList.add('show') : null;
   })
})

document.querySelectorAll('.lookbook-product__select select').forEach(item => {
   item.addEventListener('change', (e) => {
      e.target.closest('.lookbook-product__variant-selector').setAttribute('data-selected-variant', JSON.parse(e.target.closest('.lookbook-product__variant-selector').querySelector('#productVariants').innerHTML).filter(variant => variant.title === e.target.value)[0].id)
   })
})

document.querySelectorAll('.add-to-cart-button').forEach(button => {
   button.addEventListener('click', (e) => {
      e.target.innerHTML = 'Adding...';

      const actionsWrapper = e.target.closest('.lookbook-product__actions');
      const selectedVariant = actionsWrapper.querySelector('.lookbook-product__variant-selector').getAttribute('data-selected-variant');
      console.log('selectedVariant', selectedVariant)
      let formData = {
         'items': [{
          'id': selectedVariant,
          'quantity': 1
          }]
        };
      fetch(window.Shopify.routes.root + 'cart/add.js', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
         e.target.innerHTML = 'Add to bag';
         if(data.message === "Cart Error"){
            e.target.innerHTML = data.description;
         }
      })
      .catch((error) => {
         console.error('Error:', error);
      });
   })
})