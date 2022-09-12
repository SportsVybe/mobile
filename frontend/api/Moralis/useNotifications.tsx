import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  GetUserChallenges,
  GetUserInvites,
  GetUserRewards,
  Team,
} from "../../configs/types";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";

type Props = {
  username: string;
};

const useNotifications = ({ username }: Props) => {
  const { isInitialized } = useMoralis();
  const { cloudFunction } = useCustomMoralis();
  const [notifications, setNotifications] = useState<Team[] | any>();

  const [invites, setInvites] = useState<GetUserInvites>();
  const [rewards, setRewards] = useState<GetUserRewards>();
  const [challenges, setChallenges] = useState<GetUserChallenges>();
  const [pendingInvites, setPendingInvites] = useState<number>(0);
  const [availableRewards, setAvailableRewards] = useState<number>(0);
  const [activeChallenges, setActiveChallenges] = useState<number>(0);

  const fetchUserInvites = async () => {
    return await cloudFunction("getUserInvites", {})
      .then(invites => {
        setInvites(invites);
        setPendingInvites(invites.pending.length);
      })
      .catch(error => {
        console.error(`Error fetching invites: ${error.toString()}`);
      });
  };

  const fetchUserRewards = async () => {
    return await cloudFunction("getUserRewards", {})
      .then(rewards => {
        setRewards(rewards);
        setAvailableRewards(rewards.available.length);
      })
      .catch(error => {
        console.error(`Error fetching rewards: ${error.toString()}`);
      });
  };

  const fetchUserChallenges = async () => {
    return await cloudFunction("getUserChallenges", {})
      .then(challenges => {
        setChallenges(challenges);
        setActiveChallenges(challenges.active.length);
      })
      .catch(error => {
        console.error(`Error fetching challenges: ${error.toString()}`);
      });
  };

  useEffect(() => {
    if (isInitialized) {
      fetchUserChallenges()
        .then(() => fetchUserRewards())
        .then(() => fetchUserInvites())
        .catch(e => alert(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const fetchNotifications = async () => {
    return Promise.all([
      fetchUserChallenges(),
      fetchUserRewards(),
      fetchUserInvites(),
    ])
      .then(result => result)
      .catch(e => alert(e.message));
  };

  return {
    fetchNotifications,
    invites,
    rewards,
    challenges,
    pendingInvites,
    availableRewards,
    activeChallenges,
  };
};

export default useNotifications;
