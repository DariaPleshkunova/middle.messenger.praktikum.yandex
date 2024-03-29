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
  onSubmit?(e: Event): void,
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

          let formData: { [key: string]: string } = {};
          let allInputsValid: boolean = true;

          const inputs = this.lists.inputItems;
          const textarea = this.children.textarea;

          if (inputs) {
            for (const inputListItem of inputs) {
              const inputField = inputListItem.children.input.children.inputField;
              const inputFieldElement = inputField.getContent();
              const { isValidated, errorText } = inputField.validate();

              inputListItem.children.errorText.setProps({ text: errorText });

              if (isValidated) {
                const name = inputFieldElement.name;
                const value = inputFieldElement.value;
                formData[name] = value;
              } else {
                allInputsValid = false;
                formData = {};
                break;
              }
            }
          }

          if (textarea) {
            const textareaElement = textarea.getContent() as HTMLTextAreaElement;

            if (textareaElement) {
              const name = textareaElement.name;
              const value = textareaElement.value;
              formData[name] = value;
            }
          }

          if (allInputsValid) {
            console.log(formData);
          } else {
            throw new Error('Wrong input data');
          }

          if (props.onSubmit) {
            props.onSubmit(e);
          }
        },
      },
    });
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
