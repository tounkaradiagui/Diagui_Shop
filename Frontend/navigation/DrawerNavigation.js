import { View, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { COLORS, images } from "../constants";
import { Ionicons } from "@expo/vector-icons";
// import BottomTabNavigations from "./BottomTabNavigations";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StackNavigator from "./StackNavigator";
import Profile from './../pages/Profile';
import Orders from './../pages/Orders';
import Favoris from './../pages/Favoris';
import Message from "../pages/Message";
import Notifications from './../pages/Notifications';
import Address from './../pages/Address';
import Settings from './../pages/Settings';
import Support from './../pages/Support';
import HomeScreen from "../screens/HomeScreen";


const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.primary,
              }}
            >
              <Image
                source={images.avatar}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 999,
                  marginBottom: 12,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 6,
                  color: COLORS.white,
                }}
              >
                Diagui Tounkara
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.white,
                }}
              >
                Fullstack Developer
              </Text>
              <TouchableOpacity
            //   onPress={() => logout(navigation)}
              >              
                <Text
                  style={{
                    fontSize: 15,
                    color: COLORS.white,
                    marginTop:10,
                  }}
                >
                  Déconnexion
                </Text>
              </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: 250,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerShown: false,
        drawerLabelStyle: {
          color: COLORS.black,
          fontSize: 14,
          marginLeft: -10,
        },
        hearderTinColor: COLORS.black,
      }}
    >
      <Drawer.Screen
        name="Main"
        options={{
          drawerLabel: "Main",
          title: "Main",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Bot}
      />
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Accueil",
          title: "Accueil",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Mon Profil",
          title: "Profil",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="person-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Profile}
      />
      <Drawer.Screen
        name="Orders"
        options={{
          drawerLabel: "Commande",
          title: "Commande",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="gift-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Orders}
      />
      <Drawer.Screen
        name="Favoris"
        options={{
          drawerLabel: "Favoris",
          title: "Favoris",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="heart-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Favoris}
      />
      <Drawer.Screen
        name="Message"
        options={{
          drawerLabel: "Message",
          title: "Messages",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="mail-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Message}
      />
      <Drawer.Screen
        name="Notification"
        options={{
          drawerLabel: "Notification",
          title: "Notifications",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.black}
            />
          ),
        }}
        component={Notifications}
      />
      <Drawer.Screen
        name="Address"
        options={{
          drawerLabel: "Adresse de livraison",
          title: "Adresse de livraisons",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="location-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Address}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          drawerLabel: "Paramètre",
          title: "Paramètres",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="cog-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Settings}
      />
      <Drawer.Screen
        name="Support"
        options={{
          drawerLabel: "Aide",
          title: "Aide",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={COLORS.black}
            />
          ),
        }}
        component={Support}
      />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
