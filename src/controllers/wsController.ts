import store from '../utils/Store';
import WSTransport from '../utils/WSTransport';

export default class WsController {
  private socket: WSTransport;

  private url: string;

  constructor(url: string) {
    this.url = url;
    this.socket = new WSTransport(this.url);
  }

  open() {
    return this.socket.connect();
  }

  getOldMessages(content: number = 0) {
    this.socket.send({
      content: content.toString(),
      type: 'get old',
    });

    this.socket.on('message', (data) => {
      if (Array.isArray(data)) {
        store.set('messages', data);
      } else {
        this.getOldMessages();
      }
    });
  }

  sendMessage(content: string) {
    this.socket.send({
      content,
      type: 'message',
    });
  }
}
