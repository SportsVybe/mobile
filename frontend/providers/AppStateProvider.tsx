import Geolocation from "@react-native-community/geolocation";
import React, { createContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Team, Venue } from "../configs/types";

const defaultState = {
  userLocation: {
    lat: 0,
    lng: 0,
  },
  venues: [],
  setVenues: (venues: Venue[]) => {},
  venuesErrorState: false,
  setVenuesErrorState: (errorState: boolean) => {},
  teams: [],
  setTeams: (teams: Team[]) => {},
  teamsErrorState: false,
  setTeamsErrorState: (errorState: boolean) => {},
  venueFilters: {
    sport: "featured",
    distance: 5,
    sort: "distance",
  },
  setVenueFilters: (filters: object) => {},
};

const AppStateContext = createContext(defaultState);

function AppStateProvider({ children }) {
  const { user } = useMoralis();
  const [venues, setVenues] = useState<Venue[]>();
  const [venuesErrorState, setVenuesErrorState] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>();
  const [teamsErrorState, setTeamsErrorState] = useState<boolean>(false);
  const [teamsFilters, setTeamsFilters] = useState<object>({
    sport: "featured",
    posRange: [0, 100],
    wins: 0,
    losses: 0,
    ties: 0,
  });
  const [venueFilters, setVenueFilters] = useState<any>({
    sport: "featured",
    distance: 5,
    sort: "distance",
  });

  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const getUserLocation = async () => {
    Geolocation.watchPosition(
      position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  useEffect(() => {
    if (user) {
      getUserLocation();
    }
  }, [user]);

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
        venueFilters,
        setVenueFilters,
        userLocation,
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
