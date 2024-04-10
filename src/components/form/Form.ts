import Block from '../../utils/Block';
import { Textarea } from '../textarea';
import { Avatar } from '../avatar';
import { ErrorText } from '../error-text';
import { Heading } from '../heading';
import { Button } from '../button';
import { Link } from '../link';
import { InputListItem } from '../input-list-item';

interface FormProps {
  className?: string,
  id?: string,
  isProfileForm?: boolean,
  buttonsWrapperClass?: string,
  onProfileFormSubmit?(e: Event): void,
  textarea?: Textarea,
  avatar?: Avatar,
  errorText?: ErrorText,
  heading?: Heading,
  submitButton?: Button,
  cancelButton?: Link,
  inputItems?: InputListItem[],
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const inputs = this.lists.inputItems;
          const textarea = this.children.textarea;

          if (inputs) {
            inputs.forEach((inputListItem) => {
              inputListItem.props.onSubmit();
              const inputFieldElement = inputListItem.children.input.children.inputField.getContent();
              this.getFormContent(inputFieldElement);
            });
          }

          if (textarea) {
            const textareaElement = textarea.getContent() as HTMLTextAreaElement;

            if (textareaElement) {
              this.getFormContent(textareaElement);
            }
          }

          console.log(this.formData);

          if (props.onProfileFormSubmit) {
            props.onProfileFormSubmit(e);
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

  render() {
    return ` 
      <form action="#" class="form {{className}}" id={{id}}>
        {{#if isProfileForm}}
          <div class="flex-column flex-column_align-center">
            <div class="profile-popup__avatar-container">
              <label>
                {{{ avatar }}}

                <input class="visually-hidden profile-popup__avatar-input" type="file">
                <div class="profile-popup__avatar-cover">Change avatar</div> 
              </label>

              {{{ errorText }}}
            </div>

            {{{ heading }}}
          </div>
        {{/if}}

        <ul class="input-list">
          {{{ inputItems }}}
        </ul>

        <div class="buttons-wrapper {{buttonsWrapperClass}}">
          {{{ submitButton }}}
          
          {{{ cancelButton }}}
        </div>
      </form>     
    `;
  }
}
