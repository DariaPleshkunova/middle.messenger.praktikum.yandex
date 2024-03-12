import './popup.scss';

export { default as Popup } from './popup.hbs?raw';

export function initPopups() {
    const modalTriggers = document.querySelectorAll('.js-modal-btn');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            const { popupTrigger } = trigger.dataset;
            const popupModal = document.querySelector(`[data-popup="${popupTrigger}"]`);

            openPopup(popupModal)
        })
    });

    function openPopup(modalWindow) {
        const modalOverlay = modalWindow.querySelector('.js-modal-overlay');

        if (modalWindow) {
            modalWindow.classList.add('is-active');
        }

        const closeModal = modalWindow.querySelectorAll('.js-close-modal');

        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                modalWindow.classList.remove('is-active');
            })
        }

        if (closeModal) {
            closeModal.forEach(function (item) {
                    item.addEventListener('click', () => {
                    modalWindow.classList.remove('is-active');
                })
            })
        }
    }
}
