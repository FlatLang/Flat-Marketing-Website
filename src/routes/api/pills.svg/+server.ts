import { Table } from 'sst/node/table';
import { StatusPills, flat_server_Request, HashMap, FlatString } from '$lib/server/server';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, params }: { url: any; params: any }): Promise<Response> {
  const flatRequest = flat_server_Request.construct();
  flatRequest.query = HashMap.jsObjectToFlatHashMap(Object.fromEntries(url.searchParams));
  flatRequest.params = HashMap.jsObjectToFlatHashMap(params);

  const statusPills = StatusPills.construct(FlatString.construct5(Table.cache.tableName));
  const svg = await statusPills.run(flatRequest);

  const headers = {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'max-age=300, private',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'deny',
    'x-xss-protection': '0',
  };

  return new Response(String(svg.chars.data), {
    headers,
  });
}
