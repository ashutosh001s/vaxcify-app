import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SloatItem = (props) => {
  const {
    name,
    address,
    fee_type,
    available_capacity,
    available_capacity_dose1,
    available_capacity_dose2,
    fee,
    min_age_limit,
    vaccine,
  } = props.vaxData;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.para}>{address}</Text>
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

        {fee > 0 && (
          <Text
            style={{
              ...styles.badge,
              backgroundColor: "pink",
            }}
          >{`Type : ${fee_type}`}</Text>
        )}

        {fee > 0 ? (
          <Text
            style={{
              ...styles.badge,
              backgroundColor: "purple",
            }}
          >{`Fee : ${fee}`}</Text>
        ) : (
          <Text
            style={{
              ...styles.badge,
              backgroundColor: "green",
            }}
          >
            {"Free Vaccination"}
          </Text>
        )}

        <Text
          style={{
            ...styles.badge,
            backgroundColor: `${vaccine === "COVISHIELD" ? "white" : "gold"}`,
            color: "black",
          }}
        >{`${vaccine}`}</Text>

        {vaccine === "COVAXIN" && (
          <Text style={{ ...styles.badge, backgroundColor: "orange" }}>
            Inactive Virus
          </Text>
        )}
        {vaccine === "COVISHIELD" && (
          <Text style={{ ...styles.badge, backgroundColor: "blue" }}>
            m - RNA Vaccine
          </Text>
        )}
      </View>
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
  },
  heading: {
    padding: 8,
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
  },
  para: {
    padding: 0,
    color: "white",
    padding: 8,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "#00adb5",
    color: "white",
    fontWeight: "bold",
    margin: 5,
    padding: 5,
    borderRadius: 10,
    // width: 100,
    // height: 40,
    textAlign: "center",
    fontSize: 10,
  },
});

export default SloatItem;
