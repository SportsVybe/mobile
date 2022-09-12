import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { RefreshControl, ScrollView } from "react-native";
import useNotifications from "../../api/Moralis/useNotifications";
import NotificationsBar from "./NotificationsBar";

export const NotificationsController = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useMoralis();
  const [username, setUsername] = useState(user && user.get("username"));
  const [refreshing, setRefreshing] = useState(false);

  const {
    fetchNotifications,
    pendingInvites,
    availableRewards,
    activeChallenges,
  } = useNotifications({ username });

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoading(true);
    fetchNotifications()
      .then(() => {
        setRefreshing(false);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <NotificationsBar
        rewards={availableRewards}
        invites={pendingInvites}
        challenges={activeChallenges}
        isLoading={isLoading}
      />
    </ScrollView>
  );
};
