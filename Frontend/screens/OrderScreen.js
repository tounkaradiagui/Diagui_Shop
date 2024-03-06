import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

const OrderScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout( () => {
            navigation.replace('Main')
        }, 1300)
    }, []);

  return (
    <SafeAreaView style={{backgroundColor:'white', flex:1}}>
      <LottieView
        source={require('../assets/thumbs.json')}
        style={{
            height:260,
            width:300,
            alignSelf:'center',
            marginTop:40,
            justifyContent:"center"
        }}
        speed={0.7}
        autoPlay
        loop={false}
      />
        <Text
            style={{
                marginTop:20,
                fontSize:18,
                fontWeight:"600",
                textAlign:"center"
            }}
        >Votre commande a été prise en compte !
        </Text>
        <LottieView
            source={require('../assets/sparkle.json')}
            style={{
                height:300,
                width:300,
                position:'absolute',
                top:100,
                alignSelf:"center"
            }}
            speed={0.7}
            autoPlay
            loop={false}
        />
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})