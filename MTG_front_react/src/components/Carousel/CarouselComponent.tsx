import {
  GetRandomCardsQuery,
  GetRandomCardsQueryVariables,
} from "@/lib/graphql/generated/graphql-types";
import { GET_RANDOM_CARDS } from "@/services/getRandomCards";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export const CarouselComponent = () => {
  const [getRandomCards, { data, loading, error }] = useLazyQuery<
    GetRandomCardsQuery,
    GetRandomCardsQueryVariables
  >(GET_RANDOM_CARDS, {
    variables: {
      count: 10,
    },
  });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getRandomCards();

    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrent(selectedIndex + 1);

      if (selectedIndex === count - 1) {
        api.scrollTo(0);
      }
    });
  }, [getRandomCards, api, count]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="mx-auto max-w-xs xl:mt-[100px] ">
          <Carousel setApi={setApi} className="w-full max-w-xs">
            <CarouselContent>
              {data.getRandomCards.map((card) => (
                <CarouselItem key={card.id}>
                  <img src={card.image_uris?.normal} alt={card.name} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </div>
      )}
    </>
  );
};
