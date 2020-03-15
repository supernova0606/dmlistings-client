interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

export const server = {
  // cURL POST GraphQL Query
  // curl -X POST 'http://{endpoint}/api' -H 'Content-Type: application/json' -d '{"query": "{listings {id}}"}'
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return response.json() as Promise<{ data: TData }>; // type assert as TData argument type
  }
};
