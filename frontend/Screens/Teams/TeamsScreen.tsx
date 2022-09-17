// new screen

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TeamsController } from "../../Components/Teams/TeamsController";

function TeamsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
        // onPress={() => navigation.navigate("TeamsFilter")}
        >
          <View style={styles.headerRow}>
            <Text style={styles.title}>Teams</Text>
            <FontAwesomeIcon icon={faFilter} size={20} />
          </View>
        </TouchableOpacity>
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
    marginBottom: 5,
    marginRight: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    maxWidth: 350,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 10,
  },
});
