import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderScreen from './HeaderScreen'
import { useSelector } from 'react-redux'

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const  totalAmount = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    console.log("Cart items", cart);
    console.log("Cart items total", totalAmount);
  return (
    <ScrollView style={styles.container}>
        {/* Header component */}
        <HeaderScreen />

        {/* Break line */}
        <Text style={{height:1, borderColor:"#078ECB", borderWidth:1, marginTop:15}}/>

        {/* Empty message when there are no products in the cart */}
        {cart.length === 0 ? (
            <Text style={{fontSize:18, fontWeight:'400'}}>Votre panier est vide</Text>
        ) : (
        /* Display all product details inside a view tag with flex direction set to column for vertical alignment*/
        /* Display all the products added to the cart with their details and price */
        <View>
            <Text style={{fontSize:20, fontWeight:'500', marginHorizontal:10}}>Infos commande :</Text>
            {/* Map through each product in the cart array and display it */}
            {cart.map((item, index) => (
                <View style={{backgroundColor:"white", marginVertical:10}}>
                    <Pressable key={index}> 
                        {/* Product image container */}
                        <TouchableOpacity>
                            <Image source={{uri: item?.image}} style={{width:150, height:150}}  resizeMode="contain"/>
                        </TouchableOpacity>
                    </Pressable>
                </View>
            ))} 
            <View style={{padding:10, flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:5}}>
                <Text style={{fontSize:18, fontWeight:'400'}}>Sous Total</Text>
                <Text style={{fontSize:20, fontWeight:'bold'}}>{totalAmount} F CFA</Text>
            </View>
            <TouchableOpacity style={{backgroundColor:'gold', marginVertical:12, padding:10, marginHorizontal:25, borderRadius:10}}> 
                <Text style={{fontSize:17, fontWeight:'bold', marginHorizontal:10}}>Acheter maintenant ({cart.length}) articles</Text>
            </TouchableOpacity>
    
            <Text style={{height:1, borderColor:"#078ECB", borderWidth:1, marginTop:15}}/>
        </View>
      )}
    </ScrollView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {

    }
})