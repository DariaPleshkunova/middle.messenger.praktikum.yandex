import Block from '../../utils/Block';

import { Avatar } from '../avatar';
import { MoreButton } from '../more-button';
import { Title } from '../title';
import { Date } from '../date';
import { Message } from '../message';
import { MessageForm } from '../message-form';

export class Dialog extends Block {
  constructor() {
    super({
      avatar: new Avatar({ isStandard: true }),
      title: new Title({ text: 'Bill Marks' }),
      moreButton: new MoreButton(),
      date: new Date({ className: 'dialog__date', text: 'Mar, 4', datetime: '2024-03-04' }),
      messageGroup1: [
        new Message({ text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро' }),
        new Message({ text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo vel facere cupiditate quos ratione consectetur? Animi eveniet possimus, quia dicta explicabo perspiciatis nihil similique vero perferendis facere quidem nemo porro.' }),
        new Message({ imageUrl: 'https://images.unsplash.com/photo-1520500807606-4ac9ae633574?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }),
      ],
      messageGroup2: [
        new Message({ className: 'is-authored', text: 'Круто!' }),
        new Message({ className: 'is-authored', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis, similique culpa quae corrupti magnam officia ratione nulla, blanditiis quibusdam quisquam? Ab illo unde obcaecati earum dolorum corporis, reiciendis odit?' }),
      ],
      messageForm: new MessageForm({}),
    });
  }

  render() {
    return `
      <div class="dialog">
        <header class="dialog__header">
          <div class="dialog__author">
            {{{ avatar }}}

            {{{ title }}}
          </div>

          {{{ moreButton }}}
        </header>

        <div class="dialog__container">
          <div class="dialog__wrapper">
            <div class="dialog__content">
              <div class="dialog__date-wrapper">
                {{{ date }}}

                <div class="message-group">
                  {{{ messageGroup1 }}}
                </div>

                <div class="message-group">
                  {{{ messageGroup2 }}}
                </div>
              </div>
            </div>
          </div>

          {{{ messageForm }}}
        </div>            
      </div>
    `;
  }
}
