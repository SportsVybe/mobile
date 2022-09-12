import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { GetUserTeamsResponse, Team } from "../../configs/types";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";

type Props = {
  username: string;
};

const useUserTeams = ({ username }: Props) => {
  const { isInitialized } = useMoralis();
  const { getAllPossibleObjects } = useCustomMoralis();
  const [userTeams, setUserTeams] = useState<Team[] | any>();

  const fetchTeams = async (): Promise<GetUserTeamsResponse | any[]> => {
    return await getAllPossibleObjects("teams", "teamMembers", username);
  };

  useEffect(() => {
    if (isInitialized) {
      fetchTeams()
        .then((teams): any => setUserTeams(teams))
        .catch(e => alert(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const fetchUserTeams = async () => {
    return await fetchTeams()
      .then(result => result)
      .catch(e => alert(e.message));
  };

  return { fetchUserTeams, userTeams };
};

export default useUserTeams;
