// new screen

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TeamsController } from "../../Components/Teams/TeamsController";

export const teamsData = [
  {
    name: "Team Name 1",
    pos: "100",
    record: "1-1-1",
    sports: ["basketball", "soccer", "football"],
    id: "1",
  },
  {
    name: "Team Name 2",
    pos: "200",
    record: "2-2-2",
    sports: ["tennis", "baseball", "volleyball"],
    id: "2",
  },
];
function TeamsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Teams</Text>
        <TeamsController />
      </View>
    </ScrollView>
  );
}

export default TeamsScreen;

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
  teamCard: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  teamPOS: {
    fontSize: 16,
    marginBottom: 10,
  },
  teamRecord: {
    fontSize: 16,
    marginBottom: 10,
  },
  teamSports: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#315399",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
