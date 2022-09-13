import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useNotifications from "../../api/Moralis/useNotifications";
import ChallengeCard from "../../Components/Notifications/ChallengeCard";

import { useNavigation } from "@react-navigation/native";

export function ActiveChallengesStack() {
  const { challenges } = useNotifications();
  const navigator = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {challenges && challenges.active && challenges.active.length > 0 ? (
          challenges.active.map(challenge => (
            <ChallengeCard
              challenge={challenge}
              onClaim={() => alert("Challenge")}
            />
          ))
        ) : (
          <Text style={styles.title}>No Active Challenges</Text>
        )}
      </View>
    </ScrollView>
  );
}

export function CompleteChallengesStack() {
  const { challenges } = useNotifications();

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {challenges && challenges.complete && challenges.complete.length > 0 ? (
          challenges.complete.map(challenge => (
            <ChallengeCard
              challenge={challenge}
              onClaim={() => alert("Challenge")}
            />
          ))
        ) : (
          <Text style={styles.title}>No Complete Challenges</Text>
        )}
      </View>
    </ScrollView>
  );
}

export function CreatedChallengesStack() {
  const { challenges } = useNotifications();

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {challenges && challenges.created && challenges.created.length > 0 ? (
          challenges.created.map(challenge => (
            <ChallengeCard
              challenge={challenge}
              onClaim={() => alert("Challenge")}
            />
          ))
        ) : (
          <Text style={styles.title}>No Challenges Created</Text>
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
  buttonContainer: { flexDirection: "row", marginBottom: 20 },
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
