import './input.scss';

export { default as Input } from './input.hbs?raw';

export function freezeInputLabel() {
  const inputs = document.querySelectorAll('.js-input')

  inputs.forEach(input => {
    if (input.value) {
      input.classList.add('is-active')
    }
  
    input.addEventListener('input', (e) => {
      if (e.target.value) {
        input.classList.add('is-active')
      } else {
        input.classList.remove('is-active')
      }
    })
  })
}
 