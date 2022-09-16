import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppState } from "../../providers/AppStateProvider";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";
import TeamsView from "./TeamsView";

export const TeamsController = () => {
  const {
    teams,
    setTeams,
    teamsErrorState,
    setTeamsErrorState,
  } = useAppState();
  const [isLoading, setIsLoading] = useState(true);

  const { cloudFunction } = useCustomMoralis();
  const fetchTeams = async () => {
    setIsLoading(true);
    const data = await cloudFunction("getTeamByAttribute", {
      attribute: "isTeamActive",
      value: true,
      activeStatus: true,
    });
    if (data.success) {
      return data.data;
    }
  };

  useEffect(() => {
    fetchTeams()
      .then(setTeams)
      .then(() => setIsLoading(false))
      .catch(setTeamsErrorState);
  }, []);

  return teams && !isLoading ? (
    <View style={styles.container}>
      <TeamsView teams={teams} isLoading={isLoading} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>
        {!teamsErrorState
          ? "Loading...."
          : "Error! Please try another search or refresh the page"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
