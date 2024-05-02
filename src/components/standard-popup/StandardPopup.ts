import { Button } from '../button';
import { Heading } from '../heading';
import { Link } from '../link';
import { Popup } from '../popup';
import { Form } from '../form';
import { Input } from '../input';

interface StandardPopupProps {
  headingText: string;
  inputs?: Input[];
  onSubmit?: (data: unknown) => Promise<void>;
  submitButtonClass: string,
  submitButtonText: string,
  dataPopup?: string,
  imageInputName?: string,
}

export class StandardPopup extends Popup {
  constructor(props: StandardPopupProps) {
    super({
      ...props,

      heading: new Heading({
        text: props.headingText,
      }),

      form: new Form({
        submitButton: new Button({
          className: props.submitButtonClass,
          type: 'submit',
          text: props.submitButtonText,
        }),

        inputs: props.inputs,

        imageInputName: props.imageInputName,

        cancelButton: new Link({
          className: 'js-close-modal',
          text: 'Cancel',
        }),

        onSubmit: props.onSubmit,
      }),
    });
  }

  componentDidMount(): void {
    this.children.form.setProps({ ismounted: true });
  }

  render() {
    const parentRender = super.render();

    return parentRender.replace('{{dataPopup}}', '{{ dataPopup }}').replace('{{ popupContent }}', `
      {{{ heading }}}

      {{{ form }}}
    `);
  }
}
