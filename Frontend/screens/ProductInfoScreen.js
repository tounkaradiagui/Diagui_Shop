import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProductInfoScreen = ({ item }) => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const navigation = useNavigation();
  return (
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params.carouselImages.map((item, index) => (
            <ImageBackground
              key={index}
              source={{ uri: item }}
              style={{ width, flex: 1, height, resizeMode: "contain" }}
            >
                <View style={{padding:8,  alignItems:"center", flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={styles.imageOverlay}>
                        <Text
                        style={{
                            textAlign:'center',
                            fontSize: 16,
                            color: "white",
                            fontWeight: "bold",
                        }}
                        >
                        20%
                        </Text>
                    </View>
                    <View style={styles.iconOverlay}>
                        <Ionicons name="share-social-sharp" size={24} color="black" 
                            style={{
                                textAlign:'center',
                                fontSize: 26,
                                fontWeight: "bold",
                            }}
                        /> 
                           
                    </View>
                </View>
                <View style={styles.heartOverlay}>
                    <Ionicons name="heart-outline" size={24} color="black"
                        style={{
                        textAlign:'center',
                        fontSize: 26,
                        fontWeight: "bold",
                    }}/> 
                        
                </View>
            </ImageBackground>
          ))}
        </ScrollView>

        <View style={{padding:10}}>
            <Text style={{fontSize:15, fontWeight:'500'}}>{route?.params.title}</Text>
            <Text style={{fontSize:16, fontWeight:'500', marginTop:10}}>Prix : {route?.params.price} F CFA</Text>
        </View>

        <Text style={{height:1, borderColor:'#D0D0D0', borderWidth:2}} />

        <View style={{flexDirection:'row', alignItems:'center', margin:10}}>
            <Text>Couleurs :</Text>
            <Text style={{fontSize:15, fontWeight:'500'}}> {route?.params.color}</Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'center', margin:10}}>
            <Text>Taille :</Text>
            <Text style={{fontSize:15, fontWeight:'500'}}> {route?.params.size}</Text>
        </View>

        <Text style={{height:1, borderColor:'#D0D0D0', borderWidth:2}} />
        
        <View style={{padding:10}}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>Total : {route?.params.price} F CFA</Text>
            <Text style={{color:'black', marginTop: 5}}>Livraison possible à partir de demain entre 10h et 18h30.</Text>
        </View>

        <View style={{padding:10, flexDirection:'row', gap:3}}>
            <Ionicons name="location-sharp" size={24} color="black" />
            <Text style={{color:'black', marginTop: 5}}>Livraison à Diagui Tounkara - Ville : Bamako</Text>
        </View>

        <Text style={{height:1, borderColor:'#D0D0D0', borderWidth:2}} />

        <Text style={{padding:10, fontSize:16, color:'green'}}>En Stock</Text>

        <TouchableOpacity style={{padding:10}}>
            <Button color={'red'} text='black' title='Ajouter au panier' onPress={() => navigation.navigate('Main')} />
        </TouchableOpacity>

        <TouchableOpacity style={{padding:10, marginBottom:10}}>
            <Button title='Acheter' onPress={() => navigation.navigate('Main')} />
        </TouchableOpacity>
    
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
    container: {
        marginBottom:50
    },
  header: {
    backgroundColor: "#078ECB",
    height: 60,
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
  },
  imageOverlay: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center'
  },
  iconOverlay: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center'
  },
  heartOverlay: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "#D0D0D0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    marginLeft:10,
    marginTop:'auto',
    marginBottom:16
  },
});
