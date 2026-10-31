// @ts-check
import app from "../dist-api/index.mjs";

// Web handlers preserve oRPC POST bodies without legacy Node body parsing.
// The API is bundled separately: never import the listening src/server.ts.
/** @param {Request} request @returns {Response | Promise<Response>} */
const handler = (request) => app.fetch(request);

export {
  handler as GET,
  handler as HEAD,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
