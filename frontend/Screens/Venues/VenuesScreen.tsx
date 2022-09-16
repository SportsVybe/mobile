import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VenuesController } from "../../Components/Venues/VenuesController";

function VenuesScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Venues</Text>
          <TouchableOpacity onPress={() => navigation.navigate("VenuesFilter")}>
            <FontAwesomeIcon icon={faFilter} size={20} />
          </TouchableOpacity>
        </View>
        <VenuesController />
      </View>
    </ScrollView>
  );
}

export default VenuesScreen;

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
    marginTop: 10,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});
