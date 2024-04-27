import queryStringify from './helpers/queryStringify';

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface RequestOptions {
  data?: Record<string, any>;
  method?: METHODS;
  timeout?: number;
  headers?: Record<string, any>;
}

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>;

export default class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  );

  request = (url: string, options: RequestOptions, timeout: number = 5000): Promise<XMLHttpRequest> => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let requestData: string | FormData = '';

    if (options.data) {
      if (options.method === METHODS.GET) {
        url += `?${queryStringify(options.data)}`;
      } else {
        requestData = options.data instanceof FormData ? options.data : JSON.stringify(options.data);
      }
    }

    if (options.method) {
      xhr.open(options.method, url);
    } else {
      xhr.open(METHODS.GET, url);
    }

    for (const header in options.headers) {
      if (options.headers.hasOwnProperty(header)) {
        xhr.setRequestHeader(header, options.headers[header]);
      }
    }

    xhr.withCredentials = true;

    xhr.onload = () => {
      resolve(xhr);
    };

    xhr.onerror = () => {
      reject(new Error('Request failed'));
    };

    xhr.timeout = timeout;
    xhr.ontimeout = () => {
      reject(new Error('Request timed out'));
    };

    xhr.send(requestData);
  });
}
