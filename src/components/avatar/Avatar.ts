import Block from '../../utils/Block';

interface AvatarProps {
  className?: string;
  isStandard?: boolean;
  imageUrl?: string;
  initials?: string;
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
          <img src="{{ imageUrl }}" class="avatar__image" alt="Картинка профиля">
        {{else}}
          {{#if isStandard }}
            <span> {{ initials }} </span>
          {{/if}}
        {{/if}}            
      </div>
    `;
  }
}
