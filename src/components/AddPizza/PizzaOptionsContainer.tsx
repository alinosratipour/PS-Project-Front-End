import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { If } from "tsx-control-statements/components";
import {
  GET_PIZZAS_WITH_SIZES_AND_PRICES,
  GET_ALL_SIZES_WITH_RELATED_BASES,
} from "../../queries/queries";
import SizePrice from "./SizePrice";
import ToppingsList from "./ToppingsList";
import SizeRadioButtons from "../UI-Liberary/SizeRadioButton/SizeRadioButtons";
import BaseRadioButtons from "../UI-Liberary/BaseRadioButton/BaseRadioButtons";
import { BaseWithPrice, SizeWithPrice, ToppingType } from "../SharedTypes";
import { useSizeContext } from "../Context/SizeContext";
import { useBaseContext } from "../Context/BaseContext";
import { useAllAvailableToppingsStore } from "../store/AllAvailableToppingsStore";
import PizzaToppings from "./PizzaToppings";
import AccordionMenu from "../UI-Liberary/AccordionMenu/AccordionMenu";
import "./PizzaOptionsContainer.scss";

interface PizzaOptionsContainerProps {
  pizzaId: number;
  onSizePriceChange: (
    price: number | undefined,
    sizeName: string | undefined
  ) => void;
  onBaseChange: (base: string | undefined, price: number) => void;
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  initialSize?: string;
}

const PizzaOptionsContainer = ({
  pizzaId,
  onSizePriceChange,
  onBaseChange,
  onAddTopping,
  onRemoveTopping,
  initialSize,
}: PizzaOptionsContainerProps) => {
  const { availableSizes, setSizes } = useSizeContext();
  const { availableBases, setAvailableBases, refetchBases } = useBaseContext();
  const { availableToppings, refetchToppings } = useAllAvailableToppingsStore();
  const [selectedSize, setSelectedSize] = useState<number>(1);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);

  const { loading: sizesLoading, data: sizesData } = useQuery(
    GET_PIZZAS_WITH_SIZES_AND_PRICES
  );
  const { data: Bases } = useQuery<{ getBasesPricesBySize: BaseWithPrice[] }>(
    GET_ALL_SIZES_WITH_RELATED_BASES,
    {
      variables: { id_size: Number(selectedSize) },
    }
  );

  useEffect(() => {
    if (!sizesLoading && sizesData) {
      const pizzaSizesData = sizesData.getpizzasWithSizesAndPrices.find(
        (pizza: any) => pizza.id_pizza === pizzaId
      );
      if (pizzaSizesData) {
        const availableSizes = pizzaSizesData.sizesWithPrices;
        setSizes(availableSizes);

        const initialSelectedSizeData = availableSizes.find(
          (sizeData: SizeWithPrice) => sizeData.p_size === initialSize
        );

        if (initialSelectedSizeData) {
          setSelectedSize(initialSelectedSizeData.id_size);
          setSelectedSizePrice(initialSelectedSizeData.price);
          onSizePriceChange(
            initialSelectedSizeData.price,
            initialSelectedSizeData.p_size
          );
          setIsSizeSelected(true);
        }
      }
    }
  }, [sizesLoading, sizesData, pizzaId, initialSize]);

  useEffect(() => {
    if (Bases && Bases.getBasesPricesBySize) {
      setAvailableBases(Bases.getBasesPricesBySize);
    }
  }, [Bases]);

  const handleSizeChange = (sizeId: number) => {
    setSelectedSize(sizeId);
    const newSelectedSizeData = availableSizes.find(
      (sizeData) => sizeData.id_size === sizeId
    );

    if (newSelectedSizeData) {
      setSelectedSizePrice(newSelectedSizeData.price);
      onSizePriceChange(newSelectedSizeData.price, newSelectedSizeData.p_size);
      setIsSizeSelected(true);
      refetchToppings(sizeId);
      refetchBases(sizeId);
    }
  };

  const handleBaseChange = (newBase: string) => {
    const selectedBase = Bases?.getBasesPricesBySize.find(
      (item) => item.base === newBase
    );
    const basePrice = selectedBase ? selectedBase.price : 0;
    onBaseChange(newBase, basePrice);
  };

  if (sizesLoading) return "Loading sizes...";

  return (
    <div>
      <div className="SizeRadioButton">
        <h2 className="SizeTitle">Choose Size</h2>
        <SizeRadioButtons
          sizes={availableSizes}
          onSizeChange={handleSizeChange}
        />
      </div>

      <If condition={isSizeSelected}>
        <>
          <div className="BaseRadioButton">
            <h2 className="BaseTitle">Choose Base</h2>
            <BaseRadioButtons
              bases={availableBases}
              onBaseChange={handleBaseChange}
            />
          </div>

          <div className="AccordionMenu-Wrapper">
            <AccordionMenu title="Customise Toppings">
              <div className="PizzaToppings">
                <h3 className="PizzaToppingTitle">Your Toppings</h3>
                <PizzaToppings pizzaId={pizzaId} />
              </div>

              <ToppingsList
                availableToppings={availableToppings}
                onAddTopping={onAddTopping}
                onRemoveTopping={onRemoveTopping}
              />
            </AccordionMenu>
          </div>
        </>
      </If>

      <If condition={selectedSizePrice}>
        <div className="PizzaPrice">
          <SizePrice selectedSizePrice={selectedSizePrice} size="" />
        </div>
      </If>
    </div>
  );
};

export default PizzaOptionsContainer;
