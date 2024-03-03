import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const RegisterScreen = () => {

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const userData = {
      name:name,
      email:email,
      phone:phone,
      password:password,
    };

    // Envoie d'une requete au backend API en utilisant axios
    axios.post("http://192.168.234.140:8000/register", userData)
      .then((response) => {
        console.log(response.data);
        Alert.alert(
          "Inscription effectuée Succès",
          "Votre inscription a réussie"
        );
      // setName("");
      // setEmail("");
      // setPassword("");
      // setPhone("");

    }).catch((error) => {
      Alert.alert("Inscription echouée", "Veuillez réessayer");
      console.log("Erreur", error);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
       <ScrollView showsVerticalScrollIndicator={false} >

        <Image
          source={require("../assets/images/shopping.png")}
          resizeMode="contain"
          style={{
            width: "50%",
            height: 200,
            marginHorizontal:80,
            alignContent:'center'
          }}
        />

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              Inscription sur Diagui-Shop
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingVertical: 5,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#078ECB",
              }}
            >
              <Ionicons
                style={{ marginLeft: 5 }}
                name="person"
                size={24}
                color="black"
              />
              <TextInput
                require={true}
                placeholder="Nom et Prénom"
                value={name}
                onChangeText={(text) => setName(text)}
                style={{ width: 250 }}
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderWidth: 2,
                borderColor: "#078ECB",
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <Ionicons
                style={{ marginLeft: 5 }}
                name="mail"
                size={24}
                color="black"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ width: 250 }}
                placeholder="Adresse Email"
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderWidth: 2,
                borderColor: "#078ECB",
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <Ionicons
                style={{ marginLeft: 5 }}
                name="call"
                size={24}
                color="black"
              />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={{ width: 250 }}
                placeholder="Numéro de Téléphone"
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderWidth: 2,
                borderColor: "#078ECB",
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <Ionicons
                style={{ marginLeft: 5 }}
                name="lock-closed"
                size={24}
                color="black"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
                style={{ width: 250 }}
                placeholder="Mot de passe"
              />

              <Ionicons
                onPress={togglePasswordVisibility}
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="black"
                marginRight={5}
              />
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              onPress={handleRegister}
              style={{
                width: 200,
                backgroundColor: "#FEBE10",
                borderRadius: 5,
                padding: 15,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack("Login")}>
            <Text
              style={{ fontWeight: "bold", textAlign: "center", marginTop: 25 }}
            >
              Déjà inscrit ? Cliquez Ici pour s'authentifier
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
       </ScrollView>
  </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})