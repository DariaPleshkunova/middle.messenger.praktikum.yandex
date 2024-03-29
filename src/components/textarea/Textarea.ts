import Block from '../../utils/Block';

interface TextareaProps {
  className?: string,
  name?: string,
  placeholder?: string,
}

export class Textarea extends Block {
  constructor(props: TextareaProps) {
    super({
      ...props,
      events: {
        keyup: () => {
          const textarea = this.getContent() as HTMLTextAreaElement | null;
          if (textarea) {
            const textareaValue = textarea.value;
            const numberOfLineBreaks = (textareaValue.match(/\n/g) || []).length;
            const newHeight = 16 + numberOfLineBreaks * 16 + 24;

            textarea.style.height = `${newHeight} px`;
          }
        },
      },
    });
  }

  render() {
    return `
      <textarea class="textarea ${this.props.className || ''}" name="${this.props.name || ''}" 
                  placeholder="${this.props.placeholder || ''}"></textarea>
    `;
  }
}
