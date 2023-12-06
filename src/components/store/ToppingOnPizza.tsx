// toppingsStore.ts
import {create }from 'zustand';
import { ToppingType } from '../SharedTypes';

interface ToppingsStore {
  removedToppings: ToppingType[];
  setRemovedToppings: (toppings: ToppingType[] | ((prevToppings: ToppingType[]) => ToppingType[])) => void;
}

export const useToppingsStore = create<ToppingsStore>((set) => ({
  removedToppings: [],
  setRemovedToppings: (toppings) => set((state) => ({ removedToppings: typeof toppings === 'function' ? toppings(state.removedToppings) : toppings })),
}));
