import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useNotifications from "../../api/Moralis/useNotifications";
import RewardCard from "../../Components/Notifications/RewardCard";

import { useNavigation } from "@react-navigation/native";
import { Reward } from "../../configs/types";

export function AvailableRewardsStack() {
  const { rewards } = useNotifications();
  const navigator = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {rewards && rewards.available && rewards.available.length > 0 ? (
          rewards.available.map((reward: Reward) => (
            <RewardCard reward={reward} onClaim={() => alert("Claim")} />
          ))
        ) : (
          <Text style={styles.noRewards}>No rewards available</Text>
        )}
      </View>
    </ScrollView>
  );
}

export function ClaimedRewardsStack() {
  const { rewards } = useNotifications();

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {rewards && rewards.claimed && rewards.claimed.length > 0 ? (
          rewards.claimed.map((reward: Reward) => (
            <RewardCard reward={reward} onClaim={() => alert("Claim")} />
          ))
        ) : (
          <Text style={styles.noRewards}>No rewards claimed</Text>
        )}
      </View>
    </ScrollView>
  );
}

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
  rewardCard: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  rewardIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  noRewards: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rewardTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: { flexDirection: "row", marginBottom: 20 },
  rewardStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
  claimedIcon: {
    padding: 10,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#315399",
    borderRadius: 5,
    padding: 10,
    width: 125,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
