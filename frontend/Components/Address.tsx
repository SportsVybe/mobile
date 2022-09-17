import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Clipboard from "@react-native-community/clipboard";
import { Tooltip } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMoralisDapp } from "../providers/MoralisDappProvider";
// import Blockie from './Blockie';

export default function Address() {
  const { walletAddress, chainId } = useMoralisDapp();
  const [tipVisible, setTipVisible] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(walletAddress);
    setTipVisible(true);
  };

  const renderAddress = () => (
    <View style={styles.viewContainer}>
      <TouchableOpacity
        style={styles.viewContainer}
        onPress={() => copyToClipboard()}>
        {/* <Blockie address={walletAddress} size={100} /> */}

        <Text
          style={styles.headerText}
          ellipsizeMode={"middle"}
          numberOfLines={1}>
          {walletAddress}
        </Text>

        <FontAwesomeIcon icon={faCopy} size={15} color="green" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Tooltip
      anchor={renderAddress}
      visible={tipVisible}
      onBackdropPress={() => setTipVisible(false)}>
      Copied Address 😻
    </Tooltip>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  headerText: {
    width: 130,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#414a4c",
    fontWeight: "600",
  },
});
