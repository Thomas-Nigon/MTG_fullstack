import extensionStore from "./ZustandStores/store";
import { gql } from "@apollo/client";
import { client } from "@/main";

// Define the GraphQL query with a clear operation name
const GET_ALL_SETS_QUERY = gql`
  query GetAllSets {
    getAllSets {
      name
      value
    }
  }
`;

/**
 * Fetches the list of all card sets and updates the extension store.
 * @throws Will throw an error if the query fails.
 */
export const getExtensionList = async (): Promise<void> => {
  try {
    const { data } = await client.query({
      query: GET_ALL_SETS_QUERY,
    });
    extensionStore.setState({ extensionList: data.getAllSets });
  } catch (error) {
    console.error("Error fetching extension list:", error);
    throw error;
  }
};
