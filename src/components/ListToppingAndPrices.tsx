import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_PIZZAS_WITH_SIZES_AND_PRICES,
  GET_TOPPING_PRICES,
  GET_ALL_SIZES_WITH_RELATED_BASES,
} from "../queries/queries";

import SizePrice from "./SizePrice";
import ToppingsList from "./ToppingsList";
import SizeRadioButtons from "./UI-Liberary/SizeRadioButton/SizeRadioButtons";
import BaseList from "./BaseList";
import { If } from "tsx-control-statements/components";
import { useAvailableBases } from "./Context/AvailableBasesContext";

interface ListToppingAndPricesProps {
  pizzaId: number;
  onSizePriceChange: (
    price: number | undefined,
    sizeName: string | undefined
  ) => void;
  onBaseChange: (base: string | undefined) => void;
}

interface ToppingType {
  id_size: number;
  name: string;
  price: number;
}

interface SizeType {
  id_size: number;
  p_size: string;
  price_topping: number;
  price: number;
  bases: {
    id_base: number;
    price: number;
    base: string;
  }[];
}

function ListToppingAndPrices({
  pizzaId,
  onSizePriceChange,
  onBaseChange,
}: ListToppingAndPricesProps) {
  const [sizes, setSizes] = useState<SizeType[]>([]);
  const [selectedSize, setSelectedSize] = useState<number>(1);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
 
  const [selectedBasePrice, setSelectedBasePrice] = useState<number | undefined>(0); // Initialize with 0
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);

  const [selectedBase, setSelectedBase] = useState<string | undefined>("");
  const { availableBases } = useAvailableBases();

  // Query for sizes data if it's not available
  const { loading: sizesLoading, data: sizesData } = useQuery(
    GET_PIZZAS_WITH_SIZES_AND_PRICES
  );

  const { data: baseData } = useQuery(GET_ALL_SIZES_WITH_RELATED_BASES);

  // Query for topping data
  const {
    loading,
    error,
    data: toppingData,
  } = useQuery<{ getToppingPricesBySize: ToppingType[] }>(GET_TOPPING_PRICES, {
    variables: { id_size: Number(selectedSize) },
  });

  useEffect(() => {
    if (!sizesLoading && sizesData) {
      const pizzaSizesData = sizesData.getpizzasWithSizesAndPrices.find(
        (pizza: any) => pizza.id_pizza === pizzaId
      );

      if (pizzaSizesData) {
        const availableSizes = pizzaSizesData.sizesWithPrices;
        setSizes(availableSizes);

        const initialSelectedSizeData = availableSizes[0];
        if (initialSelectedSizeData) {
          setSelectedSize(initialSelectedSizeData.id_size);
          setSelectedSizePrice(initialSelectedSizeData.price);
          

          if (initialSelectedSizeData.bases && initialSelectedSizeData.bases.length > 0) {
            setSelectedBasePrice(initialSelectedSizeData.bases[0].price);
          } else {
            setSelectedBasePrice(0); // Handle the case when no bases are available for the selected size.
          }


        }
      }
    }
  }, [sizesLoading, sizesData, pizzaId]);

  const handleSizeChange = (newSize: number) => {
    setSelectedSize(newSize);
    const newSelectedSizeData = sizes.find(
      (sizeData) => sizeData.id_size === newSize
    );

    if (newSelectedSizeData) {
      setSelectedSizePrice(newSelectedSizeData.price);
      onSizePriceChange(newSelectedSizeData.price, newSelectedSizeData.p_size);
      setIsSizeSelected(true);

      if (baseData && baseData.getSizesWithBases) {
        const selectedSizeData = baseData.getSizesWithBases.find(
          (sizeWithBases) => sizeWithBases.id_size === String(newSize)
        );
        
        if (selectedSizeData) {
          const basesForSelectedSize = selectedSizeData.bases;
         // console.log("Bases for Selected Size:", basesForSelectedSize);
//console.log("selectedBasePrice",selectedBasePrice);

          // You can process the bases for the selected size here if needed.
          // For now, I'll assume you want to get the base price of the first base.
          if (basesForSelectedSize.length > 0) {
           
            setSelectedBasePrice(basesForSelectedSize[0].price);
          
          } else {
            setSelectedBasePrice(0); // Handle the case when no bases are available for the selected size.
          }
        } else {
          setSelectedBasePrice(0); // Handle the case when the size is not found.
        }
      }
    }
  };

  const handleBaseChange = (newBase: string) => {
    setSelectedBase(newBase);
    onBaseChange(newBase);
  };

  if (sizesLoading) return "Loading sizes...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Topping Prices</h1>
      <SizeRadioButtons sizes={sizes} onSizeChange={handleSizeChange} />

      <If condition={isSizeSelected}>
        <BaseList
          onBaseChange={handleBaseChange}
          selectedBase={selectedBase}
          selectedSize={selectedSize}
        />
      </If>

      <SizePrice selectedSizePrice={selectedSizePrice} size="" />
      <ToppingsList toppingData={toppingData?.getToppingPricesBySize} />
    </div>
  );
}

export default ListToppingAndPrices;
