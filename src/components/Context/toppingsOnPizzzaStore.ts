// toppingsOnPizzaStore.ts
import { create } from 'zustand';
import { ToppingType } from '../SharedTypes';
import { useQuery } from '@apollo/client';
import { GET_TOPPINGS_ON_PIZZA } from '../../queries/queries';

interface ToppingsOnPizzaStore {
    selectedToppingsOnPizza: number[];
  toggleTopping: (toppingId: number) => void;
  clearSelection: () => void;
  fetchToppingsOnPizza: (pizzaId: number) => Promise<void>;
  toppingsOnPizza: ToppingType[];
  loading: boolean;
  error?: Error | undefined;
}

export const useToppingsOnPizzaStore = create<ToppingsOnPizzaStore>((set) => ({
    selectedToppingsOnPizza: [],
  toggleTopping: (toppingId: number) => {
    set((state) => {
      const isSelected = state.selectedToppingsOnPizza.includes(toppingId);
      const updatedSelection = isSelected
        ? state.selectedToppingsOnPizza.filter((id) => id !== toppingId)
        : [...state.selectedToppingsOnPizza, toppingId];

      return { ...state, selectedToppings: updatedSelection }; // Corrected line
    });
  },
  clearSelection: () => set({ selectedToppingsOnPizza: [] }),
  fetchToppingsOnPizza: async (pizzaId: number) => {
    try {
      // Use the useQuery hook to fetch toppings directly
      const { loading, data } = await useQuery<{ getToppingsOnPizza: ToppingType[] }>(
        GET_TOPPINGS_ON_PIZZA,
        {
          variables: { id_pizza: pizzaId },
        }
      );

      // Set loading state
      set({ loading });

      // Update toppingsOnPizza when data changes
      if (data && data.getToppingsOnPizza) {
        set({ toppingsOnPizza: data.getToppingsOnPizza, error: undefined });
      }
    } catch (error) {
      console.error('Error fetching toppings:', error);
      // Set error state in case of an error
      set({ loading: false, error: error as Error });
    }
  },
  toppingsOnPizza: [], // Initialize with an empty array or fetch data dynamically
  loading: false,
  error: undefined,
}));
