import React, { Suspense } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Venue } from "../../configs/types";
import { VenueCard } from "./VenueCard";

type Props = {
  venues: Venue[];
  isLoading: boolean;
};

export default function VenuesView({ venues, isLoading }: Props) {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        {venues && !isLoading && venues.length > 0 ? (
          venues.map((venue, i) => {
            return <VenueCard venue={venue} key={venue.id} />;
          })
        ) : (
          <View style={styles.notFoundView}>
            <Text style={styles.notFoundText}>
              No venues found. Try another search
            </Text>
          </View>
        )}
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  notFoundView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 500,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    maxWidth: 350,
  },
});
