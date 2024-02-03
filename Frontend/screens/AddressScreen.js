import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HeaderScreen from "./HeaderScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderScreen />
      <View>
        <Text style={{ padding: 10, fontSize: 17, fontWeight: "bold" }}>
          Mes adresses
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddAddress")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
            paddingVertical: 10,
            borderColor: "#D8D8D8",
            borderWidth: 1.5,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            marginTop: 15,
            paddingHorizontal: 5,
          }}
        >
          <Text>Ajouter une nouvelle adresse test</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
