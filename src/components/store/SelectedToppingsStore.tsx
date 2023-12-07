// useToppingsStore.ts
import {create }from 'zustand';
import { ToppingType } from '../SharedTypes';

interface ToppingsStore {
  selectedToppings: ToppingType[];
  setSelectedToppings: (toppings: ToppingType[]) => void;
  toppingsTotal: number;
  setToppingsTotal: (total: number) => void;
}

export const useToppingsStore = create<ToppingsStore>((set) => ({
  selectedToppings: [],
  setSelectedToppings: (toppings) => set({ selectedToppings: toppings }),
  toppingsTotal: 0,
  setToppingsTotal: (total) => set({ toppingsTotal: total }),
}));
