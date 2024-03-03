import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

const Checkout = () => {
  const steps = [
    { title: "Adresse", content: "Formulaire d'adresse" },
    { title: "Livraison", content: "Choix, Délais et conditions de livraison" },
    { title: "Paiement", content: "Choix du moyen de paiement" },
    { title: "Confirmer", content: "Résumer de la commande" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.234.140:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(selectedAddress);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}

              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    backgroundColor: "#ddd",
                    borderRadius: 14,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text style={{ fontWeight: "bold", fontSize: 16, color:"#fff"}}>
                    {" "}
                    &#10003;
                  </Text>
                ) : (
                  <Text style={{ fontWeight: "bold", fontSize: 16}}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ marginTop: 5, textAlign: "center"}}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Veuillez choisir une adresse de livraison
          </Text>
          <Pressable style={{}}>
            {addresses?.map((item, index) => (
                <Pressable key={index} style={{flexDirection:'row', marginVertical:10, padding:10, borderWidth:1, borderColor: "#078ECB", gap:10, paddingBottom:15}}>
                    {selectedAddress  && selectedAddress._id === item?._id ? (
                        <Ionicons name="checkmark-circle-sharp" size={20} color="green" /> 
                    ) : (
                        <Entypo name="circle" size={20} color="black" onPress={() => setSelectedAddress(item)}/>
                    )}
                    <View>
                        <View
                        style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                        >
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                            Adresse : {item?.country}
                        </Text>
                        <Ionicons name="location-sharp" size={20} color="#078ECB" />
                        </View>
                        <Text style={{ fontSize: 14 }}>
                        Nom et Prénom : {item?.name}
                        </Text>

                        <Text style={{ fontSize: 14 }}>
                        Lieu : {item?.city}, {item?.street}
                        </Text>

                        <Text style={{ fontSize: 14 }}>
                        Code Postal : {item?.postalCode}
                        </Text>

                        <Text style={{ fontSize: 14 }}>
                        Numéro de Téléphone : {item?.mobileNo}
                        </Text>

                        <View style={{alignItems: "center"}}>
                            {selectedAddress  && selectedAddress._id === item?._id && (
                                <TouchableOpacity
                                onPress={() => setCurrentStep(1)}
                                    style={{
                                    backgroundColor: "#078ECB",
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    marginTop: 15,
                                    borderRadius: 10,
                                    }}
                                >
                                    <Text
                                    style={{
                                        color: "#fff",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                    >
                                        Définir comme adresse de livraison
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{marginHorizontal:20}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Veuillez choisir votre mode de livraison</Text>

            <View style={{marginVertical:20, flexDirection:'row', backgroundColor:'white', alignItems:'center', padding:8, gap:10, borderWidth:1, borderColor: "#078ECB"}}>
                <Ionicons name="checkmark-circle-sharp" size={20} color="green" /> 
                <Text style={{fontWeight: 'bold', flex:1}}>
                    <Text style={{color:'green'}}>Tous les jours du lundi  au vendredi: 9h - 13h et 14h - 18h.</Text>
                    
                    <Text>Livraison gratuite jusqu'à 25 000 F CFA</Text>
                    {/* <Text>Livraison  payante à partir de 30 000 F CFA</Text> */}
                </Text>
                {/* <Entypo name="circle" size={20} color="black"/> */}
            </View>
            <TouchableOpacity>
                <Text>Continuer</Text>
            </TouchableOpacity>
        </View>
      )}

      {/* {currentStep == 1 && (
        <View style={{marginHorizontal:20}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Veuillez choisir votre méthode de paiement</Text>

            <View>
                <Ionicons name="checkmark-circle-sharp" size={20} color="green" /> 
                <Entypo name="circle" size={20} color="black"/>
                <Text>Paiement à la livraison  : Gratuit</Text>
            </View>
            <TouchableOpacity>
                <Text>Paiement par carte bancaire Visa/MasterCard</Text>
            </TouchableOpacity>
        </View>
      )} */}
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
