import React, { createContext, useState } from "react";
import { Team, Venue } from "../configs/types";

const defaultState = {
  venues: [],
  setVenues: (venues: Venue[]) => {},
  venuesErrorState: false,
  setVenuesErrorState: (errorState: boolean) => {},
  teams: [],
  setTeams: (teams: Team[]) => {},
  teamsErrorState: false,
  setTeamsErrorState: (errorState: boolean) => {},
};

const AppStateContext = createContext(defaultState);

function AppStateProvider({ children }) {
  const [venues, setVenues] = useState<Venue[]>();
  const [venuesErrorState, setVenuesErrorState] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>();

  const [teamsErrorState, setTeamsErrorState] = useState<boolean>(false);
  return (
    <AppStateContext.Provider
      value={{
        venues,
        setVenues,
        venuesErrorState,
        setVenuesErrorState,
        teams,
        setTeams,
        teamsErrorState,
        setTeamsErrorState,
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
