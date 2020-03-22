import { useState, useEffect } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null
  });

  useEffect(
    () => {
      const fetchApi = async () => {
        const { data } = await server.fetch<TData>({ query });
        setState({ data });
      };
      fetchApi();
      // optionally add return callback below for cleanup after component unmounts
    },
    [query] // only runs on first render (component mount) since `query` is constant.
  );

  return state;
};
