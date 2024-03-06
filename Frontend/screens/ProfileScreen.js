import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUserProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.8.106:8000/profile/${userId}`);
        const user = response.data;
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    authUserProfile();
  },[]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.8.106:8000/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log(error);

      }
    }
    fetchUserOrders();
  },[]);

  console.log("orders :",  JSON.stringify(orders, null, 2));

  const handleLogout = () => {
    clearAuthToken();
    navigation.replace('Login');
  }

  const clearAuthToken = async () => {
    // Remove token from local storage
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    setUserId("");
  }
  return (
    <SafeAreaView>
      <View style={{padding:20}}>
        <Text>Welcome {user?.name}</Text>
      </View>
      <View style={{padding:20}}>

        <TouchableOpacity onPress={handleLogout} style={{backgroundColor:'#D0D0D0', padding:5, marginHorizontal:20}}>
          <Text style={{fontSize:20, alignSelf:'center', fontWeight:'bold'}}>
          Déconnexion
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {loading ? (
          <Text>Chargement...</Text>
        ) : orders.length > 0 ? (
            orders.map((order) => (
              <Pressable
                key={order._id}
                style={{
                  marginTop:20,
                  padding:15,
                  borderRadius:8,
                  borderWidth:1,
                  borderColor:"#D0D0D0",
                  marginHorizontal:10,
                  justifyContent:"center",
                  alignItems:"center"
                }}
              >
                {
                  order.products.map((product) => (
                    <View key={product._id}>
                      <Image source={{uri:product.image}}
                        style={{width:100, height:100, resizeMode:"contain"}}
                      />
                    </View>
                ))}
              </Pressable>
            ))
        ) : (
          <Text>Aucune commande disponible</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})