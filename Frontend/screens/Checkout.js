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
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearCart } from "../redux/CartReducercer";

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
  const navigation = useNavigation();

  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  const totalItems = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

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

  const handlePlaceOrder = async  () => {
    try {
      const orderData = {
        userId: userId,
        cartItems:cart,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOptions,
        totalPrice:totalItems
      };

      const response = await axios.post("http://192.168.8.106:8000/orders",orderData );
      if (response.status === 200) {
        dispatch(clearCart());
        console.log("order placed successfully!", response.data.order);
        navigation.navigate("Order");
      } else {
        console.log("Erreur de commande", response.data);
      }
      
    } catch (error) {
      console.log(error, "Erreur");
    }
  }

  // console.log(selectedAddress);

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
            <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
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
                  <Text
                    style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}
                  >
                    {" "}
                    &#10003;
                  </Text>
                ) : (
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ marginTop: 5, textAlign: "center" }}>
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
              <Pressable
                key={index}
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#078ECB",
                  gap: 10,
                  paddingBottom: 15,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <Ionicons
                    name="checkmark-circle-sharp"
                    size={20}
                    color="green"
                  />
                ) : (
                  <Entypo
                    name="circle"
                    size={20}
                    color="black"
                    onPress={() => setSelectedAddress(item)}
                  />
                )}
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
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

                  <View style={{ alignItems: "center" }}>
                    {selectedAddress && selectedAddress._id === item?._id && (
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
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Veuillez choisir votre mode de livraison
          </Text>

          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              backgroundColor: "white",
              alignItems: "center",
              padding: 8,
              gap: 10,
              borderWidth: 1,
              borderColor: "#078ECB",
            }}
          >
            {options ? (
              <Ionicons name="checkmark-circle-sharp" size={20} color="green" />
            ) : (
              <Entypo
                name="circle"
                size={20}
                color="black"
                onPress={() => setOptions(!options)}
              />
            )}
            <Text style={{ fontWeight: "bold", flex: 1 }}>
              <Text style={{ color: "green" }}>
                Tous les jours du lundi au vendredi: 9h - 13h et 14h - 18h.
              </Text>
              <Text>Livraison gratuite jusqu'à 25 000 F CFA</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setCurrentStep(2)}
            style={{ backgroundColor: "#078ECB", justifyContent: "center" }}
          >
            <Text
              style={{
                alignSelf: "center",
                paddingVertical: 10,
                color: "#fff",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Continuer
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Veuillez choisir votre méthode de paiement
          </Text>

          <View style={{
                
                gap: 15,
                paddingVertical: 15,
                paddingHorizontal: 5,
                marginTop: 10,
               
              }}>
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                gap: 15,
                paddingVertical: 15,
                paddingHorizontal: 5,
                marginTop: 10,
                borderWidth: 1,
                borderColor: "#D0D0D0",
              }}
            >
              {selectedOptions === "cash" ? (
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={22}
                  color="green"
                />
              ) : (
                <Entypo
                  name="circle"
                  size={20}
                  color="black"
                  onPress={() => setSelectedOptions("cash")}
                />
              )}
              <Text>Paiement à la livraison : Gratuit</Text>
            </View>
            <View style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  gap: 15,
                  paddingVertical: 15,
                  paddingHorizontal: 5,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                }}>
              {selectedOptions === "card" ? (
                  <Ionicons
                    name="checkmark-circle-sharp"
                    size={22}
                    color="green"
                  />
                ) : (
                  <Entypo
                    name="circle"
                    size={20}
                    color="black"
                    onPress={() => setSelectedOptions("card")}
                  />
                )}
              <Pressable >
                <Text>Paiement par CB Visa/MasterCard</Text>
              </Pressable>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setCurrentStep(3)}
            style={{ backgroundColor: "#078ECB", justifyContent: "center" }}
          >
            <Text
              style={{
                alignSelf: "center",
                paddingVertical: 10,
                color: "#fff",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Continuer
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep == 3 && selectedOptions === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Passez la commande maintenant
        </Text>

        <View style={{
              gap: 15,
              paddingVertical: 15,
              paddingHorizontal: 5,
              marginTop: 10,
             
            }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              gap: 15,
              paddingVertical: 15,
              justifyContent:'space-between',
              paddingHorizontal:10,
              marginTop: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
            }}
          >
            <Ionicons name="cash" size={24} color="black" />
            <Text>Livraison gratuite partout à Bamako</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor:"#fff", padding:8,  paddingHorizontal:10, marginTop:10, borderWidth:1, borderColor:"#D0D0D0"}}>
          <Text>Livré à Mr {selectedAddress?.name}</Text>
          <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', marginTop:10}}>
            <Text>Prix de l'article</Text>
            <Text style={{fontSize:14, fontWeight:"300"}}>{totalItems} F CFA</Text>
          </View>

          <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', marginTop:6}}>
            <Text>Frais de livraison </Text>
            <Text style={{fontSize:14, fontWeight:"300"}}>0 F CFA</Text>
          </View>

          <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center', marginTop:10}}>
            <Text>Prix toltal de la commande </Text>
            <Text style={{fontSize:14, fontWeight:"bold"}}>{totalItems} F CFA</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={{ backgroundColor: "gold", justifyContent: "center" }}
        >
          <Text
            style={{
              alignSelf: "center",
              paddingVertical: 10,
              color: "#000",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Acheter
          </Text>
        </TouchableOpacity>
      </View>
      )}

      {/* {currentStep == 3 && selectedOptions === "cash" && (
        
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
