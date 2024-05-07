import { expect } from 'chai';
import Block from './Block';
import { Indexed } from '../types';

class TestBlock extends Block {
  constructor(props: Indexed) {
    super({ ...props });
  }

  render() {
    return `
      <div>{{ text }}</div>
    `;
  }
}

describe('Block test', () => {
  const component = new TestBlock({ text: 'my text' });
  const text = component.getContent()?.innerHTML;

  it('should create test block', () => {
    expect(text).to.equal('my text');
  });
});
