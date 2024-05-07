import { expect } from 'chai';
import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic, useFakeXMLHttpRequest } from 'sinon';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  let httpTransport: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];
  let xhr: SinonFakeXMLHttpRequestStatic;

  beforeEach(() => {
    httpTransport = new HTTPTransport();
    xhr = useFakeXMLHttpRequest();

    (global as any).XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };
  });

  afterEach(() => {
    requests = [];
  });

  it('should send get request', () => {
    httpTransport.get('/');
    const [request] = requests;

    expect(request.method).to.equal('GET');
  });

  it('should send post request', () => {
    httpTransport.post('/', {});
    const [request] = requests;

    expect(request.method).to.equal('POST');
  });

  it('should send put request', () => {
    httpTransport.put('/', {});
    const [request] = requests;

    expect(request.method).to.equal('PUT');
  });

  it('should send delete request', () => {
    httpTransport.delete('/', {});
    const [request] = requests;

    expect(request.method).to.equal('DELETE');
  });
});
