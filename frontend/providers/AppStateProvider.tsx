import React, { createContext, useState } from "react";
import { Venue } from "../configs/types";

const defaultState = {
  venues: [],
  setVenues: venues => {},
  venuesError: false,
  setVenuesError: error => {},
};

const AppStateContext = createContext(defaultState);

function AppStateProvider({ children }) {
  const [venues, setVenues] = useState<Venue[]>();
  const [venuesError, setVenuesError] = useState<boolean>(false);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>();
  return (
    <AppStateContext.Provider
      value={{
        venues,
        setVenues,
        venuesError,
        setVenuesError,
      }}>
      {children}
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
}

export { AppStateProvider, useAppState };
