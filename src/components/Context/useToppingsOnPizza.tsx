import {create} from 'zustand';
import { ToppingType } from '../SharedTypes';
import apolloClient from '../../apolloClient'
import { GET_TOPPINGS_ON_PIZZA } from '../../queries/queries';
interface useToppingsOnPizza {
  toppingsForPizza: ToppingType[];
  setToppingsForPizza: (toppings: ToppingType[]) => void;
  toppingsData: any; // You might want to replace this with the actual type
  toppingsError: any; // You might want to replace this with the actual type
  setToppingsData: (data: any) => void; // You might want to replace this with the actual type
  setToppingsError: (error: any) => void; // You might want to replace this with the actual type
  fetchToppings: (pizzaId: number) => void;
}

export const useToppingsOnPizza = create<useToppingsOnPizza>((set) => ({
  toppingsForPizza: [],
  setToppingsForPizza: (toppings) => set({ toppingsForPizza: toppings }),
  toppingsData: null,
  toppingsError: null,
  setToppingsData: (data) => set({ toppingsData: data }),
  setToppingsError: (error) => set({ toppingsError: error }),
  fetchToppings: async (pizzaId) => {
    try {
      const result = await apolloClient.query({
        query: GET_TOPPINGS_ON_PIZZA,
        variables: { id_pizza: pizzaId },
      });
      console.log("kkkk",result);
      
      set({ toppingsData: result.data, toppingsError: null });
    } catch (error) {
      set({ toppingsError: error, toppingsData: null });
    }
    
  },
}));
