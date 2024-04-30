export default function checkResponse(response: XMLHttpRequest, onSuccess?: () => void) {
  let data = null;

  if (response.response !== 'OK') {
    data = JSON.parse(response.response);
  }

  const status = response?.status;

  if (status >= 200 && status < 300) {
    if (onSuccess) {
      onSuccess();
    }

    return data || true;
  }

  throw new Error(data.reason);
}
