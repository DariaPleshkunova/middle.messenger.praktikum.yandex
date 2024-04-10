import Block from '../../utils/Block';
import { Input } from '../input';
import { ErrorText } from '../error-text';

interface InputListItemProps {
  name: string,
  type: string,
  label?: string,
  required?: boolean,
  value?: null | string,
  isDisabled?: boolean,
  isErrored?: boolean,
}

export class InputListItem extends Block {
  constructor(props: InputListItemProps) {
    super({
      ...props,
      input: new Input({
        ...props,
        value: props.value || '',

        onBlur: (errorText: string) => {
          const errorTextElement = this.children.errorText;

          errorTextElement.setProps({ text: errorText });

          this.isErrored = !!errorText;
        },
      }),

      onSubmit: () => {
        const inputField = this.children.input.children.inputField;
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
      <li class="input-list__item">
        {{{ input }}}

        {{{ errorText }}}
      </li>
    `;
  }
}
