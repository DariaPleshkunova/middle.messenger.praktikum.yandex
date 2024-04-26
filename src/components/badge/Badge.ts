import Block from '../../utils/Block';
import connect from '../../utils/connect';

import { Indexed, BadgeState } from '../../types';
import store from '../../utils/Store';

interface BadgeProps {
  badge?: string;
  isError?: boolean;
}

export class Badge extends Block {
  constructor(props: BadgeProps) {
    super({
      ...props,
    });
  }

  render() {
    if (this.props.badge) {
      setTimeout(() => {
        store.set('badge', null);
        this.setProps({ badge: null });
      }, 5000);
    }

    return `
      <div class="badge {{#if badge}} is-active {{/if}} {{#if isError}}is-error{{/if}}">
        {{#if isError}}
          <p class="badge__heading">Error</p>
        {{/if}}
        
        <p class="badge__text">{{ badge }}</p>
      </div>
    `;
  }
}

function mapErrorToProps(state: Indexed) {
  const badgeState = state.badge as BadgeState;

  if (badgeState) {
    return {
      badge: badgeState.message,
      isError: !(badgeState.isError === false),
    };
  }

  return {};
}

export default connect(Badge as typeof Block, mapErrorToProps);
