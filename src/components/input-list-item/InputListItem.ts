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
}

export class InputListItem extends Block {
  constructor(props: InputListItemProps) {
    super({
      ...props,
      input: new Input({
        name: props.name,
        type: props.type,
        label: props.label,
        required: props.required,
        value: props.value || '',
        isDisabled: props.isDisabled,

        onBlur: (errorText: string) => {
          const errorTextElement = this.children.errorText;

          errorTextElement.setProps({ text: errorText });
        },
      }),

      errorText: new ErrorText({ text: null }),
    });
  }

  render() {
    return `
      <li class="input-list__item">
        {{{ input }}}

        {{{ errorText }}}
      </li>
    `;
  }
}
