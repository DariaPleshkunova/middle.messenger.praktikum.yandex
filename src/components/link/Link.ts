import Block from '../../utils/Block';

interface LinkProps {
  className?: string,
  text?: string,
  type?: string,
  iconId?: string,
  iconClass?: string,
  onClick?: (value: Event) => void,
  dataPopup?: string,
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  render() {
    return `
      <button class="link {{ className }} {{#if iconId}} link_has-icon {{/if}}" 
        type="{{#if type}}{{type}}{{else}}button{{/if}}"
        {{#if dataPopup}}data-popup-trigger="{{dataPopup}}"{{/if}}>
            
        {{#if iconId}}
            <svg class="{{iconClass}}">
                <use xlink:href="{{ iconId }}"></use>
            </svg>
        {{/if}}

        {{ text }}
      </button>            
    `;
  }
}
