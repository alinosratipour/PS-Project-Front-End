import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import PizzaSizeDropdown from "./PizzaSizeDropdown";
import PizzaBaseDropdown from "./PizzaBaseDropdown";
import {
  GET_PIZZAS_WITH_SIZES_AND_PRICES,
  GET_ALL_SIZES_WITH_RELATED_BASES,
} from "../queries/queries";

type SizeAndPriceMap = Record<string, number>;

interface BaseWithPrice {
  base: string;

}

type SizeWithRelatedBases = {
  bases: BaseWithPrice[];
};


const ListAllPizzas = () => {
  const { loading, error, data } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);
  const {
    loading: baseLoading,
    error: baseError,
    data: baseData,
  } = useQuery(GET_ALL_SIZES_WITH_RELATED_BASES, {
    fetchPolicy: "cache-and-network",
  });

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);

  if (loading || baseLoading) return <p>Loading...</p>;
  if (error || baseError)
    return <p>Error: {error?.message || baseError?.message}</p>;

  const pizzas = data.pizzasWithSizesAndPrices;

  const sizeAndPriceMap: SizeAndPriceMap = {};

  pizzas.forEach(
    (pizza: { sizesWithPrices: { p_size: string; price: number }[] }) => {
      pizza.sizesWithPrices.forEach((size) => {
        sizeAndPriceMap[size.p_size] = size.price;
      });
    }
  );

  const uniqueSizes = Object.keys(sizeAndPriceMap);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setSelectedSize(size);
  };

  const handleBaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const base = event.target.value;
    setSelectedBase(base);
  };

  const availableBaseNames: string[] = [];

  // Dynamically populate available bases
  baseData.getAllSizesWithRelatedBases.forEach((sizeWithBases: SizeWithRelatedBases) => {
    sizeWithBases.bases.forEach((base: BaseWithPrice) => {
      const baseName = base.base;
      if (!availableBaseNames.includes(baseName)) {
        availableBaseNames.push(baseName);
      }
    });
  });

  return (
    <div>
      <h1>List of Pizzas</h1>
      <PizzaSizeDropdown
        sizes={uniqueSizes}
        selectedSize={selectedSize}
        handleSizeChange={handleSizeChange}
        sizeAndPriceMap={sizeAndPriceMap}
      />
      <PizzaBaseDropdown
        bases={availableBaseNames}
        selectedBase={selectedBase}
        handleBaseChange={handleBaseChange}
      />

      {selectedSize && (
        <div>
          <h2>Selected Size: {selectedSize}</h2>
          <h3>Price: {sizeAndPriceMap[selectedSize]}</h3>
        </div>
      )}

      {selectedBase && (
        <div>
          <h2>Selected Base: {selectedBase}</h2>
        </div>
      )}
    </div>
  );
};

export default ListAllPizzas;
