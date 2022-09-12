import {
  faCheck,
  faCheckDouble,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Reward } from "../../configs/types";

type Props = {
  reward: Reward;
  onClaim: () => void;
};

function RewardCard({ reward, onClaim }: Props): JSX.Element {
  return (
    <View style={styles.rewardCard}>
      <View style={styles.rewardIcon}>
        <FontAwesomeIcon icon={faMoneyBillWave} color={"black"} size={30} />
      </View>
      <View>
        <Text style={styles.rewardName}>
          {reward &&
            reward.get("amount") &&
            `${reward.get("amount") / 10 ** 18} VYBE`}
        </Text>
        <Text style={styles.rewardTitle}>
          {reward &&
            reward.get("createdAt") &&
            new Date(reward.get("createdAt")).toLocaleDateString()}
        </Text>
        <Text style={styles.rewardStatus}>
          Status:
          {reward.get("confirmed")
            ? !reward.get("isClaimed")
              ? " Ready to Claim"
              : reward.get("isClaimed") && reward.get("claimConfirmed")
              ? " Claimed"
              : " Processing Claim..."
            : " Processing..."}
        </Text>
      </View>
      <View style={styles.claimedIcon}>
        {!reward.get("isClaimed") && reward.get("confirmed") ? (
          <TouchableOpacity
            style={styles.button}
            disabled={!reward.get("confirmed") || reward.get("isClaimed")}
            //   onClick={() => claimRewardHandler()}

            onPress={() => alert("Claim")}>
            <Text style={styles.buttonText}>Claim</Text>
          </TouchableOpacity>
        ) : reward.get("isClaimed") && reward.get("claimConfirmed") ? (
          <FontAwesomeIcon icon={faCheckDouble} color={"black"} size={30} />
        ) : (
          <FontAwesomeIcon icon={faCheck} color={"black"} size={30} />
        )}
      </View>
    </View>
  );
}

export default RewardCard;

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
  rewardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rewardTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
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
    width: 75,
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
