import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SIZES_WITH_RELATED_BASES } from "../queries/queries";
import BaseRadioButtons from "./BaseRadioButtons";

interface BaseListProps {
  onBaseChange: (base: string) => void;
  selectedBase: string | undefined // Add this prop
}

type BaseWithPrice = {
  base: string;
  price: number; // Add the price property
};

type SizeWithRelatedBases = {
  bases: BaseWithPrice[];
};

const BaseList: React.FC<BaseListProps> = ({ onBaseChange }) => {
  const { loading, error, data } = useQuery(GET_ALL_SIZES_WITH_RELATED_BASES);

  if (loading) return <p>Loading bases...</p>;
  if (error) return <p>Error: {error.message}</p>;

const availableBases: { base: string; price: number }[] = [];

  data.getSizesWithBases.forEach((sizeWithBases: SizeWithRelatedBases) => {
    sizeWithBases.bases.forEach((base: BaseWithPrice) => {
      const baseName = base.base;
      const basePrice = base.price;
      availableBases.push({ base: baseName, price: basePrice });
    });
  });

  return (
    <div>
      <h1>Select a Base</h1>
      <BaseRadioButtons bases={availableBases} onBaseChange={onBaseChange} />
    </div>
  );
};

export default BaseList;
