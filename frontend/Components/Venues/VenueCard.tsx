// import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Venue } from "../../configs/types";
import { calcDistance } from "../../helpers/calcDistance";
import { capitalizeWords, formatAddress } from "../../helpers/formatters";
import { useAppState } from "../../providers/AppStateProvider";

type Props = {
  venue: Venue;
};

export const VenueCard = ({ venue }: Props) => {
  const { userLocation } = useAppState();
  return (
    <View style={styles.venueCard}>
      <View>
        {venue.status === 4 ? (
          <Text style={styles.featuredFont}>Featured</Text>
        ) : null}
        {/* <Photo src={venue.photo || ""} type="park" isLoading={false} />
         */}
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={require("../../assets/images/venue1.jpg")}
          />
        </View>
        <Text style={styles.venueName}>{capitalizeWords(venue.name)}</Text>

        <Text style={styles.titleText}>Distance away:</Text>
        <Text style={styles.venueAddress}>
          {`${
            calcDistance(
              userLocation.lat,
              userLocation.lng,
              venue.coordinates.latitude,
              venue.coordinates.longitude,
              "M",
            ) || 0
          } Miles`}
        </Text>
        <Text style={styles.titleText}>Address:</Text>
        <Text style={styles.venueAddress}>{formatAddress(venue.address)}</Text>
        <Text style={styles.titleText}>Activities:</Text>
        <View style={styles.sportPreferences}>
          {venue.availableActivities &&
            venue.availableActivities.map((activity: string, i: number) => {
              return (
                <Text style={styles.activityText} key={i}>
                  {capitalizeWords(activity)} |{" "}
                </Text>
              );
            })}
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert("Check-in");
          }}>
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalRule}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  venueCard: {
    width: "95%",
    maxWidth: 350,
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  activityText: {
    fontSize: 13,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featuredFont: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  preferences: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  sportPreferences: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  venueName: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
  },
  venueAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#315399",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  horizontalRule: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    marginTop: 15,
  },
});
