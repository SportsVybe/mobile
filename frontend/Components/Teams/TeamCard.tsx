import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useMoralis } from "react-moralis";
import { Team } from "../../configs/types";
import { capitalizeWord } from "../../helpers/formatters";
import { Photo } from "../Photo";

type Props = {
  team: Team;
};

export const TeamCard = ({ team }: Props) => {
  const { user } = useMoralis();
  const [manageTeamModal, toggleManageTeamModal] = useState(false);
  const [manageChallengeModal, toggleManageChallengeModal] = useState(false);
  let isTeamMember = false;
  let isAdmin = false;

  if (user) {
    const { username } = user.attributes ? user.attributes : [];
    isTeamMember =
      (user &&
        team
          .get("get")("teamMembers")
          .find((member: any) => member === username)) ||
      false;
    isAdmin = team.get("teamAdmin") === username || false;
  }
  const navigation = useNavigation();

  return (
    <View style={styles.teamCard}>
      <View style={styles.teamCardRow}>
        <Photo type="team" src={team.get("teamPhoto")} isLoading={false} />
        <View style={styles.teamCardText}>
          <Text style={styles.teamName}>{team.get("teamName")}</Text>
          <Text style={styles.teamCardTitle}>POS:</Text>
          <Text>
            {team.get("teamPOS") ? `${team.get("teamPOS")}%` : "100%"} POS
          </Text>
        </View>
      </View>
      <View style={styles.teamCardRow}>
        <View style={styles.teamCardText}>
          <Text style={styles.teamCardTitle}>Record (W-T-L):</Text>
          <Text>
            {team.get("teamWins")} - 0 - {team.get("teamLosses")}
          </Text>
        </View>
        <View style={styles.teamCardText}>
          <Text style={styles.teamCardTitle}>Sports Preferences:</Text>
          <Text style={{ flexWrap: "wrap" }}>
            {team.get("teamSportsPreferences") &&
              team
                .get("teamSportsPreferences")
                .map((sport: string, i: number) => {
                  return <Text key={i}>{capitalizeWord(sport)}</Text>;
                })}
          </Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Challenge or Manage")}>
          <Text style={styles.buttonText}>Challenge/Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  teamCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  teamImage: {
    width: 100,
    height: 100,
    marginRight: 30,
    padding: 10,
  },
  teamCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  teamCardText: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
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
  buttonRow: {
    
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#315399",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
