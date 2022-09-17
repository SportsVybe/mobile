/**
 * @format
 */

import Geolocation from "@react-native-community/geolocation";
import { Amplify } from "aws-amplify";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { geoConfig } from "./frontend/configs/configs";
import awsConfig from "./frontend/src/aws-exports";
import "./shim";
Amplify.configure(awsConfig);
Geolocation.setRNConfiguration(geoConfig);

AppRegistry.registerComponent(appName, () => App);
