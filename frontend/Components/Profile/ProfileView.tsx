import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { teamsData } from "../../Screens/Teams/TeamsScreen";
import TeamCard from "../Team/TeamCard";
import ProfileHeader from "./ProfileHeader";
import ProfileNotifications from "./ProfileNotifications";
import ProfileStats from "./ProfileStats";

type Props = {
  userData: any;
  isCurrentUser: boolean;
  teams: any;
  isLoading: boolean;
  wallet: any;
  userObject: any;
  userCounts: any;
};

function ProfileComponent(props: Props): JSX.Element {
  return (
    <View style={styles.profile}>
      <ProfileHeader userData={props.userData} isLoading={props.isLoading} />
      <ProfileNotifications
        userData={props.userData}
        isLoading={props.isLoading}
      />
      <ProfileStats userData={props.userData} isLoading={props.isLoading} />
      <View style={styles.profile}>
        <Text style={styles.title}>Teams</Text>
        {teamsData.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </View>
    </View>
  );
}

export default ProfileComponent;

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
