import Block from '../../utils/Block';

interface DateProps {
  className?: string,
  datetime?: string,
  text?: string,
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class Date extends Block {
  constructor(props: DateProps) {
    super({
      ...props,
      text: () => {
        function getMonth(monthStr: string) {
          if (monthStr.startsWith('0')) {
            monthStr = monthStr.replace('0', '');
          }

          const monthNumber = +monthStr - 1;

          return months[monthNumber];
        }

        if (props.datetime) {
          const dateArray = props.datetime.split('-');

          const month = getMonth(dateArray[1]);

          const day = dateArray[2];

          return `${month}, ${day}`;
        }
      },
    });
  }

  render() {
    return `
      <time class="date {{ className }}" datetime={{ datetime }}>
        {{{ text }}}
      </time>
    `;
  }
}
