import {
  REACT_APP_CONTRACT_ADDRESS,
  REACT_APP_MORALIS_API_KEY,
  REACT_APP_MORALIS_APPLICATION_ID,
  REACT_APP_MORALIS_SERVER_URL,
  REACT_APP_TOKEN_CONTRACT_ADDRESS,
} from "@env";
import { GeolocationConfiguration } from "@react-native-community/geolocation";
import abi from "./abi.json";
import vtoken from "./vtoken.json";

export const moralis = {
  MORALIS_APP_ID: REACT_APP_MORALIS_APPLICATION_ID,
  MORALIS_SERVER_URL: REACT_APP_MORALIS_SERVER_URL,
  MORALIS_API_KEY: REACT_APP_MORALIS_API_KEY,
};

export const contract = {
  contractABI: abi.abi,
  tokenContractABI: vtoken.abi,
  contractAddress: REACT_APP_CONTRACT_ADDRESS,
  tokenContractAddress: REACT_APP_TOKEN_CONTRACT_ADDRESS,
};

export const geoConfig: GeolocationConfiguration = {
  skipPermissionRequests: false,
  authorizationLevel: "auto",
  locationProvider: "auto",
};
