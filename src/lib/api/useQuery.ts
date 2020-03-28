import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: true,
    error: false
  });
  const fetch = useCallback(() => {
    (async function fetchApi() {
      try {
        setState({ data: null, loading: true, error: false });
        const { data, errors } = await server.fetch<TData>({ query });
        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        setState({ data, loading: false, error: false });
      } catch (err) {
        setState({ data: null, loading: false, error: true });
        throw console.error(err);
      }
    })();
  }, [query]);

  useEffect(() => {
    fetch();
    // optionally add return callback below for cleanup after component unmounts
  }, [fetch]);

  return { ...state, refetch: fetch };
};
