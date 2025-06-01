import { CarouselComponent } from "@/components/Carousel/CarouselComponent";
import Search from "@/components/Search/Search";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="mt-20 p-2 flex flex-col justify-center ">
      <h2 className="p-2 xl:px-40 mb-4">Welcome to my magic side project</h2>
      <p className="p-2 xl:px-40 mb-16">
        Here you can look for a specific card, browse hundreds of collections
        and make your own deck if you create an{" "}
        <Link to="/login" className="text-[hsl(var(--primary))]">
          Account
        </Link>
      </p>
      <h3 className="mx-auto mb-8">Here is sample of a few card available</h3>

      <div className="flex flex-col xl:flex-row mx-2  xl:mx-40">
        <CarouselComponent />
        <Search />
      </div>
    </main>
  );
}
