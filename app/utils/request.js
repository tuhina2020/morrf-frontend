import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { BASE_URL } from './constants';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options, internal = true) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (!isEmpty(token) || token !== 'undefined') {
    headers.Authorization = token;
  }
  const modifiedOptions = {
    method: 'POST',
    headers,
    body: options.data ? JSON.stringify(options.data) : undefined,
    ...omit(options, ['headers', 'data']),
  };

  return fetch(internal ? BASE_URL.default + url : url, modifiedOptions).then(
    response =>
      new Promise((resolve, reject) => {
        response.json().then(json => {
          if (response.ok && !json.errorMessage && !json.errorType) {
            return resolve(json);
          }
          return reject(
            (json && (json.message || json.errorMessage)) ||
              'Something is wrong...',
          );
        });
      }),
  );
}
