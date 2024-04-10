import Block from '../../utils/Block';

interface NotificationProps {
  className?: string,
  text?: string,
}

export class Notification extends Block {
  constructor(props: NotificationProps) {
    super({ ...props });
  }

  render() {
    return `
      <span class="notification {{ className }}">
        {{ text }}
      </span>
    `;
  }
}
