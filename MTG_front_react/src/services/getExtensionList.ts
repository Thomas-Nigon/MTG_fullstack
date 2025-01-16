import extensionStore from "./ZustandStores/store";
import { gql } from "@apollo/client";
import { client } from "@/main";

export const getExtensionList = async (): Promise<void> => {
  try {
    const data = await client.query({
      query: gql`
        query Query {
          getAllSets {
            name
            value
          }
        }
      `,
    });
    extensionStore.setState({ extensionList: data.data.getAllSets });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
