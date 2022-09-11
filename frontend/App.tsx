import React from "react";
import { LogBox } from "react-native";

import AppNavigation from "./Navigation/AppNavigation";

LogBox.ignoreAllLogs();

function App(): JSX.Element {
  return <AppNavigation />;
}

export default App;
