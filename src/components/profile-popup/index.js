import './profile-popup.scss';

export { default as ProfilePopup } from './profile-popup.hbs?raw';

export function toggleProfilePopup() {
  const profilePopup = document.querySelector('.js-popup[data-popup="profile"]')
  
  if (profilePopup) {
    const editButton = profilePopup.querySelector('.js-edit-profile');
    const profileButtons = profilePopup.querySelector('.js-profile-buttons');
  
    const profileForm = profilePopup.querySelector('.js-profile-form');
    const profileFormButtons = profilePopup.querySelector('.js-profile-form-buttons');
    const profileFormSubmit = profilePopup.querySelector('.js-profile-form-submit');
    const profileFormCancel = profilePopup.querySelector('.js-profile-form-cancel');
  
    const inputs = profileForm.querySelectorAll('input');
  
    editButton.addEventListener('click', (e) => {
      e.preventDefault();
  
      profileForm.classList.add('is-active');
      profileFormButtons.classList.add('is-active');
      profileButtons.classList.add('is-hidden');
  
      blockInputs();
    })
  
    const profileFormHandlers = [profileFormSubmit, profileFormCancel]
  
    profileFormHandlers.forEach(handler => {
      handler.addEventListener('click', (e) => {
        e.preventDefault();
  
        profileForm.classList.remove('is-active');
        profileFormButtons.classList.remove('is-active');
        profileButtons.classList.remove('is-hidden');
  
        blockInputs();
      })
    })
  
    blockInputs();
  
    function blockInputs() {
      if (!profileForm.classList.contains('is-active')) {
        inputs.forEach(input => {
          input.disabled = true;
        }) 
      } else {
        inputs.forEach(input => {
          input.disabled = false;
        }) 
      }
    }
  }
}
