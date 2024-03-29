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
        name: props.name,
        type: props.type,
        className: 'input__field',
        required: props.required,
        value: props.value,
        onBlur: props.onBlur,
        isDisabled: props.isDisabled,
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
