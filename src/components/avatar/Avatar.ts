import Block from '../../utils/Block';
import url from '../../api/url';

interface AvatarProps {
  className?: string;
  isStandard?: boolean;
  imageUrl?: string;
  imageUrlFull?: string;
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
        {{#if imageUrlFull }}
          <img src="{{imageUrlFull}}" class="avatar__image" alt="Картинка профиля">
        {{else if imageUrl }}
          <img src="${url.resources}/{{imageUrl}}" class="avatar__image" alt="Картинка профиля">
        {{else}}
          {{#if isStandard }}
            <span> {{ initials }} </span>
          {{/if}}
        {{/if}}            
      </div>
    `;
  }
}
