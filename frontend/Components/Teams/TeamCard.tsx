import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useMoralis } from "react-moralis";
import { Team } from "../../configs/types";
import { capitalizeWord } from "../../helpers/formatters";
import ManageChallenge from "../Modals/ManageChallenge";
import { Photo } from "../Photo";

type Props = {
  team: Team;
  key: number;
};

export const TeamCard = ({ team, key }: Props) => {
  const { user } = useMoralis();
  const [manageTeamModal, toggleManageTeamModal] = useState(false);
  const [manageChallengeModal, toggleManageChallengeModal] = useState(false);
  let isTeamMember = false;
  let isAdmin = false;

  if (user) {
    const { username } = user.attributes ? user.attributes : [];
    isTeamMember =
      (user &&
        team.get("teamMembers").find((member: any) => member === username)) ||
      false;
    isAdmin = team.get("teamAdmin") === username || false;
  }
  const navigation = useNavigation();

  return (
    <View style={styles.teamCard}>
      <View style={styles.teamCardRowTop}>
        <View style={styles.teamCardRowCenter}>
          <View style={styles.teamImage}>
            <Photo type="team" src={team.get("teamPhoto")} isLoading={false} />
          </View>
          <View style={styles.teamCardText}>
            <Text style={styles.teamName}>{team.get("teamName")}</Text>
            <View style={styles.teamCardRowCenter}>
              <Text style={styles.teamCardTitle}>POS:</Text>
              <Text>
                {team.get("teamPOS") ? `${team.get("teamPOS")}%` : "100%"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.teamCardRowTop}>
        <View style={styles.teamCardText}>
          <Text style={styles.teamCardTitle}>Record (W-T-L):</Text>
          <Text>
            {team.get("teamWins")} - 0 - {team.get("teamLosses")}
          </Text>
        </View>
        <View style={styles.teamCardText}>
          <Text style={styles.teamCardTitle}>Sports Preferences:</Text>
          <Text style={styles.sportPreferences}>
            {team.get("teamSportsPreferences") &&
              team
                .get("teamSportsPreferences")
                .map((activity: string, i: number) => {
                  return (
                    <Text style={styles.activityText} key={i}>
                      {capitalizeWord(activity)} |{" "}
                    </Text>
                  );
                })}
          </Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        {isAdmin ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Manage")}>
            <Text style={styles.buttonText}>Manage</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => toggleManageChallengeModal(true)}>
            <Text style={styles.buttonText}>Challenge</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.horizontalRule}></View>
      {/* {user && isAdmin && (
        <ManageTeam
          user={user}
          team={team}
          toggleModal={toggleManageTeamModal}
          modalView={manageTeamModal}
        />
      )} */}
      {user && !isTeamMember && (
        <ManageChallenge
          key={key}
          challengeTeam={team}
          createNewChallenge={true}
          toggleModal={toggleManageChallengeModal}
          modalView={manageChallengeModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  teamCard: {
    width: "95%",
    maxWidth: 350,
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  teamCardRowTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  teamCardRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  teamImage: {
    width: 100,
    height: 100,
    marginRight: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  teamCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  teamCardText: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  teamName: {
    fontSize: 19,
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
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  sportPreferences: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  horizontalRule: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    marginTop: 15,
  },
  activityText: {
    fontSize: 13,
  },
});
