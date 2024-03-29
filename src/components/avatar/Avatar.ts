import Block from '../../utils/Block';

interface AvatarProps {
  className?: string;
  isStandard?: boolean;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div class="avatar {{ className }}">
        {{#if imageUrl }}
          <img src="{{ imageUrl }}" alt="#">
        {{else}}
          {{#if isStandard }}
            <span> BM </span>
          {{/if}}
        {{/if}}            
      </div>
    `;
  }
}
