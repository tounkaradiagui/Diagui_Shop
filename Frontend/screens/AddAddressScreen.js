import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import HeaderScreen from "./HeaderScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode';
import { UserType } from "../UserContext";
import axios from "axios";

const AddAddressScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  // const [houseNo, setHousseNo] = useState("");
  // const [landmark, SetLandmark] = useState("");

  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
        // console.log("User Token :", JSON.stringify(token, null, 2));
    }

    fetchUser();
  },[]);
  // console.log(userId)
    console.log("User ID :", JSON.stringify(userId, null, 2));

  const handleAddAddress = async () => {
    const address = {
      name,
      mobileNo,
      street,
      postalCode,
      city,
      country
    }

    // Vérifier si tous les  champs sont remplis avant de l'ajouter à la BDD
    if (name === "" || mobileNo === "" || city === "" || street === "" || postalCode === ""){
      Alert.alert("Erreur", 'Veuillez renseigner tout les champs');
    } else {
      try {
        response = await axios.post('http://192.168.234.140:8000/addresses', {userId, address}).then((res) => {
          // If everything is good, we can create a new item.
          Alert.alert("Success", "Address added");
          setName("");
          setMobileNo("");
          setCity("");
          setStreet("");
          setPostalCode("");
    
          setTimeout(() => {
            navigation.goBack("Address")
          }, 500)
    
          // console.log(res);
        }).catch((error) => {
          Alert.alert("Erreur de connexion", "Erreur d'enregistrement");
          console.log("Erreur: ", error);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <HeaderScreen />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "#F0F0F0" }}>
          <View>
            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 18,
                marginBottom: 10,
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Ajouter vore nouvelle adresse
            </Text>
            <TextInput
              placeholder="Bamako - Mali"
              value={country}
              onChangeText={(text) => setCountry(text)}
              padding={10}
              style={{
                height: 40,
                width: "85%",
                borderRadius: 10,
                fontSize: 16,
                borderColor: "#078ECB",
                borderWidth: 1,
                marginHorizontal: 28,
                textAlign: "auto",
              }}
            />

            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 18,
                marginBottom: 10,
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Votre nom complet
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Saisir le Nom et Prénom"
              padding={10}
              style={{
                height: 40,
                width: "85%",
                borderRadius: 10,
                fontSize: 16,
                borderColor: "#078ECB",
                borderWidth: 1,
                marginHorizontal: 28,
                textAlign: "auto",
              }}
            />

            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 18,
                marginBottom: 10,
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Numéro de Téléphone
            </Text>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholder="70123456"
              padding={10}
              style={{
                height: 40,
                width: "85%",
                borderRadius: 10,
                fontSize: 16,
                borderColor: "#078ECB",
                borderWidth: 1,
                marginHorizontal: 28,
                textAlign: "auto",
              }}
            />
          </View>

          <View>
            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 18,
                marginBottom: 10,
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Commune et Quartier
            </Text>
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              placeholder="Commune 6 - Faladié Socoro"
              padding={10}
              style={{
                height: 40,
                width: "85%",
                borderRadius: 10,
                fontSize: 16,
                borderColor: "#078ECB",
                borderWidth: 1,
                marginHorizontal: 28,
                textAlign: "auto",
              }}
            />
            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 18,
                marginBottom: 10,
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Adresse (Ex: Numéro de Rue ou autres)
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholder="Saisir votre adresse ou un point de retrait"
              padding={10}
              style={{
                height: 40,
                width: "85%",
                borderRadius: 10,
                fontSize: 16,
                borderColor: "#078ECB",
                borderWidth: 1,
                marginHorizontal: 28,
                textAlign: "auto",
              }}
            />

            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 18,
                marginBottom: 10,
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Code Postal
            </Text>
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholder="Saisir le code postal 99335"
              padding={10}
              style={{
                height: 40,
                width: "85%",
                borderRadius: 10,
                fontSize: 16,
                borderColor: "#078ECB",
                borderWidth: 1,
                marginHorizontal: 28,
                textAlign: "auto",
              }}
            />
          </View>
        </View>

        <View style={{ paddingVertical: 30, alignItems: "center" }}>
          <TouchableOpacity onPress={handleAddAddress}>
            <Text
              style={{
                backgroundColor: "#078ECB",
                padding: 14,
                borderRadius: 10,
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                width: 190,
                textAlign: "center",
              }}
            >
              Enregistrer
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
