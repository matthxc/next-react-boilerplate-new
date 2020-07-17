// #region Global Imports
import 'isomorphic-unfetch';
import { stringify } from 'query-string';
// #endregion Global Imports

// #region Interface Imports
import { HttpModel } from '@Interfaces';
// #endregion Interface Imports

const API_URL = 'http://localhost:3000';
const API_KEY = 'NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo';

const BaseUrl = `${API_URL}/api`;

export const Http = {
  Request: async <A>(
    methodType: string,
    url: string,
    params?: HttpModel.IRequestQueryPayload,
    payload?: HttpModel.IRequestPayload,
  ): Promise<A> =>
    new Promise((resolve, reject) => {
      const query = params
        ? `?${stringify({ ...params, api_key: API_KEY })}`
        : '';

      fetch(`${BaseUrl}${url}${query}`, {
        body: JSON.stringify(payload),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
        },
        method: `${methodType}`,
      })
        .then(async (response) => {
          if (response.status === 200) {
            return response.json().then(resolve);
          }
          return reject(response);
        })
        .catch((e) => {
          reject(e);
        });
    }),
};
