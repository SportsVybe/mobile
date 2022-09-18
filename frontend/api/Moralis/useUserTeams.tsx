import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { GetUserTeamsResponse } from "../../configs/types";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";

type Props = {
  username: string;
};

const useUserTeams = ({ username }: Props) => {
  const { isInitialized } = useMoralis();
  const { cloudFunction } = useCustomMoralis();
  const [userTeams, setUserTeams] = useState<GetUserTeamsResponse>();

  const fetchTeams = async (): Promise<GetUserTeamsResponse> => {
    const results = await cloudFunction("getUserTeams", {});
    return results;
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
