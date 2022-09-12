import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { GetUserResponse } from "../../configs/types";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";

type Props = {
  userValue: string;
  userMethod: string;
  includeEthAddress: boolean;
};

const useUserData = ({ userValue, userMethod, includeEthAddress }: Props) => {
  const { isInitialized } = useMoralis();
  const { fetchUser } = useCustomMoralis();
  const [userData, setUserData] = useState<GetUserResponse | any>();

  useEffect(() => {
    if (isInitialized) {
      fetchUser(userValue, userMethod, includeEthAddress)
        .then((user): any => setUserData(user))
        .catch(e => alert(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const fetchUserData = async () => {
    return await fetchUser(userValue, userMethod, includeEthAddress)
      .then(result => result)
      .catch(e => alert(e.message));
  };

  return { fetchUserData, userData };
};

export default useUserData;
