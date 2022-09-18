import { Picker } from "@react-native-community/picker";
import Slider from "@react-native-community/slider";
import React, { Suspense, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { sports } from "../../configs/constants";
import { Team } from "../../configs/types";
import { capitalizeWord } from "../../helpers/formatters";
import { useAppState } from "../../providers/AppStateProvider";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";

export default function TeamsFilterView({ navigation }) {
  const { cloudFunction } = useCustomMoralis();
  const selectMenu = ["all", ...sports];
  const [isSearching, setIsSearching] = useState(false);
  const {
    setTeams,
    setTeamsErrorState,
    teamsFilters,
    setTeamsFilters,
  } = useAppState();
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [POSModalVisible, setPOSModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const fetchSearchTeams = async (
    attribute: string,
    value: string | boolean,
  ) => {
    if (!attribute || !value) return;
    setIsSearching(true);
    try {
      const data = await cloudFunction("getTeamByAttribute", {
        attribute: attribute,
        value: value,
        activeStatus: true,
      });
      if (data.success) {
        return data.data;
      }
    } catch (error) {
      console.error(`Error searching teams: ${error.toString()}`);
    }
  };

  const sortTeams = (teams: Team[]): Team[] => {
    if (teamsFilters.sort === "POS") {
      return teams.sort((a, b) => Number(a.teamPOS) - Number(b.teamPOS));
    }
    if (teamsFilters.sort === "name") {
      return teams.sort((a, b) => a.teamName.localeCompare(b.teamName));
    }
    return teams;
  };

  const limitByPOS = (teams: Team[]): Team[] => {
    return teams.filter(
      team => Number(team.get("teamPOS")) >= Number(teamsFilters.minPOS),
    );
  };

  const applySearch = () => {
    let searchValue: string | boolean;
    let searchAttribute: string;
    if (teamsFilters.sport === "all") {
      searchValue = true;
      searchAttribute = "isTeamActive";
    } else {
      searchValue = teamsFilters.sport;
      searchAttribute = "teamSportsPreferences";
    }

    fetchSearchTeams(searchAttribute, searchValue)
      .then(limitByPOS)
      .then(sortTeams)
      .then(setTeams)
      .then(() => setIsSearching(false))
      .then(() => navigation.navigate("TeamsScreen"))
      .catch(error => {
        setIsSearching(false);
        setTeamsErrorState(true);
      });
  };

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterTitle}>Sport:</Text>
              <TouchableOpacity
                style={styles.filterValue}
                onPress={() => setSportModalVisible(true)}>
                <Text style={styles.filterValueText}>
                  {capitalizeWord(teamsFilters.sport.toString())}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterTitle}>POS:</Text>
              <TouchableOpacity
                style={styles.filterValue}
                onPress={() => setPOSModalVisible(true)}>
                <Text style={styles.filterValueText}>
                  {teamsFilters.minPOS.toString()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterTitle}>Sort:</Text>
              <TouchableOpacity
                style={styles.filterValue}
                onPress={() => setSortModalVisible(true)}>
                <Text style={styles.filterValueText}>
                  By {teamsFilters.sort}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterRow}
              disabled={isSearching}
              onPress={() => applySearch()}>
              <View style={styles.applyButton}>
                <Text style={styles.buttonText}>
                  {isSearching ? "Searching..." : "Apply"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          style={styles.modalContainer}
          visible={sportModalVisible}>
          <View style={styles.filterCol}>
            <Text style={styles.modalTitle}>Sport:</Text>
            <Picker
              selectedValue={teamsFilters.sport}
              mode="dropdown"
              style={styles.picker}
              onValueChange={(itemValue: string, itemIndex) => {
                setTeamsFilters({ ...teamsFilters, sport: itemValue });
              }}>
              {selectMenu.map((item, i) => (
                <Picker.Item
                  key={i}
                  label={capitalizeWord(item)}
                  value={item.toLowerCase()}
                />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setSportModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          style={styles.modalContainer}
          visible={POSModalVisible}>
          <View style={styles.filterCol}>
            <Text style={styles.modalTitle}>Minimum POS:</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={5}
              value={teamsFilters.minPOS}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              onValueChange={value => {
                setTeamsFilters({ ...teamsFilters, minPOS: value });
              }}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setPOSModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          style={styles.modalContainer}
          visible={sortModalVisible}>
          <View style={styles.filterCol}>
            <Text style={styles.modalTitle}>Sort:</Text>
            <Picker
              selectedValue={teamsFilters.sort}
              mode="dropdown"
              style={styles.picker}
              onValueChange={(itemValue: string, itemIndex) => {
                setTeamsFilters({ ...teamsFilters, sort: itemValue });
              }}>
              <Picker.Item label="By POS" value="POS" />
              <Picker.Item label="By name" value="name" />
            </Picker>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setSortModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  modalContainer: {
    width: "400px",
    backgroundColor: "white",
  },
  filterContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  filterCol: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "auto",
    backgroundColor: "#fff",
    height: 300,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    width: 100,
  },
  filterValue: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: 150,
    borderColor: "#000",
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  filterValueText: {
    fontSize: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  slider: {
    width: 250,
    height: 80,
  },
  picker: {
    height: 150,
    width: 250,
  },
  applyButton: {
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
