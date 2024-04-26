import Block from '../../utils/Block';
import { Link } from '../../components/link';
import { PageProps } from '../../types';

export class Error404Page extends Block {
  constructor(props: PageProps) {
    super({
      ...props,
      link: new Link({
        text: 'Back to chats',
        onClick: () => {
          props.routeHandlers.onBackRoute();
          props.routeHandlers.onBackRoute();
        },
      }),
    });
  }

  render() {
    return `
      <div class="page page-error">    
        <main class="page-error__container flex-column flex-column_align-center">
          <h1 class="visually-hidden">Ошибка</h1> 

          <span class="page-error__error"> 404 </span>

          <p class="page-error__text"> Sorry, the page you're looking for isn't here. Please check the URL or return to the chats. </p>

          {{{ link }}}
        </main>
      </div>
    `;
  }
}
