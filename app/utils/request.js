import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { BASE_URL } from './constants';
import get from 'lodash/get';
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
  const { form: formData } = options;
  const headers = Object.assign({}, options.headers);
  if (headers && !headers['Content-Type'] && internal && isEmpty(formData))
    headers['Content-Type'] = 'application/json';

  if (!isEmpty(formData)) {
    delete headers['Content-Type'];
  }

  if (internal && (!isEmpty(token) || token !== 'undefined')) {
    headers.Authorization = token;
  }
  const modifiedOptions = {
    method: 'POST',
    headers,
    body:
      options.data && isEmpty(formData)
        ? JSON.stringify(options.data)
        : formData,
    ...omit(options, ['headers', 'data', 'form']),
  };

  if (formData)
    console.log('HEADERS ', modifiedOptions, formData.getAll('file'));

  return fetch(internal ? BASE_URL.default + url : url, modifiedOptions).then(
    response =>
      new Promise((resolve, reject) => {
        if (response.statusText === 'No Content')
          if (response.ok) return resolve({ success: true });
          else
            return reject({
              message: 'Something is wrong',
              code: response.status,
            });
        response.json().then(json => {
          if (response.ok && !json.errorMessage && !json.errorType) {
            return resolve(json);
          }
          return reject({
            message: get(json, 'message', 'Something is wrong...'),
            code: response.status,
          });
        });
      }),
  );
}
