import { Avatar } from '../avatar';
import { Button } from '../button';
import { Heading } from '../heading';
import { Link } from '../link';
import { Popup } from '../popup';
import { Input } from '../input';
import { Form } from '../form';
import Block from '../../utils/Block';

import connect from '../../utils/connect';
import authController from '../../controllers/authController';
import userController from '../../controllers/userController';

import store from '../../utils/Store';

import { Indexed, PageProps, UserState } from '../../types';

export class ProfilePopup extends Popup {
  constructor(props: PageProps) {
    super({
      ...props,

      editPasswordButton: new Link({
        className: 'link_has-icon js-modal-btn',
        dataPopup: 'edit-password',
        text: 'Edit password',
        iconId: '#pencil',
        iconClass: 'icon icon_16',
      }),

      editProfileButton: new Link({
        className: 'link_has-icon',
        text: 'Edit profile',
        iconId: '#pencil',
        iconClass: 'icon icon_16',
        onClick: () => {
          const form = this.children.form;
          const formElement = form.getContent();
          const inputs = form.lists.inputs;

          inputs.forEach((item) => {
            const inputField = item.children.inputField;
            inputField.setProps({ isDisabled: false });
          });

          const avatarCover = formElement?.querySelector('.js-avatar-cover');
          avatarCover?.classList.add('is-active');
          const avatarInput = formElement?.querySelector('input[name="avatar"]') as HTMLInputElement;

          if (avatarInput) {
            avatarInput.disabled = false;
          }

          this.profileFormButtons?.classList.add('is-active');
          this.profileButtons?.classList.remove('is-active');
          this.profileButton?.classList.add('is-active');
        },
      }),

      logOutButton: new Link({
        className: 'link_has-icon text_danger',
        text: 'Log out',
        iconId: '#exit',
        iconClass: 'icon-stroke icon_16',
        onClick: async () => {
          const isSuccess = await authController.logOut();

          if (isSuccess) {
            this.setProps({ isActive: false });
            props.routeHandlers.onLoginRoute();
          }
        },
      }),

      form: new Form({
        className: 'js-profile-form',
        id: 'edit-profile-form',
        isProfileForm: true,

        avatar: new Avatar({
          className: 'avatar_viewtype_person profile-popup__avatar',
        }),

        heading: new Heading({ text: 'Name' }),

        buttonsWrapperClass: 'profile-popup__form-buttons js-profile-form-buttons',
        submitButton: new Button({ className: 'button_success js-profile-form-submit', type: 'submit', text: 'Save changes' }),
        cancelButton: new Link({ className: 'js-profile-form-cancel', text: 'Cancel' }),
        inputs: [
          new Input({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
            isDisabled: true,
          }),
          new Input({
            name: 'first_name',
            type: 'text',
            label: 'Name',
            required: true,
            isDisabled: true,
          }),
          new Input({
            name: 'second_name',
            type: 'text',
            label: 'Last Name',
            required: true,
            isDisabled: true,
          }),
          new Input({
            name: 'email',
            type: 'email',
            label: 'E-mail',
            required: true,
            isDisabled: true,
          }),
          new Input({
            name: 'phone',
            type: 'tel',
            label: 'Phone number',
            required: true,
            isDisabled: true,
          }),
        ],

        onSubmit: async (data) => {
          const form = this.children.form;
          const formElement = form.getContent();
          const avatarInput = formElement?.querySelector('input[name="avatar"]') as HTMLInputElement;
          const avatarFile = avatarInput.files ? avatarInput.files[0] : null;

          const isEditProfileSuccess = await userController.editProfile(data as Record<string, unknown>);
          const isEditAvatarSuccess = await userController.editAvatar(avatarFile);

          if (isEditProfileSuccess && isEditAvatarSuccess) {
            const inputs = form.lists.inputs;

            inputs.forEach((input) => {
              const inputField = input.children.inputField;
              inputField.setProps({ isDisabled: true });
            });

            const avatarCover = formElement?.querySelector('.js-avatar-cover');
            avatarCover?.classList.remove('is-active');

            avatarInput.disabled = true;

            this.profileFormButtons?.classList.remove('is-active');
            this.profileButtons?.classList.add('is-active');
          }
        },
      }),

      onHideModal: () => {
        store.set('popup.profile', false);

        if (props.routeHandlers) {
          props.routeHandlers.onChatsRoute();
        }

        this.setProps({ isActive: false });
      },
    });
  }

  componentDidUpdate(oldProps: PageProps, newProps: PageProps): boolean {
    if (oldProps.isActive !== newProps.isActive) {
      this.setProps({ isActive: newProps.isActive });
    }

    return true;
  }

  profileFormButtons = this.getContent()?.querySelector('.js-profile-form-buttons');

  profileButtons = this.getContent()?.querySelector('.js-profile-buttons');

  profileButton = this.getContent()?.querySelector('.js-profile-button');

  render() {
    const parentRender = super.render();

    const form = this.children.form;
    form.children.heading.setProps({ text: this.props.first_name });

    form.lists.inputs.forEach((input) => {
      const inputField = input.children.inputField;
      const inputName = inputField.props.name;
      const inputValue = this.props[inputName];

      inputField.setProps({
        inputValue,
      });
    });

    if (this.props.avatar) {
      form.children.avatar.setProps({ imageUrl: this.props.avatar });
    }

    return parentRender.replace('{{dataPopup}}', 'profile').replace('{{ popupContent }}', `
      <div class="profile-popup">
        {{{ form }}}
      </div>

      <div class="buttons-wrapper profile-popup__buttons js-profile-buttons is-active">
        {{{ editPasswordButton }}}
        {{{ editProfileButton }}}
        {{{ logOutButton }}}
      </div>

      <div class="buttons-wrapper profile-popup__buttons js-profile-button">
        abc
      </div>
    `);
  }
}

function mapUserToProps(state: Indexed) {
  const userState = state.user as UserState;
  const popupState = state.popup as Record<string, boolean>;
  let profileIsActive = false;

  if (popupState) {
    profileIsActive = popupState.profile;
  }

  if (userState) {
    return {
      id: userState.id,
      login: userState.login,
      first_name: userState.first_name,
      second_name: userState.second_name,
      avatar: userState.avatar,
      email: userState.email,
      phone: userState.phone,
      isActive: profileIsActive,
    };
  }
}

export default connect(ProfilePopup as typeof Block, mapUserToProps);
