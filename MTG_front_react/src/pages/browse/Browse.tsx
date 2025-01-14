/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./browse.module.css";
import { useEffect, useState } from "react";
import {
  CardInterface,
  cardQueryInterface,
  cardStackInterface,
} from "@/types-d";

import SingleCard from "@/components/SingleCard/SingleCard";
import BrowseSideMenu from "@/components/BrowseSideMenu/BrowseSideMenu";
import BrowsePagination from "./components/Pagination/BrowsePagination";
import BrowserFilterBar from "@/components/BrowserFilterBar/BrowserFilterBAr";
import { GET_ALL_CARDS } from "@/lib/getAllCards";
import { useLazyQuery } from "@apollo/client";
import { getExtensionList } from "@/lib/getExtensionList";
import {
  GetCardsWithQueryQuery,
  GetCardsWithQueryQueryVariables,
} from "@/lib/graphQL/generated/graphql-types";

export default function Browse() {
  const [cardsQueries, setCardQueries] = useState<cardQueryInterface>({
    colors: "",
    rarity: "",
    size: 10,
    currentPage: 1,
    set: "",
    type: "",
  });
  const [pageCount, setPageCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDeck, setcurrentDeck] = useState<cardStackInterface[]>([]);

  const [getCards, { data, loading, error }] = useLazyQuery<
    GetCardsWithQueryQuery,
    GetCardsWithQueryQueryVariables
  >(GET_ALL_CARDS, {
    variables: {
      data: cardsQueries,
      size: cardsQueries.size,
      page: cardsQueries.currentPage,
    },
    onCompleted: (data) => {
      setPageCount(data.getCardsWithQuery.pageCount);
    },
  });

  const fetchData = async (cardsQueries: cardQueryInterface) => {
    getCards({
      variables: {
        data: cardsQueries,
        size: cardsQueries.size,
        page: cardsQueries.currentPage,
      },
    });
    setPageCount(10);
  };
  useEffect(() => {
    fetchData(cardsQueries);
    getExtensionList();
  }, [cardsQueries, data]);

  const AddCard = (card: CardInterface) => {
    setIsOpen(true);
    if (!currentDeck.find((c) => c.card.name === card.name)) {
      setcurrentDeck([...currentDeck, { card, quantity: 1 }]);
    } else {
      setcurrentDeck(
        currentDeck.map((c) =>
          c.card.name === card.name ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
      console.log("currentDeck:", currentDeck);
    }
  };

  const RemoveCard = (card: CardInterface) => {
    setcurrentDeck(currentDeck.filter((c) => c.card.name !== card.name));
  };

  return (
    <main className="p-2 mt-20">
      <header>
        <h2 className="mb-4">Browse cards and add them to your deck:</h2>
        <BrowserFilterBar
          cardQueries={cardsQueries}
          setCardQueries={setCardQueries}
          pageCount={pageCount}
        />
      </header>
      <div className="flex flex-row">
        <section className={styles.cardsContainer}>
          {loading && <p>Loading Cards...</p>}
          {error && <p>Error: {error.message}</p>}
          {data &&
            data.getCardsWithQuery.cards.map((card: CardInterface) => (
              <SingleCard key={card.card_id} card={card} addCard={AddCard} />
            ))}
        </section>
        <BrowseSideMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentDeck={currentDeck}
          setCurrentDeck={setcurrentDeck}
          RemoveCard={RemoveCard}
        />
      </div>
      <footer>
        <BrowsePagination
          cardQueries={cardsQueries}
          setCardQueries={setCardQueries}
          pageCount={pageCount}
        />
      </footer>
    </main>
  );
}
