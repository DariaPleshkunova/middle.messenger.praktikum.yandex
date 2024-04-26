import Block from '../../utils/Block';

interface ErrorTextProps {
  text?: string | null,
}

export class ErrorText extends Block {
  constructor(props: ErrorTextProps) {
    super({
      ...props,
      text: null,
    });
  }

  componentDidUpdate(oldProps: ErrorTextProps, newProps: ErrorTextProps) {
    if (oldProps.text !== newProps.text) {
      this.setProps({ text: newProps.text });
    }

    return true;
  }

  componentDidMount(): void {
    this.hide();
  }

  render() {
    return `
      <span class="error-text"> {{ text }} </span> 
    `;
  }
}
