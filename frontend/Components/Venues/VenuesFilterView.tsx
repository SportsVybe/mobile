import { Picker } from "@react-native-community/picker";
import React, { Suspense, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { searchVenues } from "../../api/aws";
import { sports } from "../../configs/constants";
import { capitalizeWord } from "../../helpers/formatters";
import { useAppState } from "../../providers/AppStateProvider";

export default function VenuesFilterView({ navigation }) {
  const [value, setValue] = useState<string | number>("featured");
  const selectMenu = ["featured", ...sports];
  const [isSearching, setIsSearching] = useState(false);
  const { setVenues, setVenuesError } = useAppState();
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
      if (data.statusCode === 500) setVenuesError(true);
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
        setVenuesError(true);
      });
  };

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.pickerTitle}>By Sport:</Text>
            <TouchableOpacity
              style={styles.pickedValue}
              onPress={() => setModalVisible(true)}>
              <Text>{capitalizeWord(value.toString())}</Text>
            </TouchableOpacity>
            {/* <Picker
              style={styles.picker}
              selectedValue={value}
              mode="dropdown"
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
            </Picker> */}
          </View>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <Modal
              animationType="slide"
              transparent={false}
              style={styles.modal}
              visible={modalVisible}>
              {/* <TouchableWithoutFeedback> */}
              <View>
                <Picker
                  selectedValue={value}
                  mode="dropdown"
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
              </View>
              {/* </TouchableWithoutFeedback> */}

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text>Select</Text>
              </TouchableOpacity>
            </Modal>
          </View>
        </View>
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={() => applySearch()}>
          <View style={styles.filterRow}>
            <Text>{isSearching ? "Searching..." : <Text>Apply</Text>}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  filterContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
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
    // height: 150,
    width: 150,
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
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  applyButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
