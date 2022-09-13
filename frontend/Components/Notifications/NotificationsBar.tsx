import { faInbox, faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
      <View style={styles.notificationsBox}>
        <View style={styles.titleBox}>
          <FontAwesomeIcon style={styles.icon} icon={faStar} size={30} />
          <Text style={styles.title}>Rewards:</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("AvailableRewards")}>
            <Text style={styles.buttonText}>{rewards} Available</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("ClaimedRewards")}>
            <Text style={styles.buttonText}>Claimed</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.notificationsBox}>
        <View style={styles.titleBox}>
          <FontAwesomeIcon style={styles.icon} icon={faTrophy} size={30} />
          <Text style={styles.title}>Challenges:</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("ActiveChallenges")}>
            <Text style={styles.buttonText}>{challenges} Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("CompleteChallenges")}>
            <Text style={styles.buttonText}>Created</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("CreatedChallenges")}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.notificationsBox}>
        <View style={styles.titleBox}>
          <FontAwesomeIcon style={styles.icon} icon={faInbox} size={30} />
          <Text style={styles.title}>Invites:</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("ChallengesScreen")}>
            <Text style={styles.buttonText}>{invites} Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("ChallengesScreen")}>
            <Text style={styles.buttonText}>Accepted</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("ChallengesScreen")}>
            <Text style={styles.buttonText}>Sent</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default NotificationsBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationsBox: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: 150,
    marginBottom: 30,
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    margin: 15,
  },
  text: {
    fontSize: 30,
  },
  buttonContainer: { flexDirection: "row", marginBottom: 20 },

  button: {
    backgroundColor: "#315399",
    borderRadius: 5,
    padding: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
