import React from "react";
import { Image, StyleSheet, View } from "react-native";

type Props = {
  src: string;
  type: "profile" | "event" | "team" | "venue" | "park";
  isLoading: boolean;
};

export const Photo = ({ src, type, isLoading = true }: Props) => {
  const setPlaceholderImg = (type: string) => {
    switch (type) {
      case "profile":
        return profileImg();
      case "team":
        return teamImg();
      default:
        break;
    }
  };

  return (
    <View>
      {!isLoading && src !== undefined && src !== "" ? (
        <Image
          style={styles.image}
          source={{
            uri: src,
          }}
        />
      ) : (
        setPlaceholderImg(type)
      )}
    </View>
  );
};

const profileImg = () => {
  return (
    <Image
      style={styles.image}
      source={require("../assets/images/placeholders/profile_placeholder.png")}
    />
  );
};

const eventImg = () => {
  return (
    <Image
      style={styles.image}
      source={require("../assets/images/placeholders/event_placeholder.png")}
    />
  );
};

const teamImg = () => {
  return (
    <Image
      style={styles.image}
      source={require("../assets/images/placeholders/team_placeholder.png")}
    />
  );
};

const venueImg = () => {
  return (
    <Image
      style={styles.image}
      source={require("../assets/images/placeholders/venue_placeholder.png")}
    />
  );
};

const parkImg = () => {
  return (
    <Image
      style={styles.image}
      source={require("../assets/images/placeholders/park_placeholder.png")}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    padding: 10,
    marginVertical: 10,
  },
});
