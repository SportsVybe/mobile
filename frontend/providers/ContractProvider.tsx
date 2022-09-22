import "@ethersproject/shims";
import { ethers } from "ethers";
import React, { createContext, useContext, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { contractConfig } from "../configs/configs";
import { useMoralisDapp } from "./MoralisDappProvider";

import { useWalletConnect } from "../WalletConnect";

const defaultState = {
  isContractLoading: false,
  setIsContractLoading: (loading: boolean) => {},
  contractMessage: { status: "", message: "" } as any,
  setContractMessage: {} as any,
  createTeam: async (actionId: string) => {
    return false;
  },
  createChallenge: async (
    actionId: string,
    userTeamId: string,
    challengeTeamId: string,
    challengeAmount: string,
  ) => {
    return false;
  },
  approveAmount: async (challengeAmount: string) => {},
  acceptChallenge: async (
    actionId: string,
    challengeId: string,
    challengeTeam2Id: string,
    challengeAmount: string,
  ) => {
    return false;
  },
  submitVote: async (
    actionId: string,
    challengeId: string,
    vote: string, // teamId
  ) => {
    return false;
  },
  sendTeamMembershipRequest: async (
    actionId: string,
    teamId: string,
    user: string, // ethAddress
  ) => {
    return false;
  },
  acceptTeamMembershipRequest: async (actionId: string, teamId: string) => {
    return false;
  },

  claimReward: async (
    claimActionId: string,
    rewardActionId: string,
    rewardId: number,
    challengeId: number,
  ) => {
    return false;
  },
};

const ContractContext = createContext(defaultState);

const ContractProvider = ({ children }: { children: any }) => {
  const [isContractLoading, setIsContractLoading] = useState(false);
  const [contractMessage, setContractMessage] = useState({});
  const { walletAddress } = useMoralisDapp();
  const { web3, isWeb3Enabled } = useMoralis();
  const connector = useWalletConnect();
  const {
    data,
    error,
    isFetching,
    fetch,
    isLoading,
  } = useWeb3ExecuteFunction();

  const approveAmount = async (challengeAmount: string): Promise<any> => {
    setIsContractLoading(true);
    try {
      const challengeAmountWei = ethers.utils.parseEther(challengeAmount);

      const options = {
        abi: contractConfig.tokenContractABI,
        contractAddress: contractConfig.tokenContractAddress,
        functionName: "approve",
        params: {
          spender: contractConfig.contractAddress,
          amount: challengeAmountWei,
        },
      };

      // approve contract transaction
      // console.log("approve: ", options.params);

      await fetch({
        onSuccess(results) {
          console.log("Approve success");
          setIsContractLoading(false);
        },
        onComplete() {
          setIsContractLoading(false);
          console.log("Approve complete");
        },
        onError(error) {
          setIsContractLoading(false);
          console.error("Approve error: ", error);
        },
        params: options,
      });
      return true;
    } catch (error) {
      setIsContractLoading(false);
      console.error("approve error: ", error);
      return false;
    }
  };

  const createTeam = async (actionId: string): Promise<any> => {
    setIsContractLoading(true);
    try {
      // const contract = await getContract();
      // await contract.functions.createTeam(actionId); // create team transaction
      setContractMessage({
        status: "info",
        message: "Team is being created on chain.",
      });
      setIsContractLoading(false);
      return true;
    } catch (error) {
      setIsContractLoading(false);
      if (error instanceof Error) {
        setContractMessage({ status: "error", message: error.message });
      } else {
        setContractMessage({ status: "error", message: "Unknown" });
      }
      console.error(error);
      return false;
    }
  };

  const createChallenge = async (
    actionId: string,
    userTeamId: string,
    challengeTeamId: string,
    challengeAmount: string,
  ) => {
    setIsContractLoading(true);
    try {
      const challengeAmountWei = ethers.utils.parseEther(challengeAmount);

      const params = {
        action_id: actionId,
        team_id: userTeamId,
        challenged_team_id: challengeTeamId,
        amount: challengeAmountWei,
      };

      try {
        const data = web3.eth.abi.encodeFunctionCall(
          {
            name: "createChallengePool",
            type: "function",
            inputs: [
              {
                internalType: "string",
                name: "action_id",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "team_id",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "challenged_team_id",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
          },
          [
            params.action_id,
            params.team_id,
            params.challenged_team_id,
            params.amount,
          ],
        );

        const createChallengeOnChain = await connector.sendTransaction({
          data: data,
          from: connector.accounts[0],
          to: contractConfig.contractAddress,
          gasLimit: 3500000,
        });
        alert(`Success! Transaction Id: ${createChallengeOnChain.toString()}`);
      } catch (e) {
        console.error(e);
      }

      setIsContractLoading(false);
      return true;
    } catch (error: any) {
      setIsContractLoading(false);
      alert(`create challenge error: ${error.toString()}`);
      return false;
    }
  };

  const acceptChallenge = async (
    actionId: string,
    challengeId: string,
    challengeTeam2Id: string,
    challengeAmount: string,
  ) => {
    setIsContractLoading(true);

    try {
      const challengeAmountWei = ethers.utils.parseEther(challengeAmount);

      // create challenge transaction
      const contract = await getContract();
      await contract.functions.acceptChallengePool(
        actionId,
        challengeId,
        challengeTeam2Id,
        challengeAmountWei,
        {
          gasLimit: 3500000,
        },
      );
      setContractMessage({
        status: "info",
        message: "Challenge is being accepted on chain.",
      });
      setIsContractLoading(false);
      return true;
    } catch (error) {
      setIsContractLoading(false);
      if (error instanceof Error) {
        setContractMessage({ status: "error", message: error.message });
      } else {
        setContractMessage({ status: "error", message: "Unknown" });
      }
      console.error(error);
      return false;
    }
  };

  const submitVote = async (
    actionId: string,
    challengeId: string,
    vote: string,
  ) => {
    setIsContractLoading(true);
    try {
      const contract = await getContract();
      await contract.functions.submitVote(actionId, challengeId, vote, {
        gasLimit: 3500000,
      });
      setContractMessage({
        status: "info",
        message: "Vote is being submitted on chain.",
      });
      setIsContractLoading(false);
      return true;
    } catch (error) {
      setIsContractLoading(false);
      if (error instanceof Error) {
        setContractMessage({ status: "error", message: error.message });
      } else {
        setContractMessage({ status: "error", message: "Unknown" });
      }
      console.error(error);
      return false;
    }
  };

  const sendTeamMembershipRequest = async (
    actionId: string,
    teamId: string,
    user: string,
  ) => {
    setIsContractLoading(true);
    try {
      const contract = await getContract();
      await contract.functions.sendTeamMembershipRequest(
        actionId,
        teamId,
        user,
      );
      setContractMessage({
        status: "info",
        message: "Membership Request is being processed on chain.",
      });
      setIsContractLoading(false);
      return true;
    } catch (error) {
      setIsContractLoading(false);
      if (error instanceof Error) {
        setContractMessage({ status: "error", message: error.message });
      } else {
        setContractMessage({ status: "error", message: "Unknown" });
      }
      console.error(error);
      return false;
    }
  };

  const acceptTeamMembershipRequest = async (
    actionId: string,
    teamId: string,
  ) => {
    setIsContractLoading(true);
    try {
      const contract = await getContract();
      await contract.functions.acceptTeamMembershipRequest(actionId, teamId);
      setContractMessage({
        status: "info",
        message: "Membership Request is being processed on chain.",
      });
      setIsContractLoading(false);
      return true;
    } catch (error) {
      setIsContractLoading(false);
      if (error instanceof Error) {
        setContractMessage({ status: "error", message: error.message });
      } else {
        setContractMessage({ status: "error", message: "Unknown" });
      }
      console.error(error);
      return false;
    }
  };

  const claimReward = async (
    claimActionId: string,
    rewardActionId: string,
    rewardId: number,
    challengeId: number,
  ) => {
    setIsContractLoading(true);
    try {
      // claim reward transaction
      const contract = await getContract();
      await contract.functions.claimReward(
        claimActionId,
        rewardActionId,
        rewardId,
        challengeId,
        {
          gasLimit: 3500000,
        },
      );
      setContractMessage({
        status: "info",
        message: "Reward is being processed on chain.",
      });
      setIsContractLoading(false);
      return true;
    } catch (error) {
      setIsContractLoading(false);
      if (error instanceof Error) {
        setContractMessage({ status: "error", message: error.message });
      } else {
        setContractMessage({ status: "error", message: "Unknown" });
      }
      console.error(error);
      return false;
    }
  };

  return (
    <ContractContext.Provider
      value={{
        createTeam,
        createChallenge,
        isContractLoading,
        contractMessage,
        approveAmount,
        setContractMessage,
        setIsContractLoading,
        acceptChallenge,
        submitVote,
        sendTeamMembershipRequest,
        acceptTeamMembershipRequest,
        claimReward,
      }}>
      {children}
    </ContractContext.Provider>
  );
};

const useContract = () => useContext(ContractContext);

export { ContractProvider, useContract };
