import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Router from './Router';
import Block from './Block';
import { Indexed } from '../types';

class TestPage1 extends Block {
  constructor(props: Indexed) {
    super({ ...props });
  }

  render() {
    return `
      <div id="testPage1">TestPage1</div>
    `;
  }
}

class TestPage2 extends Block {
  constructor(props: Indexed) {
    super({ ...props });
  }

  render() {
    return `
      <div id="testPage2">TestPage2</div>
    `;
  }
}

const testPage1 = new TestPage1({});
const testPage2 = new TestPage2({});

describe('Router test', () => {
  beforeEach(() => {
    const { window } = new JSDOM(
      `<html>
         <body>
          <div id="app"></div>
         </body>
       </html>`,
      { url: 'http://localhost:3000' },
    );

    (global as any).window = window;
    global.document = window.document;
  });

  it('should create pages', () => {
    const router = new Router('app');
    router.use('/', testPage1).use('/testPage2', testPage2).start();
    expect(router.routes.length).eq(2);
  });

  it('should go to the page', () => {
    const router = new Router('app');
    router.use('/', testPage1).use('/testPage2', testPage2).start();
    router.go('/testPage2');

    expect(document.getElementById('app')?.innerHTML).to.contain('<div id="testPage2">TestPage2</div>');
  });
});
