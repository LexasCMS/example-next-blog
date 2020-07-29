import { request as graphqlRequest } from "graphql-request";

export function request({ query, variables }) {
  // Define LexasCMS API Endpoint
  const apiEndpoint = `https://${process.env.LEXASCMS_SPACE_ID}.spaces.lexascms.com/delivery/graphql`;
  // Send request
  return graphqlRequest(apiEndpoint, query, variables);
}