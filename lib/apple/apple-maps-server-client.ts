import createClient from "openapi-fetch";

import { paths, components } from "./apple-maps-server-api";

export const client = createClient<paths>({
  baseUrl: "https://maps-api.apple.com/v1",
});

export default client;
