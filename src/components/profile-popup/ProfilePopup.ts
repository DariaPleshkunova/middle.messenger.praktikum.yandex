import { Avatar } from '../avatar';
import { Button } from '../button';
import { ErrorText } from '../error-text';
import { Heading } from '../heading';
import { Link } from '../link';
import { Popup } from '../popup';
import { InputListItem } from '../input-list-item';
import { Form } from '../form';

export class ProfilePopup extends Popup {
  constructor() {
    super({
      editProfileButton: new Link({
        className: 'link_has-icon',
        text: 'Edit profile',
        iconId: '#pencil',
        iconClass: 'icon icon_16',
        onClick: () => {
          const inputItems = this.children.form.lists.inputItems;

          inputItems.forEach((item) => {
            const inputField = item.children.input.children.inputField;
            inputField.setProps({ isDisabled: false });
          });

          this.profileFormButtons?.classList.add('is-active');
          this.profileButtons?.classList.remove('is-active');
        },
      }),

      logOutButton: new Link({
        className: 'link_has-icon text_danger',
        text: 'Log out',
        iconId: '#exit',
        iconClass: 'icon-stroke icon_16',
      }),

      form: new Form({
        className: 'js-profile-form',
        id: 'edit-profile-form',
        isProfileForm: true,

        avatar: new Avatar({ className: 'avatar_viewtype_person profile-popup__avatar' }),
        errorText: new ErrorText({ text: 'Error' }),
        heading: new Heading({ text: 'John Smith' }),

        buttonsWrapperClass: 'profile-popup__form-buttons js-profile-form-buttons',
        submitButton: new Button({ className: 'button_success js-profile-form-submit', type: 'submit', text: 'Save changes' }),
        cancelButton: new Link({ className: 'js-profile-form-cancel', text: 'Cancel' }),
        inputItems: [
          new InputListItem({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
            value: 'MyLogin',
            isDisabled: true,
          }),
          new InputListItem({
            name: 'first_name',
            type: 'text',
            label: 'Name',
            required: true,
            value: 'Bill',
            isDisabled: true,
          }),
          new InputListItem({
            name: 'second_name',
            type: 'text',
            label: 'Last Name',
            required: true,
            value: 'Marks',
            isDisabled: true,
          }),
          new InputListItem({
            name: 'email',
            type: 'email',
            label: 'E-mail',
            required: true,
            value: 'myemail@mail.com',
            isDisabled: true,
          }),
          new InputListItem({
            name: 'phone',
            type: 'tel',
            label: 'Phone number',
            required: true,
            value: '+75729927766',
            isDisabled: true,
          }),
          new InputListItem({
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
            value: 'Qwerty123',
            isDisabled: true,
          }),
          new InputListItem({
            name: 'confirm_password',
            type: 'password',
            label: 'Confirm Password',
            value: 'Qwerty123',
            isDisabled: true,
          }),
        ],

        onSubmit: () => {
          const inputItems = this.children.form.lists.inputItems;

          inputItems.forEach((item) => {
            const inputField = item.children.input.children.inputField;
            inputField.setProps({ isDisabled: true });
          });

          this.profileFormButtons?.classList.remove('is-active');
          this.profileButtons?.classList.add('is-active');
        },
      }),
    });
  }

  profileFormButtons = this.getContent()?.querySelector('.js-profile-form-buttons');

  profileButtons = this.getContent()?.querySelector('.js-profile-buttons');

  render() {
    const parentRender = super.render();

    return parentRender.replace('{{dataPopup}}', 'profile').replace('{{ popupContent }}', `
      <div class="profile-popup">
        {{{ form }}}
      </div>

      <div class="buttons-wrapper profile-popup__buttons js-profile-buttons is-active">
        {{{ editProfileButton }}}
        {{{ logOutButton }}}
      </div>
    `);
  }
}
