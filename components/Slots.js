import React, { useState, useEffect } from "react";
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
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Slots = () => {
  const dt = new Date();
  const fdate = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;

  const [searchData, setSearchData] = useState({
    pincode: "",
    date: null,
    isLoading: false,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [slots, setSlots] = useState([]);
  const [loadError, setLoadError] = useState({ status: false, msg: "" });
  const [location, setLocation] = useState("");

  const fetchApiData = async (pin, date) => {
    const data = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
    );
    const parsedData = await data.json();
    if (parsedData.sessions.length > 0) {
      setSlots(parsedData.sessions);
      setSearchData({ ...searchData, isLoading: false });
    } else {
      setSlots(null);
      setSearchData({ ...searchData, isLoading: false });
      return;
    }
  };

  const getUserLocationAsync = async () => {
    let req = await Location.requestForegroundPermissionsAsync();

    if (req.status !== "granted") {
      setLoadError(true);
      setSearchData({ ...searchData, isLoading: false });
      return;
    } else {
      try {
        let location = await Location.getCurrentPositionAsync({});
        let cords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        let parsedLoc = await Location.reverseGeocodeAsync(cords);
        return [parsedLoc[0].postalCode, parsedLoc[0].city];
      } catch (error) {
        // console.log(error);
        return;
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoadError(false);
        setSearchData({ ...searchData, isLoading: true });
        const { isConnected } = await NetInfo.fetch();
        if (!isConnected) throw "No Connection";
        const [cityPin, cityName] = await getUserLocationAsync();
        setLocation(cityName);
        fetchApiData(cityPin, fdate);
        // console.log(isConnected);
      } catch (error) {
        error === "No Connection"
          ? setLoadError({ ...loadError, status: true, msg: "No Connection" })
          : setLoadError({ ...loadError, status: true, msg: "No Location" });
        setSearchData({ ...searchData, isLoading: false });
        setSlots(null);
        return;
      }
    })();
  }, []);

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
    setSearchData({ ...searchData, isLoading: true });
    fetchApiData(searchData.pincode, searchData.date);
    // console.log(searchData);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          // alignItems: "center",
          marginLeft: 10,
          marginTop: "5%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
            // textAlign: "center",
            marginBottom: -60,
          }}
        >
          <Entypo name="location-pin" size={17} color="white" />
          {`Location , ${location.length > 1 ? location : "Unknown"}`}
        </Text>
      </View>
      {loadError.status && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15%",
          }}
        >
          <Text
            style={{
              color: "yellow",
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 0,
              marginBottom: -30,
              backgroundColor: "red",
              padding: 5,
              borderRadius: 10,
            }}
          >
            {loadError.msg === "No Location"
              ? `Please Switch on GPS and Allow Location Permission for Better User Experience`
              : `No Connection`}
          </Text>
        </View>
      )}
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
            // backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          <Text style={styles.btnTxt}>
            {searchData.date === null ? (
              <MaterialIcons name="date-range" size={24} color="white" />
            ) : (
              searchData.date
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSubmitHandler}
          style={{
            ...styles.btn,
            // backgroundColor: "#00adb5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginRight: 10,
          }}
          disabled={loadError.msg === "No Connection" ? true : false}
        >
          <Text style={styles.btnTxt}>
            <FontAwesome5 name="search" size={24} color="white" />
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View>
        <ScrollView style={{ height: "85%" }}>
          {/* //! loading */}
          {searchData.isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Image
                style={{ height: 100, width: 100, opacity: 1 }}
                source={require("../assets/loading.gif")}
                transition={false}
              />
            </View>
          ) : slots === null ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Image
                style={{ height: 200, width: 200, opacity: 1 }}
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
          ) : (
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 40,
                }}
              >{`${slots.length} Centers found`}</Text>
              {slots.map((element) => (
                <SloatItem vaxData={element} key={element.center_id} />
              ))}
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
