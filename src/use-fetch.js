import { useState } from 'react';

import { HandledError, isHandledError } from './error';

const useFetch = () => {
  const [state, setState] = useState({ data: null, loading: false });

  const request = async (url, { method = 'GET', headers = {}, body, timeout = 30000 } = {}) => {
    const controller = new AbortController();
    controller.signal.addEventListener('abort', () => controller.abort());

    await setState({ data: null, loading: true });

    const abortTimer = setTimeout(() => controller.abort(), timeout);

    return fetch(url, { 
      method,
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body && JSON.stringify(body),
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) {
          throw new HandledError(res);
        }
        return res.json()
      })
      .then(data => setState({ data, loading: false }))
      .catch(err => {
        if (!isHandledError(err)) {
          setTimeout(() => { throw err });
        }
        setState({ data: err, loading: false });
      })
      .finally(() => clearTimeout(abortTimer));
  }

  const isError = state.data instanceof Error;

  return [state.loading, !isError ? state.data : undefined, isError ? state.data : undefined, request];
}

export default useFetch;
