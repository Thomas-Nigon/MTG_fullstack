/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from "@/contexts/UserContext";
import { getDecks } from "@/lib/getDecks";
import { DeckInterface } from "@/types-d";
import { useContext, useEffect, useState } from "react";

export default function User() {
  const { user } = useContext(UserContext);
  const id = user.id;
  const decks: DeckInterface[] = [];
  // const [decks, setDecks] = useState<DeckInterface[]>([]);
  useEffect(() => {
    console.log("decks add service to return user decks");
  }, []);

  return (
    <main>
      <h1>Welcome to user page</h1>
      <p>your are user : {user.name}</p>
      <p>id : {user.id}</p>
      {decks &&
        decks.map((deck) => (
          <div key={deck.id}>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <article>
              {deck.cardStacks &&
                deck.cardStacks.map((cardStack) => (
                  <div key={cardStack.card.card_id}>
                    <p>{cardStack.card.name}</p>
                    <img
                      src={cardStack.card.image_uris.normal}
                      alt={cardStack.card.name}
                    />
                    <p>quantity:{cardStack.quantity}</p>
                  </div>
                ))}
            </article>
          </div>
        ))}
    </main>
  );
}
