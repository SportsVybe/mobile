import React, { Suspense } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Team } from "../../configs/types";
import { TeamCard } from "./TeamCard";

type Props = {
  teams: Team[];
  isLoading: boolean;
};

export default function TeamsView({ teams, isLoading }: Props) {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        {teams && !isLoading && teams.length > 0 ? (
          teams.map((team, i) => {
            return <TeamCard key={i} team={team} />;
          })
        ) : (
          <Text>No teams found. Try another search</Text>
        )}
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
});
