import { gql } from "@apollo/client";

// Define the GraphQL mutation with a clear operation name
const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

/**
 * GraphQL mutation to log out a user.
 * This mutation clears the user's session and returns a boolean indicating success.
 */
export { LOGOUT_MUTATION };
