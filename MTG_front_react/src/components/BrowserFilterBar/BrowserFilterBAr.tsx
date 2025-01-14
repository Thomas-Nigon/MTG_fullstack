import BrowsePagination from "@/pages/browse/components/Pagination/BrowsePagination";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import BrowserFilter from "../BrowserFilter/BrowserFilter";
import { RootState } from "@/store";
import extensionStore from "@/lib/ZustandStores/store";
import { useStore } from "zustand";
import { getExtensionList } from "@/lib/getExtensionList";

import { cardQueryInterface } from "@/types-d";

interface BrowserFilterBarProps {
  cardQueries: cardQueryInterface;
  setCardQueries: (queries: cardQueryInterface) => void;
  // currentPage: number;
  // setCurrentPage: (page: number) => void;
  pageCount: number;
}

const BrowserFilterBar = ({
  cardQueries,
  setCardQueries,
  /*      currentPage,
      setCurrentPage, */
  pageCount,
}: BrowserFilterBarProps) => {
  const [pageSize, setPageSize] = useState("10");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [extension, setExtension] = useState("");

  useEffect(() => {
    getExtensionList();
    /*   setCardQueries(
      `&size=${pageSize}&page=${currentPage}&colors=${color}&type=${type}&rarity=${rarity}&set=${extension}`
    ); */
    setCardQueries({
      ...cardQueries,
      size: parseInt(pageSize),
      colors: color,
      type: type,
      rarity: rarity,
      set: extension,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    color,
    cardQueries.currentPage,
    extension,
    pageSize,
    rarity,
    setCardQueries,
    type,
  ]);

  const resetFilters = () => {
    setColor("");
    setType("");
    setRarity("");
    setExtension("");
    setPageSize("100");
    /*  setCardQueries(
      `&size=${pageSize}&page=${currentPage}&colors=${color}&type=${type}&rarity=${rarity}&set=${set}`
    ); */
    window.location.reload();
  };

  const pageSizeFilter = [
    { name: "10", value: "10" },
    { name: "20", value: "20" },
    { name: "50", value: "50" },
    { name: "100", value: "100" },
  ];

  const extensionList = useStore(
    extensionStore,
    (state) => state.extensionList
  );

  const rarityFilter = useSelector(
    (state: RootState) => state.filterRarity.list
  );
  const colorFilter = useSelector((state: RootState) => state.filterColor.list);
  const filterArray = [
    {
      name: "Color ",
      filterContent: colorFilter,
      setFilter: setColor,
    },

    {
      name: "Rarity",
      filterContent: rarityFilter,
      setFilter: setRarity,
    },
    {
      name: "Extensions",
      filterContent: extensionList,
      setFilter: setExtension,
    },
  ];

  return (
    <div>
      <ul className="flex gap-4 flex-wrap justify-center">
        {filterArray.map((filter) => (
          <li key={filter.name}>
            <BrowserFilter
              filterName={filter.name}
              filterContent={filter.filterContent}
              setFilter={filter.setFilter}
            />
          </li>
        ))}
        <li>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </li>
      </ul>
      <article className="flex flex-col gap-4 m-5 justify-center items-center">
        <BrowsePagination
          cardQueries={cardQueries}
          setCardQueries={setCardQueries}
          pageCount={pageCount}
        />
        <BrowserFilter
          filterName="10"
          filterContent={pageSizeFilter}
          setFilter={setPageSize}
        />
      </article>
    </div>
  );
};

export default BrowserFilterBar;
