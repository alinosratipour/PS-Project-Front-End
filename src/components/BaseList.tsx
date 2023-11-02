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
};

type SizeWithRelatedBases = {
  bases: BaseWithPrice[];
};

const BaseList: React.FC<BaseListProps> = ({ onBaseChange }) => {
  const { loading, error, data } = useQuery(GET_ALL_SIZES_WITH_RELATED_BASES);

  if (loading) return <p>Loading bases...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const availableBaseNames: string[] = [];

  data.getSizesWithBases.forEach((sizeWithBases: SizeWithRelatedBases) => {
    sizeWithBases.bases.forEach((base: BaseWithPrice) => {
      const baseName = base.base;
      if (!availableBaseNames.includes(baseName)) {
        availableBaseNames.push(baseName);
      }
    });
  });

  return (
    <div>
      <h1>Select a Base</h1>
      <BaseRadioButtons bases={availableBaseNames} onBaseChange={onBaseChange} />
    </div>
  );
};

export default BaseList;
