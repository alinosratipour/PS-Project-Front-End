import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOPPINGS_ON_PIZZA } from '../../queries/queries';
import { ToppingType } from '../SharedTypes';

const useToppingsForPizza = ( pizzaId: number) => {
  const [toppingsForPizza, setToppingsForPizza] = useState<ToppingType[]>([]);
  const { data: toppingsData, error: toppingsError, refetch } = useQuery(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  useEffect(() => {
    if (toppingsData && toppingsData.getToppingsOnPizza) {
      const toppingsForPizza = toppingsData.getToppingsOnPizza;

      if (toppingsForPizza.length > 0) {
        setToppingsForPizza(toppingsForPizza);
      } else {
        console.log('No toppings found for this pizza.');
      }
    }
  }, [toppingsData, toppingsError]);

  return {
    toppingsForPizza,
    toppingsData,
    toppingsError,
    refetchToppings: refetch, // Rename this function accordingly
  };
};

export default useToppingsForPizza;
