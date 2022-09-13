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
          <Text>No venues found. Try another search</Text>
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
  },
});
