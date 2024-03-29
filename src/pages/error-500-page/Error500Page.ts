import Block from '../../utils/Block';
import { Link } from '../../components/link';

export class Error500Page extends Block {
  constructor() {
    super({
      link: new Link({ text: 'Back to chats' }),
    });
  }

  render() {
    return `
      <div class="page page-error">    
        <main class="page-error__container flex-column flex-column_align-center">
          <h1 class="visually-hidden">Ошибка</h1> 

          <span class="page-error__error"> 500 </span>

          <p class="page-error__text">Something went wrong. We are aware and working on it. Please try again later. Thank you for your patience.</p>

          {{{ link }}}
        </main>
      </div>
    `;
  }
}
