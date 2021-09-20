import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
} from "react-native";
import SloatItem from "./SlotItem";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Slots = () => {
  const [searchData, setSearchData] = useState({ pincode: "", date: null });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [slots, setSlots] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showToast = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatDate = `${day}-${month}-${year}`;
    // console.warn("A date has been picked: ", formatDate);
    setSearchData({ ...searchData, date: formatDate });
    hideDatePicker();
  };

  const onSubmitHandler = async () => {
    if (String(searchData.pincode).length !== 6) {
      showToast("Enter Valid Pincode");
      return 1;
    }
    if (!searchData.date) {
      showToast("Please Select a date");
      return 1;
    }

    const data = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchData.pincode}&date=${searchData.date}`
    );
    const parsedData = await data.json();
    if (parsedData.sessions.length > 0) {
      setSlots(parsedData.sessions);
    } else {
      setSlots(null);
      // showToast("No Results Found");
      return 1;
    }

    // console.log(parsedData, searchData.pincode, searchData.date);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={{
            height: 40,
            backgroundColor: "#393e46",
            color: "white",
            width: "50%",
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
          }}
          placeholder="Enter Pincode"
          onChange={(event) =>
            setSearchData({
              ...searchData,
              pincode: event.nativeEvent.text,
            })
          }
          value={searchData.pincode}
        />

        <TouchableOpacity
          onPress={showDatePicker}
          style={{
            ...styles.btn,
            backgroundColor: "#00adb5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          <Text style={styles.btnTxt}>
            {searchData.date === null ? "Select Date" : searchData.date}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSubmitHandler}
          style={{
            ...styles.btn,
            backgroundColor: "#00adb5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          <Text style={styles.btnTxt}>Search</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={{ marginBottom: 200 }}>
        <ScrollView style={{ height: "100%" }}>
          {slots === null ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Image
                style={{ height: 200, width: 200, opacity: 0.5 }}
                source={require("../assets/center.png")}
                transition={false}
              />

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                No Vaccination Center Found
              </Text>
            </View>
          ) : slots.length !== 0 ? (
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 40,
                }}
              >{`${slots.length} results found`}</Text>
              {slots.map((element) => (
                <SloatItem vaxData={element} key={element.center_id} />
              ))}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Image
                style={{ height: 200, width: 200, opacity: 0.5 }}
                source={require("../assets/vaccine.png")}
                transition={false}
              />

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Enter your pincode and date to find Vaccination center
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  form: { borderRadius: 50 },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15%",
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
    width: "20%",
    backgroundColor: "#393e46",
    textAlign: "center",
  },
  btnTxt: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
export default Slots;
