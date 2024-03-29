enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

function queryStringify(data: Record<string, any>): string {
  const searchParams = new URLSearchParams(data);
  const queryString = searchParams.toString();
  const adaptedString = queryString.replaceAll('%5B', '[').replaceAll('%5D', ']').replaceAll('%2C', ',').replaceAll('+', ' ');

  return adaptedString;
}

interface RequestOptions {
  data?: Record<string, any>;
  method?: METHODS;
  timeout?: number;
}

export default class HTTPTransport {
  get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string, options: RequestOptions, timeout: number = 5000): Promise<XMLHttpRequest> => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let requestData: string = '';

    if (options.data) {
      if (options.method === METHODS.GET) {
        url += `?${queryStringify(options.data)}`;
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        requestData = JSON.stringify(options.data);
      }
    }

    if (options.method) {
      xhr.open(options.method, url);
    } else {
      xhr.open(METHODS.GET, url);
    }

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
