import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false
  });
  const fetch = useCallback(() => {
    (async function fetchApi() {
      setState({ data: null, loading: true });
      const { data } = await server.fetch<TData>({ query });
      setState({ data, loading: false });
    })();
  }, [query]);

  useEffect(() => {
    fetch();
    // optionally add return callback below for cleanup after component unmounts
  }, [fetch]);

  return { ...state, refetch: fetch };
};
