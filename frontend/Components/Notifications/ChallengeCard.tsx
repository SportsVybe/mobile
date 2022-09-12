import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Challenge, Team } from "../../configs/types";
import { Photo } from "../Photo";

type Props = {
  challenge: Challenge;
  onClaim: () => void;
};

function ChallengeCard({ challenge, onClaim }: Props): JSX.Element {
  const [status, setStatus] = useState<string>("...");

  const [team1, setTeam1] = useState<Team>(
    challenge && challenge.get("challengeTeam1"),
  );
  const [team2, setTeam2] = useState<Team>(
    challenge && challenge.get("challengeTeam2"),
  );
  const getChallengeStatus = () => {
    if (
      challenge.get("challengeChainId") == "" &&
      !challenge.get("isCompleted") &&
      !challenge.get("isClosed") &&
      !challenge.get("isAcceptedOnChain") &&
      challenge.get("challengerActionId") == undefined
    ) {
      setStatus("Minting on chain...");
    } else if (
      challenge.get("challengeChainId") != "" &&
      !challenge.get("isCompleted") &&
      !challenge.get("isClosed") &&
      !challenge.get("isAcceptedOnChain") &&
      challenge.get("challengerActionId") == undefined
    ) {
      setStatus("Pending Challenger");
    } else if (
      challenge.get("isCompleted") &&
      challenge.get("isClosed") &&
      challenge.get("isAcceptedOnChain")
    ) {
      setStatus("Completed");
    } else if (
      !challenge.get("isCompleted") &&
      !challenge.get("isClosed") &&
      !challenge.get("isAcceptedOnChain") &&
      challenge.get("challengeChainId") &&
      challenge.get("challengerActionId")
    ) {
      setStatus("Minting Challenger Action...");
    } else if (challenge.get("isClosed") && !challenge.get("isCompleted")) {
      setStatus("Closed");
    } else if (
      !challenge.get("isClosed") &&
      !challenge.get("isCompleted") &&
      challenge.get("isAcceptedOnChain")
    ) {
      setStatus("Accepted");
    } else {
      setStatus("Error");
    }
  };

  useEffect(() => {
    getChallengeStatus();
  }),
    [challenge];

  return (
    <View style={styles.challengeCard}>
      <View>
        <View style={styles.challengeHeading}>
          <View>
            <TouchableOpacity>
              <View style={styles.challengeTeam}>
                <Photo
                  src={challenge && team1 && team1.get("teamPhoto")}
                  type="team"
                  isLoading={false}
                />
                <Text style={styles.title}>
                  {challenge && team1 && team1.get("teamName")}
                </Text>
                <Text>
                  {challenge && team1 && team1.get("teamPOS")
                    ? `${team1.get("teamPOS")}% `
                    : "100% "}
                  POS
                </Text>
                <Text>
                  {challenge &&
                    team1 &&
                    `${team1.get("teamWins")} Wins - ${team1.get(
                      "teamLosses",
                    )} Losses`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>VS</Text>
          <View>
            <TouchableOpacity>
              <View style={styles.challengeTeam}>
                <Photo
                  src={challenge && team2 && team2.get("teamPhoto")}
                  type="team"
                  isLoading={false}
                />
                <Text style={styles.title}>
                  {challenge && team2 && team2.get("teamName")}
                </Text>
                <Text>
                  {challenge && team2 && team2.get("teamPOS")
                    ? `${team2.get("teamPOS")}% `
                    : "100%"}
                  POS
                </Text>
                <Text>
                  {challenge &&
                    team2 &&
                    `${team2.get("teamWins")} Wins - ${team2.get(
                      "teamLosses",
                    )} Losses`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.challengeInfo}>
          <View style={styles.challengeDetail}>
            <Text style={styles.challengeTitle}>Prize Pool:</Text>
            <Text style={styles.challengeText}>
              {challenge && challenge.get("challengeAmount")} VYBE
            </Text>
            <Text style={styles.challengeAmount}>Est. $10(?)</Text>
          </View>
          <View style={styles.challengeDetail}>
            <Text style={styles.challengeTitle}>Challenge ID:</Text>
            <Text style={styles.challengeText}>
              {(challenge && challenge.get("challengeChainId")) || "Pending"}
            </Text>
          </View>
          <View style={styles.challengeDetail}>
            <Text style={styles.challengeTitle}>Status:</Text>
            <Text style={styles.challengeText}>{status}</Text>
          </View>
          <View style={styles.challengeDetail}>
            <Text>
              {challenge && challenge.get("challengeMessage") && (
                <>
                  <Text>Message:</Text>
                  <Text style={styles.challengeText}>
                    {challenge && challenge.get("challengeMessage")}
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onClaim}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChallengeCard;

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
  challengeCard: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  challengeHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  challengeTeam: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  challengeInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  challengeDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  challengeIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  challengeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  challengeAmount: {
    fontSize: 12,
    fontWeight: "normal",
    color: "darkgray",
    marginLeft: 10,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  challengeText: {
    fontSize: 14,
    fontWeight: "normal",
    marginLeft: 10,
  },
  challengeStatus: {
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
    width: 120,
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
