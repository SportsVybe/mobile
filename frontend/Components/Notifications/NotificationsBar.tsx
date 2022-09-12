import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  invites: number;
  challenges: number;
  rewards: number;
  isLoading: boolean;
};

function NotificationsBar({
  rewards,
  challenges,
  invites,
  isLoading,
}: Props): JSX.Element {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.notificationsBox}
        onPress={() => navigator.navigate("RewardsScreen")}>
        <Text style={styles.title}>Rewards:</Text>
        <Text style={styles.text}>{rewards}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notificationsBox}
        onPress={() => navigator.navigate("ChallengesScreen")}>
        <Text style={styles.title}>Challenges:</Text>
        <Text style={styles.text}>{challenges}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationsBox}>
        <Text style={styles.title}>Invites:</Text>
        <Text style={styles.text}>{invites}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NotificationsBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  notificationsBox: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: 100,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  text: {
    fontSize: 30,
  },
});
