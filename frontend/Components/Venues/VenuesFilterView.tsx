import { Picker } from "@react-native-community/picker";
import React, { Suspense, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { searchVenues } from "../../api/aws";
import { sports } from "../../configs/constants";
import { capitalizeWord } from "../../helpers/formatters";
import { useAppState } from "../../providers/AppStateProvider";

export default function VenuesFilterView({ navigation }) {
  const [value, setValue] = useState<string | number>("featured");
  const selectMenu = ["featured", ...sports];
  const [isSearching, setIsSearching] = useState(false);
  const { setVenues, setVenuesErrorState } = useAppState();
  const [modalVisible, setModalVisible] = useState(false);
  const fetchSearchVenues = async (
    attribute: string,
    value: string | number,
  ) => {
    if (!attribute || !value) return;
    setIsSearching(true);
    try {
      const data = await searchVenues({ attribute, value });
      if (!data || !data.statusCode) return [];
      if (data.statusCode === 200) return data.data;
      if (data.statusCode === 404) return [];
      if (data.statusCode === 500) setVenuesErrorState(true);
      return [];
    } catch (error) {
      console.error(`Error searching venues: ${error.toString()}`);
    }
  };

  const applySearch = () => {
    console.log("value", value);

    let searchValue: string | number;
    let searchAttribute: string;
    if (value === "featured") {
      searchValue = 4;
      searchAttribute = "status";
    } else {
      searchValue = value;
      searchAttribute = "availableActivities";
    }

    fetchSearchVenues(searchAttribute, searchValue)
      .then(setVenues)
      .then(() => setIsSearching(false))
      .then(() => navigation.navigate("VenuesScreen"))
      .catch(error => {
        setIsSearching(false);
        setVenuesErrorState(true);
      });
  };

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.pickerTitle}>Attribute:</Text>
              <TouchableOpacity style={styles.pickedValue}>
                <Text style={styles.pickerText}>Sport</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.pickerTitle}>Value:</Text>
              <TouchableOpacity
                style={styles.pickedValue}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.pickerText}>
                  {capitalizeWord(value.toString())}
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
          visible={modalVisible}>
          <View style={styles.filterCol}>
            <Picker
              selectedValue={value}
              mode="dropdown"
              style={styles.picker}
              onValueChange={(itemValue: string, itemIndex) => {
                setValue(itemValue);
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
                setModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Select</Text>
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
    marginTop: "auto",
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  filterCol: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    backgroundColor: "#fff",
    flex: 0.4,
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
  picker: {
    height: 200,
    width: 250,
    margin: 10,
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  pickedValue: {
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
  pickerText: {
    fontSize: 20,
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
