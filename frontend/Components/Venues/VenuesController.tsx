import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAllVenues } from "../../api/aws";
import { useAppState } from "../../providers/AppStateProvider";
import VenuesView from "./VenuesView";

export const VenuesController = () => {
  const {
    venues,
    setVenues,
    venuesErrorState,
    setVenuesErrorState,
    userLocation,
  } = useAppState();
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchVenues = async () => {
    setIsLoading(true);
    try {
      const response = await getAllVenues();
      if (!response || !response.statusCode) return [];
      if (response.statusCode === 200) return response.data;
      if (response.statusCode === 404) return [];
      if (response.statusCode === 500) setVenuesErrorState(true);
      return [];
    } catch (error) {
      console.error(`Error fetching venues: ${error.toString()}`);
    }
  };

  useEffect(() => {
    fetchVenues()
      .then(setVenues)
      .then(() => setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
        setVenuesErrorState(true);
      });
  }, []);

  return venues && !isLoading ? (
    <View style={styles.container}>
      <VenuesView venues={venues} isLoading={isLoading} />
    </View>
  ) : (
    <View>
      <Text>
        {!venuesErrorState
          ? "Loading...."
          : "Error! Please try another search or refresh the page"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
