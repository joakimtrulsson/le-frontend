import * as React from 'react';

interface QueryParams {
  order?: string;
  error?: string;
}

export function useQueryParams(): QueryParams {
  const [queryParams, setQueryParams] = React.useState({});

  React.useEffect(() => {
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const params: { [key: string]: string } = {};
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
      return params;
    };

    setQueryParams(getQueryParams());
  }, []);

  return queryParams;
}
