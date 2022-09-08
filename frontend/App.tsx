import React from 'react';
import { LogBox } from 'react-native';

import MainNavigation from './Navigation/AppNavigation';

LogBox.ignoreAllLogs();

function App(): JSX.Element {
  return <MainNavigation />;
}

export default App;
