import { create } from 'zustand';
import { ToppingType } from '../SharedTypes';
import apolloClient from '../../apolloClient'
import { GET_TOPPING_PRICES } from '../../queries/queries';

interface AllAvailableToppingsStoreProps {
  availableToppings: ToppingType[];
  loading: boolean;
  refetchToppings: (idSize: number) => Promise<void>;
}

export const useAllAvailableToppingsStore = create<AllAvailableToppingsStoreProps>((set) => ({
  availableToppings: [],
  loading: false,
  refetchToppings: async (idSize: number) => {
    try {
      // Set loading state to true while fetching
      set({ loading: true });

      // Use Apollo Client's fetchMore function to refetch data
      const { data } = await apolloClient.query({
        query: GET_TOPPING_PRICES,
        variables: { id_size: idSize },
        fetchPolicy: 'network-only', // Ensure data is always refetched from the server
      });

      // Update availableToppings when data changes and idSize is correct
      if (data && data.getToppingPricesBySize) {
        set({ availableToppings: data.getToppingPricesBySize });
      }

      // Set loading state back to false after fetching
      set({ loading: false });
    } catch (error) {
      console.error('Error refetching toppings:', error);

      // Set loading state back to false in case of an error
      set({ loading: false });
    }
  },
}));

