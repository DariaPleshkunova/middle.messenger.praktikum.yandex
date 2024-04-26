import Block from './Block';
import store, { StoreEvents } from './Store';

import { Indexed } from '../types';

export default function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Record<string, unknown> | undefined) {
  return class extends Component {
    constructor(props: Indexed) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
