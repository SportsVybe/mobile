import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Address from "../Address";
import { Photo } from "../Photo";

type Props = {
  userData: any;
  isLoading: boolean;
};

function ProfileHeader({ userData, isLoading }: Props): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileHeading}>
        <View style={styles.profileImage}>
          <Photo
            src={userData.userPhoto}
            type="profile"
            isLoading={isLoading}
          />
        </View>
        <View style={styles.profileAccountInfo}>
          <Text style={styles.profileName}>
            Username: {userData.username ? userData.username : "--"}
          </Text>
          <Text style={styles.profileText}>
            Display Name:{" "}
            {userData.userDisplayName ? userData.userDisplayName : "--"}
          </Text>
          <Text style={styles.profileText}>
            Member Since:{" "}
            {userData.createdAt
              ? userData.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                })
              : "--"}
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Address />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("EditProfile", { name: "My Name" })
          }>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProfileSettings")}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileHeader;

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
  profile: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexDirection: "column",
  },
  profileHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    flex: 1,
    marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  profileAccountInfo: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileNotifications: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  profileNotificationsBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#315399",
    padding: 5,
    borderRadius: 5,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  profileStats: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "column",
  },
  profileStatsSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileStatsCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
