import React from "react";
import { useMoralis } from "react-moralis";

import { ProfileController } from "../../Components/Profile/ProfileController";

function ProfileScreen(): JSX.Element {
  const { user } = useMoralis();
  return <ProfileController isCurrentUser={true} user={user} />;
}

export default ProfileScreen;
