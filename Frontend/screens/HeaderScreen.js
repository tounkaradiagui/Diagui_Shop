import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HeaderScreen = () => {
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
    </SafeAreaView>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
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
});
