import React from "react";
import { useMoralis } from "react-moralis";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useNotifications from "../../api/Moralis/useNotifications";
import ChallengeCard from "../../Components/Notifications/ChallengeCard";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function ChallengesScreen(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="ActiveChallenges"
      screenOptions={{
        presentation: "modal",
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="ActiveChallenges"
        component={ActiveChallenges}
        options={{ title: "Active Challenges" }}
      />
      <Stack.Screen
        name="CompleteChallenges"
        component={CompleteChallenges}
        options={{ title: "Complete Challenges" }}
      />
      <Stack.Screen
        name="CreatedChallenges"
        component={CreatedChallenges}
        options={{ title: "Created Challenges" }}
      />
    </Stack.Navigator>
  );
}

function ActiveChallenges() {
  const { user } = useMoralis();
  const { challenges } = useNotifications({
    username: user && user.get("username"),
  });
  const navigator = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("CompleteChallenges")}>
            <Text style={styles.buttonText}>
              {challenges && challenges.complete.length} Complete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigator.navigate("CreatedChallenges")}>
            <Text style={styles.buttonText}>
              {challenges && challenges.created.length} Created
            </Text>
          </TouchableOpacity>
        </View>

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

function CompleteChallenges() {
  const { user } = useMoralis();
  const { challenges } = useNotifications({
    username: user && user.get("username"),
  });

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
function CreatedChallenges() {
  const { user } = useMoralis();
  const { challenges } = useNotifications({
    username: user && user.get("username"),
  });

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

export default ChallengesScreen;

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
