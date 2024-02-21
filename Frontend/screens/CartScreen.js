import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HeaderScreen from "./HeaderScreen";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducercer";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalAmount = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

    const dispatch = useDispatch();
    const increaseQuantity = (item) => {
      dispatch(incrementQuantity(item));
    };

    const decreaseQuantity = (item) => {
      dispatch(decrementQuantity(item));
    };

    const removeItem = (item) => {
      dispatch(removeFromCart(item));
    };
  // console.log("Cart items", cart);
  // console.log("Cart items total", totalAmount);

  return (
    <>
      {/* Header component */}
      <HeaderScreen />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Empty message when there are no products in the cart */}
        {cart.length === 0 ? (
          <Text style={{ fontSize: 18, fontWeight: "400", padding: 10 }}>
            Votre panier est vide
          </Text>
        ) : (
          /* Display all the products added to the cart with their details and price */
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              Détails de votre panier :
            </Text>
            {/* Map through each product in the cart array and display it */}
            {cart.map((item, index) => (
              <View
                style={{
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: "#078ECB",
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }}
                key={index}
              >
                <Pressable
                  style={{ marginVertical: 10, flexDirection: "row", gap: 15 }}
                >
                  {/* Product image container */}
                  <View>
                    <Image
                      source={{ uri: item?.image }}
                      style={{ width: 150, height: 150 }}
                      resizeMode="contain"
                    />
                  </View>
                  {/* Product information container */}
                  <View
                    style={{ marginTop: 10, flexDirection: "column", gap: 5 }}
                  >
                    <Text numberOfLines={2} style={{ width: 150 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Nom du produit :
                      </Text>{" "}
                      {item.title}
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>
                        Prix unitaire :{" "}
                      </Text>
                      {item?.price} F CFA
                    </Text>
                    <Text style={{ fontWeight: "bold", color: "green" }}>
                      En Stock
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Note : </Text>{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {item?.rating.rate}
                      </Text>{" "}
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Quantité : </Text>
                      {item.quantity}
                    </Text>
                  </View>
                </Pressable>
                {/* Button to remove a single item or all of them from the cart */}
                <Pressable>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 7,
                    }}
                  >
                    {item?.quantity === 1 ? (

                      <TouchableOpacity
                      onPress={() => removeItem(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderRadius: 6,
                        }}
                      >
                        <Ionicons name="trash" size={20} color="black" />
                      </TouchableOpacity>
                    ) : (

                      <TouchableOpacity
                      onPress={() => decreaseQuantity(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderRadius: 6,
                        }}
                      >
                        <Entypo name="minus" size={20} color="black"/>
                      </TouchableOpacity>
                    )}
                    
                    <View style={{ paddingHorizontal: 15 }}>
                      <Text style={{ fontSize: 18 }}>{item?.quantity}</Text>
                    </View>

                    <TouchableOpacity
                    onPress={() => increaseQuantity(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderRadius: 6,
                        marginLeft: 7,
                      }}
                    >
                      <Entypo name="plus" size={20} color="#078ECB" />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => removeItem(item)}
                      style={{
                        backgroundColor: "#E31837",
                        borderRadius: 6,
                        marginLeft: 50,
                      }}
                    >
                      <Text
                        style={{ fontSize: 14, padding: 8, color: "white" }}
                      >
                        Supprimer tout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    marginLeft: 10,
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{ backgroundColor: "gold", borderRadius: 6 }}
                  >
                    <Text
                      style={{ fontSize: 14, padding: 8, fontWeight: "bold" }}
                    >
                      Sauver pour plutard
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "gold",
                      borderRadius: 6,
                      marginLeft: 25,
                    }}
                  >
                    <Text
                      style={{ fontSize: 14, padding: 8, fontWeight: "bold" }}
                    >
                      Article similaire
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
            ))}
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 15,
                gap: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "400" }}>
                Sous Total:
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {totalAmount} F CFA
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "gold",
                marginVertical: 12,
                padding: 10,
                marginHorizontal: 25,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginHorizontal: 10,
                }}
              >
                Acheter maintenant ({cart.length}) articles
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                height: 1,
                borderColor: "#078ECB",
                borderWidth: 1,
                marginTop: 15,
              }}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {},
});
