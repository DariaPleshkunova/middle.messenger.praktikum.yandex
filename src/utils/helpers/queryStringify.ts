export default function queryStringify(data: Record<string, any>): string {
  const searchParams = new URLSearchParams(data);
  const queryString = searchParams.toString();
  const adaptedString = queryString.replace(/%5B/g, '[').replace(/%5D/g, ']').replace(/%2C/g, ',').replace(/\+/g, ' ');
  return adaptedString;
}
