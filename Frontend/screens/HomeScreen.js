import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
        <TouchableOpacity>
          <Ionicons name="cart" size={24} color="white" />
        </TouchableOpacity>
          <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Diagui Shop</Text>
          <TouchableOpacity>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <TextInput placeholder='Rechercher un produit' style={styles.searchInput}/>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="black" style={{marginRight: 10}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.deliveryAddress}>
          <TouchableOpacity>
            <Ionicons name="location-sharp" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color:'white', fontSize:14}}>Livraison à Diagui Tounkara - Ville : Bamako</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text>HomeScreen</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 :  0,
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    backgroundColor:'#078ECB',
    height:150
  },
  subHeader: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:56,
    paddingHorizontal:16
  },
  searchBox: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:50,
    marginHorizontal: 16,
    paddingHorizontal:16,
    backgroundColor:'gold',
    borderColor: "white",
    borderWidth:2,
    borderRadius:8,
  },
  searchInput:{
    width:'90%',
    fontSize:16,
  },
  deliveryAddress: {
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:18,
    marginTop:8,
    gap:5
  }
})