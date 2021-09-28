import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

const SloatItem = (props) => {
  const {
    name,
    fee_type,
    available_capacity,
    available_capacity_dose1,
    available_capacity_dose2,
    fee,
    min_age_limit,
    vaccine,
  } = props.vaxData;
  return (
    <View style={{ ...styles.container, ...styles.shadow }}>
      <View>
        <Text style={styles.heading}>{name}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 2,
        }}
      >
        <Text
          style={{
            ...styles.badge,
            backgroundColor: `${available_capacity > 0 ? "green" : "red"}`,
          }}
        >
          {available_capacity > 0
            ? `Capacity : ${available_capacity}`
            : "Booked"}
        </Text>
        <Text
          style={styles.badge}
        >{`Dose1 : ${available_capacity_dose2}`}</Text>
        <Text
          style={styles.badge}
        >{`Dose2 : ${available_capacity_dose1}`}</Text>
        <Text style={styles.badge}>{`Min-age : ${min_age_limit}`}</Text>

        {fee > 0 && <Text style={styles.badge}>{`Type : ${fee_type}`}</Text>}

        {fee > 0 ? (
          <Text style={styles.badge}>{`Fee : ${fee}`}</Text>
        ) : (
          <Text style={styles.badge}>{"Free Vaccination"}</Text>
        )}

        <Text
          style={{
            ...styles.badge,
          }}
        >{`${vaccine}`}</Text>
      </View>
      {available_capacity > 0 && (
        <TouchableOpacity
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://selfregistration.cowin.gov.in/"
            )
          }
          style={{
            ...styles.badge,
            ...styles.shadow,
            padding: 7,
            backgroundColor: "#222839",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Book on Co-Win
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 250,
    backgroundColor: "#393e46",
    margin: 20,
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    fontSize: 10,
  },
  heading: {
    padding: 8,
    color: "white",
    fontWeight: "bold",
  },

  badge: {
    backgroundColor: "#00adb5",
    color: "white",
    margin: 5,
    padding: 5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 10,
  },
  shadow: {
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
  },
});

export default SloatItem;
