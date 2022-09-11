import React, { Suspense, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Team } from "../../configs/types";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";
import { TeamCard } from "./TeamCard";

// import TeamsFilter from "./TeamsFilter";
// import TeamsView from "./TeamsView";

export const TeamsController = () => {
  const [teams, setTeams] = useState<Team[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
      .catch(setError);
  }, []);

  return (
    teams &&
    !isLoading && (
      <Suspense fallback={<Text>Loading...</Text>}>
        <View>
          {teams &&
            teams.map((team): any => <TeamCard key={team.id} team={team} />)}
        </View>
      </Suspense>
    )
  );
};
