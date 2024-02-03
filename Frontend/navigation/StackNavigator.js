import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';

const StackNavigator = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs () {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={
            {
              tabBarLabel: "Accueil",
              tabBarLabelStyle:{color:"#078ECB"},
              headerShown:false,
              tabBarIcon:({focused}) => focused  ? (
                <Ionicons name="home-sharp" size={24} color="#078ECB" />
              ) : (
                <Ionicons name="home-outline" size={24} color="black" />
              )
            }
          }/>
          <Tab.Screen name="Profile" component={HomeScreen} options={
            {
              tabBarLabel: "Profil",
              tabBarLabelStyle:{color:"#078ECB"},
              headerShown:false,
              tabBarIcon:({focused}) => focused  ? (
                <Ionicons name="person" size={24} color="#078ECB" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              )
            }
          }/>
          <Tab.Screen name="Panier" component={HomeScreen} options={
            {
              tabBarLabel: "Panier",
              tabBarLabelStyle:{color:"#078ECB"},
              headerShown:false,
              tabBarIcon:({focused}) => focused  ? (
                <Ionicons name="cart-sharp" size={24} color="#078ECB" />
              ) : (
                <Ionicons name="cart-outline" size={24} color="black" />
              )
            }
          }/>
        </Tab.Navigator>
      )
  }



  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen} />
            <Stack.Screen name="Register" options={{headerShown:false}} component={RegisterScreen} />
            <Stack.Screen name="Main" options={{headerShown:false}} component={BottomTabs} />
            <Stack.Screen name="Info" options={{headerShown:false}} component={ProductInfoScreen} />
            <Stack.Screen name="AddAddress" options={{headerShown:false}} component={AddAddressScreen} />
            <Stack.Screen name="Address" options={{headerShown:false}} component={AddressScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})