import Block from '../../utils/Block';
import { Textarea } from '../textarea';
import { Avatar } from '../avatar';
import { Heading } from '../heading';
import { Button } from '../button';
import { Link } from '../link';
import { Input } from '../input';
import { Indexed } from '../../types';

interface FormProps {
  className?: string,
  id?: string,
  isProfileForm?: boolean,
  buttonsWrapperClass?: string,
  onSubmit?(prop: any): void,
  textarea?: Textarea,
  avatar?: Avatar,
  heading?: Heading,
  submitButton?: Button,
  cancelButton?: Link,
  inputs?: Input[],
  emptyInputsAfterSubmit?: boolean,
  events?: Indexed,
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const inputs = this.lists.inputs;
          const textarea = this.children.textarea;

          if (inputs) {
            inputs.forEach((input) => {
              input.props.onSubmit();
              const inputFieldElement = input.children.inputField.getContent();
              this.getFormContent(inputFieldElement);

              if (props.emptyInputsAfterSubmit) {
                inputFieldElement.value = '';
              }
            });
          }

          if (textarea) {
            const textareaElement = textarea.getContent() as HTMLTextAreaElement;

            if (textareaElement) {
              this.getFormContent(textareaElement);
              textareaElement.value = '';
            }
          }

          if (props.onSubmit) {
            props.onSubmit(this.formData);
          }
        },
      },
    });
  }

  formData: { [key: string]: string } = {};

  getFormContent(target: HTMLInputElement | HTMLTextAreaElement): void {
    const name = target.name;
    const value = target.value;
    this.formData[name] = value;
  }

  componentDidMount(): void {
    const formElement = this.getContent();
    const avatar = this.children.avatar;

    const input = formElement?.querySelector('.profile-popup__avatar-input');
    input?.addEventListener('input', (e: InputEvent) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target?.result;
        avatar.setProps({ imageUrl });
      };

      const target = e.target;

      if (target instanceof HTMLInputElement && target.files?.length) {
        reader.readAsDataURL(target.files[0]);
      }
    });
  }

  render() {
    return ` 
      <form action="#" class="form {{className}}" id={{id}}>
        {{#if isProfileForm}}
          <div class="flex-column flex-column_align-center">
            <label class="profile-popup__avatar-container">
              {{{ avatar }}}
              <div class="profile-popup__avatar-cover js-avatar-cover">Change avatar</div> 

              <input class="visually-hidden profile-popup__avatar-input" type="file" name="avatar" accept="image/*" disabled>
            </label>

            {{{ heading }}}
          </div>
        {{/if}}

        {{#if inputs}}
          <div class="inputs-wrapper">
            {{{ inputs }}}
          </div>
        {{/if}}

        <div class="buttons-wrapper {{buttonsWrapperClass}}">
          {{{ submitButton }}}
          
          {{{ cancelButton }}}
        </div>
      </form>     
    `;
  }
}
