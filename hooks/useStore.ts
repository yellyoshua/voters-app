import { createContext, useContext, Dispatch } from "react";
import { storeState, storeDispatchActions } from "../lib/collection/Store";

const initialState: storeState = { session: null, userCanView: [] };

export const StoreContext = createContext<[storeState, Dispatch<storeDispatchActions>]>([initialState, () => { }]);

export const useStore = () => {
  const context = useContext(StoreContext);
  return context;
};