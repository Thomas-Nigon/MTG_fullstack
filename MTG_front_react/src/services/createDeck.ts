import { cardStackInterface, DeckInterface } from "@/types-d";

export const createDeck = async (
  deck: cardStackInterface[],
  name: string
): Promise<DeckInterface> => {
  const ownerId = 1;
  const description = "This is a test description";
  console.log(deck, name);
  try {
    const response = await fetch("http://localhost:4000/decks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deck, ownerId, description, name }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
