import abi from "./abi.json";
import vtoken from "./vtoken.json";
import {
  REACT_APP_MORALIS_APPLICATION_ID,
  REACT_APP_MORALIS_SERVER_URL,
  REACT_APP_MORALIS_API_KEY,
  REACT_APP_CONTRACT_ADDRESS,
  REACT_APP_TOKEN_CONTRACT_ADDRESS,
} from "@env";

export const moralis = {
  MORALIS_APP_ID: REACT_APP_MORALIS_APPLICATION_ID,
  MORALIS_SERVER_URL: REACT_APP_MORALIS_SERVER_URL,
  MORALIS_API_KEY: REACT_APP_MORALIS_API_KEY,
};

export const contractABI = abi.abi;

export const tokenContractABI = vtoken.abi;

export const contractAddress = REACT_APP_CONTRACT_ADDRESS;

export const tokenContractAddress =
  REACT_APP_TOKEN_CONTRACT_ADDRESS;
