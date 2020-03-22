import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null
  });
  const fetch = useCallback(() => {
    (async function fetchApi() {
      const { data } = await server.fetch<TData>({ query });
      setState({ data });
    })();
  }, [query]);

  useEffect(() => {
    fetch();
    // optionally add return callback below for cleanup after component unmounts
  }, [fetch]);

  return { ...state, refetch: fetch };
};
