import Block from '../../utils/Block';
import { Message } from '../message';

import { Date } from '../date';

interface DialogItemProps {
  datetime: string;
  messages: Message[];
}

export class DialogItem extends Block {
  constructor(props: DialogItemProps) {
    super({
      ...props,
      date: new Date({ className: 'dialog__date', datetime: props.datetime }),
    });
  }

  render() {
    return `
      <div class="dialog__date-wrapper">
        {{{ date }}}

        {{{ messages }}}
      </div>
    `;
  }
}
