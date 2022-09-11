import React, { Suspense } from "react";
import { StyleSheet, Text, View } from "react-native";
import { tokenContractAddress } from "../../configs/configs";
import useERC20Balance from "../../hooks/useERC20balance";
import { useMoralisDapp } from "../../providers/MoralisDappProvider";

type Props = {
  header: boolean;
};

function VYBEBalance({ header = false }): JSX.Element {
  const { chainId } = useMoralisDapp();

  const { assets } = useERC20Balance({
    chain: chainId,
  });

  const tokenBalance =
    assets &&
    assets.find(
      asset => asset.token_address == tokenContractAddress.toLowerCase(),
    );

  const tokenBalanceValue =
    tokenBalance && tokenBalance.balance / 10 ** tokenBalance.decimals;

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View>
        <Text style={header && styles.vybeText}>
          {tokenBalanceValue || 0} VYBE
        </Text>
      </View>
    </Suspense>
  );
}

export default VYBEBalance;

const styles = StyleSheet.create({
  vybeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
