import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useCallback, useEffect, useState } from "react";
import HeaderScreen from "./HeaderScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import { Ionicons } from "@expo/vector-icons";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  console.log("userId :", userId);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.8.106:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("User addresses test :", JSON.stringify(addresses, null, 2));

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
          <Text>Ajouter une nouvelle adresse</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <View>
          {/* User addresses */}
          {addresses?.map((item, index) => (
            <Pressable key={index} style={styles.address}>
              <View style={{flexDirection:'row', alignItems:'center', gap:3,}}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>Adresse : {item?.country}</Text>
                <Ionicons name="location-sharp" size={20} color="#078ECB" />
              </View>
                <Text style={{fontSize:14}}>Nom et Prénom : {item?.name}</Text>

                <Text style={{fontSize:14}}>Lieu : {item?.city}, {item?.street}</Text>

                <Text style={{fontSize:14}}>Code Postal : {item?.postalCode}</Text>

                <Text style={{fontSize:14}}>Numéro de Téléphone : {item?.mobileNo}</Text>

                <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                  <TouchableOpacity style={{backgroundColor:"#078ECB", paddingHorizontal:10, paddingVertical:8, marginTop:15, borderRadius:10}}>
                    <Text style={{color:"#fff", textAlign:'center', fontWeight:'bold'}}>Modifier</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{backgroundColor:"#E31837", paddingHorizontal:10, paddingVertical:8, marginTop:10, borderRadius:10}}>
                    <Text style={{color:"#fff", textAlign:'center', fontWeight:'bold'}}>Supprimer</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{backgroundColor:"gold", paddingHorizontal:10, paddingVertical:8, marginTop:10, borderRadius:10}}>
                    <Text style={{color:"#fff", textAlign:'center', fontWeight:'bold'}}>Adresse par défaut</Text>
                  </TouchableOpacity>
                </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  address: {
    padding:10,
    borderColor:'#078ECB',
    borderWidth:1,
    flexDirection:'column',
    gap:5,
    marginHorizontal:10,
    marginVertical:15
  }

});
