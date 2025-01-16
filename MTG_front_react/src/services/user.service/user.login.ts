//import { UserInterface } from "@/types-d";
import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Auth($password: String!, $email: String!) {
    auth(password: $password, email: $email)
  }
`;
