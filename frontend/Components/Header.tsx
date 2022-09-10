import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/images/logos/sportsvybe_logo_whiteBG_blackVybe.png")}
        />
      </View>
      <View style={styles.headerRight}>
        <View style={styles.headerVybe}>
          <TouchableOpacity>
            <Text style={styles.vybeText}>100 VYBE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerBell}>
          <TouchableOpacity>
            <View style={styles.headerNotification}>
              <FontAwesomeIcon icon={faBell} color={"black"} size={20} />
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// notification button component

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeft: {
    width: "50%",
  },
  headerLogo: {
    width: "65%",
    height: "65%",
    resizeMode: "contain",
  },
  headerRight: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerVybe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  headerBell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerNotification: {
    height: 40,
    width: 40,
    paddingTop: 8,
    position: "relative",
  },
  vybeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationBadge: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: -3,
    right: 8,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "red",
    color: "white",
  },
  notificationBadgeText: {
    color: "white",
    fontWeight: "800",
  },
});
