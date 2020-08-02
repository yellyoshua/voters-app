import fetch from 'isomorphic-fetch';

export type getQueriesProps = Array<{ url: string; header: { Authorization: string }; }>;

export default async (endpoints: getQueriesProps = []): Promise<any[]> => {
  let requests: Promise<any>[] = [];

  if (endpoints.length > 0) {
    requests = endpoints.map((endpoint) => {
      const request = fetch(endpoint.url, { headers: endpoint.header })
        .then(r => r.json())
        .then(r => r)
        .catch(() => ({}));
      return request;
    })
  }


  const response = Promise.all(requests);

  return response;
}