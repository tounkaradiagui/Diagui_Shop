import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItems from "../components/ProductItems";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";

const HomeScreen = () => {
  const lists = [
    {
      id: 0,
      image:
        "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "T-Shirt",
    },
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      name: "T-Shirt",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/8670488/pexels-photo-8670488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Mokassin",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Air Nike",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/11209837/pexels-photo-11209837.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Jordan",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/12628402/pexels-photo-12628402.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Air Force",
    },
    {
      id: 1,
      name: "Clothesd",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2024-01-31T05:44:07.000Z",
      updatedAt: "2024-01-31T06:34:44.000Z",
    },
    {
      id: 2,
      name: "Electronics",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
      creationAt: "2024-01-31T05:44:07.000Z",
      updatedAt: "2024-01-31T05:44:07.000Z",
    },
    {
      id: 3,
      name: "Furniture",
      image: "https://i.imgur.com/Qphac99.jpeg",
      creationAt: "2024-01-31T05:44:07.000Z",
      updatedAt: "2024-01-31T05:44:07.000Z",
    },
    {
      id: 4,
      name: "Shoes",
      image: "https://i.imgur.com/qNOjJje.jpeg",
      creationAt: "2024-01-31T05:44:07.000Z",
      updatedAt: "2024-01-31T05:44:07.000Z",
    },
  ];

  const images = [
    "https://images.pexels.com/photos/10726876/pexels-photo-10726876.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/12628402/pexels-photo-12628402.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/18946900/pexels-photo-18946900/free-photo-of-mode-herbe-style-marque.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/637076/pexels-photo-637076.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/12725055/pexels-photo-12725055.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/8859144/pexels-photo-8859144.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/6540917/pexels-photo-6540917.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/5584997/pexels-photo-5584997.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  ];

  const trending = [
    {
      id: 0,
      title: "Trending Shoes",
      oldPrice: "15000",
      price: "10000",
      image:
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/12628402/pexels-photo-12628402.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: ["Black", "White"],
      size: ["40", "42"],
    },
    {
      id: 0,
      title: "Trending Shoes",
      oldPrice: "15000",
      price: "10000",
      image:
        "https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: ["Black", "White"],
      size: ["40", "42"],
    },
    {
      id: 0,
      title: "Trending Shoes",
      oldPrice: "15000",
      price: "10000",
      image:
        "https://images.pexels.com/photos/6540976/pexels-photo-6540976.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: ["Black", "White"],
      size: ["40", "42"],
    },
    {
      id: 0,
      title: "Trending Shoes",
      oldPrice: "15000",
      price: "10000",
      image:
        "https://images.pexels.com/photos/6540917/pexels-photo-6540917.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: "Black",
      size: "Normal",
    },
  ];

  const offers = [
    {
      id: 0,
      title: "Produits le plus populaire de la semaine",
      offers: "72% réduction",
      oldPrice: "12500",
      price: "8500",
      image:
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: "Grren",
      size: "XL XXL L M",
    },
    {
      id: 0,
      title: "Produits le plus populaire de la semaine",
      offers: "42% réduction",
      oldPrice: "12500",
      price: "8500",
      image:
        "https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/6540947/pexels-photo-6540947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: "Grren",
      size: "XL XXL L M",
    },
    {
      id: 0,
      title: "Produits le plus populaire de la semaine",
      offers: "72% discount",
      oldPrice: "12500",
      price: "8500",
      image:
        "https://images.pexels.com/photos/6540917/pexels-photo-6540917.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/6540917/pexels-photo-6540917.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540917/pexels-photo-6540917.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: "Grren",
      size: "XL XXL L M",
    },
    {
      id: 0,
      title: "Produits le plus populaire de la semaine",
      offers: "52% réduction",
      oldPrice: "12500",
      price: "8500",
      image:
        "https://images.pexels.com/photos/6540976/pexels-photo-6540976.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      carouselImages: [
        "https://images.pexels.com/photos/6540976/pexels-photo-6540976.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        "https://images.pexels.com/photos/6540914/pexels-photo-6540914.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      ],
      color: "Grren",
      size: "XL XXL L M",
    },
  ];

  const navigation = useNavigation();
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("men's clothing");
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  // console.log("products", JSON.stringify(products, null, 2));

  const cart = useSelector((state) => state.cart.cart);
  // console.log("Cart Logs", JSON.stringify(cart, null, 2));

  const onGenderOpen = useCallback(() => {
    setcompanyOpen(false);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <TouchableOpacity>
              <Ionicons name="cart" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Diagui Shop
            </Text>
            <TouchableOpacity>
              <Ionicons name="menu" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <TextInput
              placeholder="Rechercher un produit"
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <Ionicons
                name="search"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.deliveryAddress}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View>
              <Ionicons name="location-sharp" size={24} color="white" />
            </View>
            <View>
              <Text style={{ color: "white", fontSize: 14 }}>
                Livraison à Diagui Tounkara - Ville : Bamako
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <ScrollView
            style={{ backgroundColor: "#f5f6fa" }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {lists.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productListCategories}
              >
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: "contain",
                    borderRadius: 10,
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            circleLoop
            dotColor={"#078ECB"}
            inactiveDotColor={"#f5f6fa"}
            paginationBoxVerticalPadding={20}
            autoplay
            resizeMethod={"resize"}
            resizeMode={"cover"}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
            ImageComponentStyle={{ width: "100%" }}
            imageLoadingColor="#078ECB"
          />

          <Text
            style={{
              margin: 10,
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 4,
              width: 160,
              borderBottomColor: "#078ECB",
            }}
          >
            Produits En Tendance
          </Text>
          <View style={styles.trending}>
            {trending.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ padding: 10 }}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 130,
                    height: 180,
                    borderRadius: 35 / 2,
                    resizeMode: "contain",
                    marginHorizontal: 12,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={{
              margin: 10,
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 4,
              width: 140,
              borderBottomColor: "#078ECB",
            }}
          >
            Produits Populaire
          </Text>
          {/* <Text style={{margin:10, fontSize:16, fontWeight:'bold', borderBottomWidth:4, width:'30%', borderBottomColor:'#078ECB'}} /> */}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 130,
                    height: 180,
                    borderTopRightRadius: 35 / 2,
                    borderTopLeftRadius: 35 / 2,
                    resizeMode: "contain",
                    marginHorizontal: 10,
                  }}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E31837",
                    marginHorizontal: 10,
                    width: 130,
                  }}
                  onPress={() =>
                    navigation.navigate("Info", {
                      id: item.id,
                      title: item.title,
                      price: item?.price,
                      carouselImages: item?.carouselImages,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      item: item,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    {item?.offers}
                  </Text>
                </TouchableOpacity>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              margin: 10,
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 4,
              width: 240,
              borderBottomColor: "#078ECB",
            }}
          >
            Filtrer les Produits Par Catégorie
          </Text>
          <View style={{ marginHorizontal: 10, width: "90%" }}>
            <DropDownPicker
              style={{
                borderColor: "#878787",
                height: 25,
                marginBottom: open ? 120 : 25,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choisir une catégorie"
              placeholderStyle={styles.placeholderStyle}
              onOpen={onGenderOpen}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* {products.map((item, index) => (
              <ProductItems item={item} key={index}/>
            ))} */}
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItems item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Choisir votre adresse
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "gray",
                marginTop: 10,
              }}
            >
              Selectionner l'adresse de livraison pour voir la disponibilitéé de
              produits ou un point de retrait
            </Text>
          </View>

          <ScrollView
            style={{ marginBottom: 18 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* Adresses added by the client */}
            <TouchableOpacity
              style={{
                width: 140,
                height: 140,
                borderColor: "#078ECB",
                borderWidth: 2,
                marginTop: 15,
                justifyContent: "center",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => {setModalVisible(false); navigation.navigate('Address')}}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "gray",
                }}
              >
                Cliquez ici pour ajouter une adresse ou un point de retrait
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={{ flexDirection: "column", marginBottom: 5 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <Ionicons name="location-sharp" size={20} color="#078ECB" />
              <Text>Ajouter une adresse spécifique : Rue, Caréfour ...</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <Ionicons name="locate" size={20} color="#078ECB" />
              <Text>Utiliser mon adresse actuele</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <Ionicons name="earth" size={20} color="#078ECB" />
              <Text>Livraison en dehors de Bamako</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#078ECB",
    height: 150,
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    backgroundColor: "gold",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8,
  },
  searchInput: {
    width: "90%",
    fontSize: 16,
  },
  deliveryAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    marginTop: 8,
    gap: 5,
  },
  productListCategories: {
    margin: 8,
    padding: 6,
    alignItems: "center",
  },
  trending: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
