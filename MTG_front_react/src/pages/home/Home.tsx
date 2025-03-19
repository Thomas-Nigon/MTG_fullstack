import Search from "@/components/Search/Search";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  GetRandomCardsQuery,
  GetRandomCardsQueryVariables,
} from "@/lib/graphql/generated/graphql-types";
import { GET_RANDOM_CARDS } from "@/services/getRandomCards";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Home() {
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
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [getRandomCards, api]);

  return (
    <main className="mt-20 p-2 flex flex-col justify-center items-center ">
      <h2>Welcome to my magic side project</h2>
      <p>
        Here you can look for a specific card, browse hundreds of collections
        and make your own deck if you create an
        <span className="text-[hsl(var(--primary))]">Account</span>
      </p>
      <Search />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="mx-auto max-w-xs">
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
    </main>
  );
}
