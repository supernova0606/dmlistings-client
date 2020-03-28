interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
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
    if (!response.ok) {
      throw new Error(`Server request failed with status ${response.status}`);
    }
    return response.json() as Promise<{ data: TData; errors?: Error[] }>; // type assert as TData argument type
  }
};
