import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  userData: any;
  isLoading: boolean;
};

function ProfileStats({ userData, isLoading }: Props): JSX.Element {
  console.log(userData);
  const navigation = useNavigation();
  return (
    <View style={styles.profileStats}>
      <View style={styles.profileStatsSection}>
        <View style={styles.profileStatsCard}>
          <Text style={styles.profileTextTitle}>Record (W-T-L):</Text>
          <Text>0-0-0</Text>
        </View>
        <View style={styles.profileStatsCard}>
          <Text style={styles.profileTextTitle}>Winnings:</Text>
          <Text>0 VYBE</Text>
        </View>
      </View>
      <View style={styles.profileStatsSection}>
        <View style={styles.profileStatsCard}>
          <Text style={styles.profileTextTitle}>Sportsmanship:</Text>
          <Text>100%</Text>
        </View>
        <View style={styles.profileStatsCard}>
          <Text style={styles.profileTextTitle}>Sport Preferences:</Text>
          <Text>Basketball</Text>
        </View>
      </View>
    </View>
  );
}

export default ProfileStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profile: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileNotifications: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexDirection: "column",
  },
  profileHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    flex: 1,
    marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  profileAccountInfo: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileNotificationsBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#315399",
    padding: 5,
    borderRadius: 5,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  profileStats: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "column",
  },
  profileStatsSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileStatsCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
