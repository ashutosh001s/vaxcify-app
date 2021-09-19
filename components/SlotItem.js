import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SloatItem = (props) => {
  const {
    name,
    address,
    block_name,
    pincode,
    fee_type,
    date,
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
        <Text style={styles.badge}>{`Date : ${date}`}</Text>
        <Text style={styles.badge}>{`Block : ${block_name}`}</Text>
        <Text style={styles.badge}>{`Pin : ${pincode}`}</Text>
        <Text style={styles.badge}>{`Type : ${fee_type}`}</Text>
        <Text style={styles.badge}>{`Fee : ${fee}`}</Text>
        <Text style={styles.badge}>{`Capacity : ${available_capacity}`}</Text>
        <Text
          style={styles.badge}
        >{`Dose1 : ${available_capacity_dose2}`}</Text>
        <Text
          style={styles.badge}
        >{`Dose2 : ${available_capacity_dose1}`}</Text>
        <Text style={styles.badge}>{`Min-age : ${min_age_limit}`}</Text>
        <Text style={styles.badge}>{`Vaccine : ${vaccine}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "#393e46",
    margin: 20,
    borderRadius: 10,
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
