import { Indexed } from '../../types';
import { Form } from '../form';
import { Textarea } from '../textarea';

interface MessageFormProps {
  onSubmit: (data: Indexed) => void;
}

export class MessageForm extends Form {
  constructor(props: MessageFormProps) {
    super({
      ...props,
      textarea: new Textarea({ className: 'dialog__message-field', name: 'message', placeholder: 'Message' }),
    });
  }

  render() {
    return `
      <form action="#" class="dialog__message-form" id="message-form">
        <div class="dialog__message">
          <label class="dialog__message-clip">
            <input class="visually-hidden" type="file" name="message-attachment">

            <div>
              <svg class="icon_standard icon_32">
                <use xlink:href="#clip"></use>
              </svg>
            </div>
          </label>

          {{{ textarea }}}
        </div>

        <button class="send-button" type="submit">
          <svg class="icon icon_24">
            <use xlink:href="#send"></use>
          </svg>
        </button>
      </form>
    `;
  }
}
