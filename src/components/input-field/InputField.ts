import Block from '../../utils/Block';
import validateInput from '../../utils/validateInput';

interface InputFieldProps {
  className?: string,
  errorClass?: string | null,
  type: string,
  name: string,
  placeholder?: string,
  required?: boolean,
  value?: string,
  inputValue?: string,
  isDisabled?: boolean,
  onBlur?: (value: string) => void,
  skipValidation?: boolean,
  isErrored?: boolean,
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      events: {
        blur: () => {
          if (!this.props.skipValidation) {
            const validationResult = this.validate();

            if (validationResult) {
              const { errorText } = validationResult;

              if (this.props.onBlur && typeof this.props.onBlur === 'function') {
                this.props.onBlur(errorText);
              }
            }
          }
        },
      },

      isErrored: false,
      isDisabled: props.isDisabled || false,
      activeClass: '',
      skipValidation: props.skipValidation || false,
      inputValue: props.value,
    });
  }

  validate() {
    const inputElement = this.getContent() as HTMLInputElement;

    if (!inputElement) {
      return { isValidated: false, errorText: 'Input element is null' };
    }

    const validationResult = validateInput(inputElement);

    if (validationResult) {
      const { isValidated, errorText } = validationResult;

      this.props.inputValue = inputElement.value;
      this.props.isErrored = !isValidated;

      return { isValidated, errorText };
    }

    return null;
  }

  freezeInputLabel() {
    this.setProps({
      activeClass: this.props.inputValue ? 'is-active' : '',
    });
  }

  componentDidMount() {
    this.freezeInputLabel();

    return true;
  }

  componentDidUpdate(oldProps: InputFieldProps, newProps:InputFieldProps) {
    this.freezeInputLabel();

    if (oldProps.isErrored !== newProps.isErrored) {
      this.setProps({ isErrored: newProps.isErrored });
    }

    if (oldProps.inputValue !== newProps.inputValue) {
      this.setProps({ inputValue: newProps.inputValue });
    }

    if (oldProps.isDisabled !== newProps.isDisabled) {
      this.setProps({ isDisabled: newProps.isDisabled });
    }

    if (oldProps.type !== newProps.type) {
      this.setProps({ type: newProps.type });
    }

    return true;
  }

  render() {
    return `
      <input class="input-field {{className}} {{activeClass}} {{#if isErrored}}is-errored{{/if}}" type="{{type}}" name="{{name}}" 
      {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
      {{#if required}} required {{/if}}
      {{#if inputValue}}value="{{inputValue}}"{{/if}}
      {{#if isDisabled}}disabled{{/if}}>
    `;
  }
}
