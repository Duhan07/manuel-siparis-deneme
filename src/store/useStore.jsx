import { createStore } from "zustand";

export const basketStore = createStore((set) => ({
  basket: [],
  setBasket: (value) => set({ basket: value }),
}));

export const customerStore = createStore((set) => ({
  customerInfo: [],
  setCustomerInfo: (customerInfo) => set({ customerInfo }),
  customerType: "personel",
  setCustomerType: (value) => set({ customerType: value }),
}));

export const productStore = createStore((set) => ({
  selectedBuilding: undefined,
  setSelectedBuilding: (value) => set({ selectedBuilding: value }),
  selectedBrand: undefined,
  setSelectedBrand: (value) => set({ selectedBrand: value }),
}));
