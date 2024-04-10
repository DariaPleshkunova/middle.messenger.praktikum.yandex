import Block from '../../utils/Block';
import { InputField } from '../input-field';

interface InputProps {
  className?: string,
  label?: string,
  name: string,
  type: string,
  required?: boolean,
  value?: string,
  isDisabled?: boolean,
  onBlur?: (value: string) => void,
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      inputField: new InputField({
        ...props,
        className: 'input__field',
      }),
    });
  }

  render() {
    return `
      <label class="input">
        {{{ inputField }}}
        
        <span class="input__label"> {{ label }} </span>
      </label>
    `;
  }
}
