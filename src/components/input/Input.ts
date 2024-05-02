import Block from '../../utils/Block';
import { InputField } from '../input-field';
import { ErrorText } from '../error-text';

interface InputProps {
  className?: string,
  label?: string,
  name: string,
  type: string,
  required?: boolean,
  isDisabled?: boolean,
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      inputField: new InputField({
        ...props,
        className: 'input__field',

        onBlur: (errorText: string) => {
          const errorTextElement = this.children.errorText;

          errorTextElement.setProps({ text: errorText });
          this.isErrored = !!errorText;

          if (this.isErrored) {
            errorTextElement.show();
          } else {
            errorTextElement.hide();
          }
        },
      }),

      onSubmit: () => {
        const inputField = this.children.inputField;
        inputField.getContent()?.blur();

        if (this.isErrored) {
          throw new Error('Input value is not valid');
        }
      },

      errorText: new ErrorText({ text: null }),
    });
  }

  isErrored: boolean = false;

  render() {
    return `
      <label class="input">
        {{{ inputField }}}
        
        <span class="input__label"> {{ label }} </span>

        {{{ errorText }}}
      </label>
    `;
  }
}
