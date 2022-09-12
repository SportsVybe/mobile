import { useNavigation } from "@react-navigation/native";
import React, { Suspense } from "react";
import { StyleSheet, Text, View } from "react-native";
import { User } from "../../configs/types";
import { capitalizeWord } from "../../helpers/formatters";

type Props = {
  userData: User;
  isLoading: boolean;
};

function ProfileStats({ userData, isLoading }: Props): JSX.Element {
  const navigation = useNavigation();
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.profileStats}>
        <View style={styles.profileStatsSection}>
          <View style={styles.profileStatsCard}>
            <Text style={styles.profileTextTitle}>Record (W-T-L):</Text>
            <Text>
              {userData && userData.get("userWins")}-0-
              {userData && userData.get("userLosses")}
            </Text>
          </View>
          <View style={styles.profileStatsCard}>
            <Text style={styles.profileTextTitle}>Winnings:</Text>
            <Text>{userData && userData.get("userWinnings")} VYBE</Text>
          </View>
        </View>
        <View style={styles.profileStatsSection}>
          <View style={styles.profileStatsCard}>
            <Text style={styles.profileTextTitle}>Sportsmanship:</Text>
            <Text>{userData && userData.get("userPOS")}%</Text>
          </View>
          <View style={styles.profileStatsCard}>
            <Text style={styles.profileTextTitle}>Sport Preferences:</Text>
            <Text style={styles.profilePreferences}>
              {userData &&
                userData.get("userSportsPreferences") &&
                userData
                  .get("userSportsPreferences")
                  .map((sport: string, i: number) => {
                    return (
                      <Text key={i}>
                        {capitalizeWord(sport)}
                        {"\n"}
                      </Text>
                    );
                  })}
            </Text>
          </View>
        </View>
      </View>
    </Suspense>
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
  profilePreferences: {
    textAlign: "center",
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
    marginBottom: 5,
    marginTop: 20,
    flexDirection: "column",
  },
  profileStatsSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  profileStatsCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});
