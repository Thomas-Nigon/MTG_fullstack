import { Input } from "@/components/ui/input";
import { GET_CARDS } from "@/services/searchCard";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
/* import {
        GetCardByNameQuery,
        GetCardByNameQueryVariables,
      } from "@/services/graphQL/generated/graphql-types"; */
import {
  Card,
  GetCardByNameQuery,
  GetCardByNameQueryVariables,
} from "@/lib/graphql/generated/graphql-types";

export default function Search() {
  const [searchResults, setSearchResults] = useState<Card[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const [getCardByName, { error }] = useLazyQuery<
    GetCardByNameQuery,
    GetCardByNameQueryVariables
  >(GET_CARDS, {
    variables: { name: inputValue },
    onCompleted: (data) => {
      setSearchResults(data.getCardByName as Card[]);
      setCurrentCard(data.getCardByName[0] as Card);
    },
  });

  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    try {
      getCardByName({ variables: { name: e.target.value } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md items-center space-x-2 ">
      <article className="flex w-full mt-5 ">
        <Input
          onChange={handleSearch}
          type="search"
          placeholder="Search for a card..."
          onFocus={() => {
            setIsFocused(true);
            setInputValue("");
          }}
          value={inputValue}
        />
      </article>
      <ul className="flex flex-col w-full  m-0 z-10">
        {searchResults &&
          isFocused &&
          searchResults.map((card: Card) => (
            <li
              className="hover:bg-gray-100 hover:text-black p-1 cursor-pointer "
              key={card.id}
              onClick={() => {
                setInputValue(card.name);
                setCurrentCard(card);
                setIsFocused(false);
              }}
            >
              {card.name}
            </li>
          ))}
      </ul>
      {!isFocused && (
        <img
          className="mt-10 max-w-80 "
          src={
            currentCard?.image_uris?.normal ||
            "src/assets/cardAssets/Magic_card_back.webp"
          }
          alt={currentCard?.name}
        />
      )}
    </div>
  );
}
