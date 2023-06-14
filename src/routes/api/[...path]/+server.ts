const { API_HOST } = process.env;

/** @type {import('./$types').RequestHandler} */
export function GET({ params }: { params: { path: string } }): Response {
  return new Response('Redirect', {
    status: 302,
    headers: { Location: `${API_HOST}/${params.path}` },
  });
}
