interface Body {
  query: string;
}

export const server = {
  // cURL POST GraphQL Query
  // curl -X POST 'http://{endpoint}/api' -H 'Content-Type: application/json' -d '{"query": "{listings {id}}"}'
  fetch: async (body: Body) => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return response.json();
  }
};
