import fetch from 'dva/fetch';
import { notSuccessException, failException } from '@/utils/exceptions';

const JSON_CONTENT_TYPE = 'application/json;charset=utf-8';

const header = {
  'x-requested-with': 'XMLHttpRequest',
  Accept: 'application/json',
  'Content-Type': JSON_CONTENT_TYPE,
};

const throwError = (status, message) => {
  throw {
    status,
    message,
  };
};

function checkStatus (response) {
  return response.text().then((data) => {
    let dataJson = data;

    try {
      dataJson = JSON.parse(data);
      if (dataJson.success === false || response.status >= 400) {
        return throwError(response.status, dataJson.message || dataJson);
      }
      return dataJson;
    } catch (e) {
      if (response.status >= 200 && response.status < 400) {
        if (response.status === 200) {
          notSuccessException(data);
        }
        return data;
      }
      return throwError(response.status, dataJson.message || dataJson);
    }
  });
}

function isJSONContentType (type) {
  return type === JSON_CONTENT_TYPE;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options = {}, cb) {
  const {
    method = 'GET', headers = {}, body, ...rest
  } = options;

  let newBody = body;
  const newHeader = Object.assign({}, header, headers);

  if (isJSONContentType(newHeader['Content-Type'])) newBody = JSON.stringify(body);

  let newOptions = {
    credentials: 'same-origin',
    method,
    headers: newHeader,
    ...rest,
  };

  if (newBody) newOptions.body = newBody;

  // return fetch(getParams(url, method, body), newOptions)
  //   .then(cb || checkStatus);

  return fetch(url, newOptions).then(cb || checkStatus).catch((error) => { failException(error); });
}
