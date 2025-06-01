import { gql } from "@apollo/client";

// Define the GraphQL query with a clear operation name
const IS_LOGGED_QUERY = gql`
  query IsLogged {
    isLogged
  }
`;

/**
 * GraphQL query to check if the user is logged in.
 * This query returns a boolean indicating the user's login status.
 */
export { IS_LOGGED_QUERY };
