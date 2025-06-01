//import { UserInterface } from "@/types-d";
import { gql } from "@apollo/client";

// Define the GraphQL mutation with a clear operation name
const LOGIN_MUTATION = gql`
  mutation Auth($password: String!, $email: String!) {
    auth(password: $password, email: $email)
  }
`;

/**
 * GraphQL mutation to authenticate a user.
 * This mutation takes an email and password as input and returns an authentication token.
 */
export { LOGIN_MUTATION };
