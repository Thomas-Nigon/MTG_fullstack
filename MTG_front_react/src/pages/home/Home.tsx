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
import { Link } from "react-router-dom";

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
      const selectedIndex = api.selectedScrollSnap();
      setCurrent(selectedIndex + 1);

      if (selectedIndex === count - 1) {
        api.scrollTo(0);
      }
    });
  }, [getRandomCards, api, count]);

  return (
    <main className="mt-20 p-2 flex flex-col justify-center ">
      <h2 className="px-40 mb-4">Welcome to my magic side project</h2>
      <p className="px-40 mb-16">
        Here you can look for a specific card, browse hundreds of collections
        and make your own deck if you create an{" "}
        <Link to="/login" className="text-[hsl(var(--primary))]">
          Account
        </Link>
      </p>
      <h3 className="mx-auto mb-8">Here is sample of a few card available</h3>
      // add responsive to search and move feature into component
      <div className="flex mx-40 ">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div className="mx-auto max-w-xs mt-[100px] ">
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
        <Search />
      </div>
    </main>
  );
}
