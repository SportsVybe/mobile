import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import useNotifications from "../../api/Moralis/useNotifications";
import useUserData from "../../api/Moralis/useUserData";
import useUserTeams from "../../api/Moralis/useUserTeams";
import ProfileView from "./ProfileView";

type Props = {
  user?: any;
  isCurrentUser: boolean;
  isAuthenticating?: boolean;
};

export const ProfileController = ({ user, isCurrentUser = false }: Props) => {
  const { userData, fetchUserData } = useUserData({
    userValue: user && user.id,
    userMethod: "objectId",
    includeEthAddress: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(user && user.get("username"));
  const [refreshing, setRefreshing] = useState(false);

  const {
    fetchNotifications,
    pendingInvites,
    availableRewards,
    activeChallenges,
  } = useNotifications();

  const { userTeams, fetchUserTeams } = useUserTeams({ username });

  useEffect(() => {
    if (userData && userTeams) {
      setIsLoading(false);
    }
  }, [userData, userTeams]);

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoading(true);
    Promise.all([fetchUserData(), fetchUserTeams(), fetchNotifications()])
      .then(() => {
        setRefreshing(false);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ProfileView
        userData={userData && userData.user}
        isCurrentUser={isCurrentUser}
        teams={userTeams && userTeams.teamOwnerTeams}
        isLoading={isLoading}
        userObject={userData && userData.user}
        rewards={availableRewards}
        invites={pendingInvites}
        challenges={activeChallenges}
      />
    </ScrollView>
  );
};
