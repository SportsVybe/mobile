import { ethers } from "ethers";
import React from "react";
import { useMoralis } from "react-moralis";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContract } from "../../providers/ContractProvider";
export interface IAuthorizeButtonProps {
  amount: number;
}

const defaultProps: IAuthorizeButtonProps = {
  amount: 0,
};

AuthorizeButton.defaultProps = defaultProps;

export default function AuthorizeButton({ amount }: IAuthorizeButtonProps) {
  const { approveAmount, isContractLoading } = useContract();
  const { user, isAuthenticated } = useMoralis();
  const handleTokenApproval = async () => {
    await approveAmount(String(amount));
  };

  const userApprovedAmount =
    isAuthenticated &&
    user &&
    user.get("approvedSTVAmount") &&
    ethers.utils.formatEther(user.get("approvedSTVAmount"));

  const userHasApprovedSVT =
    isAuthenticated && user && user.get("hasApprovedSVT");

  return (
    <View style={styles.authorizeCol}>
      {!userHasApprovedSVT ||
      Number(userApprovedAmount) < amount ||
      !userApprovedAmount ||
      Number(userApprovedAmount) === 0 ? (
        <TouchableOpacity
          style={styles.authorizeButton}
          onPress={() => handleTokenApproval()}
          disabled={isContractLoading || amount === 0 || !amount}>
          <Text style={styles.buttonText}> Increase VYBE Approval</Text>
        </TouchableOpacity>
      ) : (
        <Text>You have approved {userApprovedAmount} VYBE</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  authorizeCol: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  authorizeButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
