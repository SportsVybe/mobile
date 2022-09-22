import React, { Suspense } from "react";
import { StyleSheet, Text, View } from "react-native";
import { contractConfig } from "../../configs/configs";
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
      asset =>
        asset.token_address ==
        contractConfig.tokenContractAddress.toLowerCase(),
    );

  const tokenBalanceValue =
    tokenBalance && tokenBalance.balance / 10 ** tokenBalance.decimals;

  // function to convert amount to K for thousands, M for millions, B for billions, T for trillions

  const tokenBalanceValueKMBT = (value: number) => {
    if (value >= 1000000000000) {
      return (value / 1000000000000).toFixed(3) + "T";
    } else if (value >= 1000000000) {
      return (value / 1000000000).toFixed(3) + "B";
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(3) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(3) + "K";
    } else {
      return value.toFixed(3);
    }
  };
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.row}>
        <Text style={header && styles.vybeAmount}>
          {tokenBalanceValueKMBT(tokenBalanceValue || 0) || 0}
        </Text>
        <Text style={styles.tokenName}>VYBE</Text>
      </View>
    </Suspense>
  );
}

export default VYBEBalance;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  vybeAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tokenName: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
