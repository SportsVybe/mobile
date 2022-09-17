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
import { searchVenues } from "../../api/aws";
import { sports } from "../../configs/constants";
import { Venue } from "../../configs/types";
import { calcDistance } from "../../helpers/calcDistance";
import { capitalizeWord } from "../../helpers/formatters";
import { useAppState } from "../../providers/AppStateProvider";

export default function VenuesFilterView({ navigation }) {
  const selectMenu = ["featured", ...sports];
  const [isSearching, setIsSearching] = useState(false);
  const {
    setVenues,
    setVenuesErrorState,
    venueFilters,
    setVenueFilters,
    userLocation,
  } = useAppState();
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [distanceModalVisible, setDistantModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

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

  const getDistance = (venue: Venue) => {
    return calcDistance(
      userLocation.lat,
      userLocation.lng,
      venue.coordinates.latitude,
      venue.coordinates.longitude,
      "M",
    );
  };

  const limitByDistance = (venues: Venue[]): Venue[] => {
    const venuesWithDistance = venues.map(venue => {
      return { ...venue, distance: getDistance(venue) };
    });
    return venuesWithDistance.filter(
      venue => venue.distance <= venueFilters.distance,
    );
  };

  const sortVenues = (venues: Venue[]): Venue[] => {
    if (venueFilters.sort === "distance") {
      return venues.sort((a, b) => Number(a.distance) - Number(b.distance));
    }
    if (venueFilters.sort === "name") {
      return venues.sort((a, b) => a.name.localeCompare(b.name));
    }
    return venues;
  };

  const applySearch = () => {
    let searchValue: string | number;
    let searchAttribute: string;
    if (venueFilters.sport === "featured") {
      searchValue = 4;
      searchAttribute = "status";
    } else {
      searchValue = venueFilters.sport;
      searchAttribute = "availableActivities";
    }

    fetchSearchVenues(searchAttribute, searchValue)
      .then(limitByDistance)
      .then(sortVenues)
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
              <Text style={styles.filterTitle}>Sport:</Text>
              <TouchableOpacity
                style={styles.filterValue}
                onPress={() => setSportModalVisible(true)}>
                <Text style={styles.filterValueText}>
                  {capitalizeWord(venueFilters.sport.toString())}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterTitle}>Distance:</Text>
              <TouchableOpacity
                style={styles.filterValue}
                onPress={() => setDistantModalVisible(true)}>
                <Text style={styles.filterValueText}>
                  {venueFilters.distance} miles
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
                  By {venueFilters.sort}
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
              selectedValue={venueFilters.sport}
              mode="dropdown"
              style={styles.picker}
              onValueChange={(itemValue: string, itemIndex) => {
                setVenueFilters({ ...venueFilters, sport: itemValue });
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
          visible={distanceModalVisible}>
          <View style={styles.filterCol}>
            <Text style={styles.modalTitle}>Distance:</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={3000}
              step={5}
              value={venueFilters.distance}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              onValueChange={value => {
                setVenueFilters({ ...venueFilters, distance: value });
              }}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setDistantModalVisible(false);
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
              selectedValue={venueFilters.sort}
              mode="dropdown"
              style={styles.picker}
              onValueChange={(itemValue: string, itemIndex) => {
                setVenueFilters({ ...venueFilters, sort: itemValue });
              }}>
              <Picker.Item label="By distance" value="distance" />
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
