import React from 'react';
import { LogBox } from 'react-native';

import MainNavigation from './Navigation/MainNavigation';

LogBox.ignoreAllLogs();

function App(): JSX.Element {
  return <MainNavigation />;
}

export default App;
