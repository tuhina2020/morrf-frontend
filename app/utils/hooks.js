import { useEffect } from 'react';

export const useScript = (url, cb) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = typeof cb === 'function' ? cb : () => {};

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
