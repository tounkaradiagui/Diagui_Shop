import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { addToCart } from "../redux/CartReducercer";
import { useDispatch, useSelector } from "react-redux";

const ProductItems = ({ item }) => {

  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const addItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 60000)
  }
  const cart = useSelector((state) => state.cart.cart);
  // console.log("Cart Logs", cart);
  return (
    <Pressable
      style={{
        paddingVertical: 10,
        marginHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      <Image
        style={{
          width: 130,
          height: 140,
          margin: 10,
          borderRadius: 16,
          resizeMode: "contain",
        }}
        source={{ uri: item?.image }}
      />

      <Text
        numberOfLines={1}
        style={{ width: 130, textAlign: "center", marginTop: 10 }}
      >
        {item?.title}
      </Text>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>${item?.price}</Text>
        <Text style={{ fontSize: 15, color: "#ffc72c", fontWeight: "bold" }}>
          {item?.rating.rate} Notes
        </Text>
      </View>

        {addedToCart ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "gold",
              justifyContent: "center",
              marginHorizontal: 10,
              paddingVertical: 5,
              gap: 25,
              marginTop: 10,
            }}
    
            onPress={() => addItemToCart(item)}
          >
            <FontAwesome name="cart-plus" size={24} color="black" />
            <Text style={{ alignItems: "center", fontSize: 16, fontWeight: "bold" }}>
              Ajouté
            </Text>
          </TouchableOpacity>
        ) : (

          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "gold",
              justifyContent: "center",
              marginHorizontal: 10,
              paddingVertical: 5,
              gap: 25,
              marginTop: 10,
            }}
    
            onPress={() => addItemToCart(item)}
          >
            <FontAwesome name="cart-plus" size={24} color="black" />
            <Text style={{ alignItems: "center", fontSize: 16, fontWeight: "bold" }}>
              Panier
            </Text>
          </TouchableOpacity>
        )}
    </Pressable>
    // const [items, setItems] = useState([
    //     {label: "Men's clothing", value: "men' clothing"},
    //     {label: 'jewerely', value: 'jewerely'},
    //     {label: 'electronics', value: 'electronics'},
    //     {label: "women's clothing", value: "women's clothing"}
    //   ]);

    // {products?.filter((item) => item.category === category).map((item, index) => (
    //     <ProductItems item={item} key={index}/>
    //   ))}
  );
};

export default ProductItems;

const styles = StyleSheet.create({});
