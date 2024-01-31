import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const ProductItems = ({item}) => {
  return (
    <Pressable style={{paddingVertical:10, marginHorizontal:10, justifyContent:'space-between', }}>

        <Image style={{width:130, height:140, margin:10, borderRadius:16, resizeMode:'contain'}} source={{uri:item?.image}} />

        <Text numberOfLines={1} style={{width:130, textAlign:'center', marginTop:10}}>{item?.title}</Text>

        <View style={{justifyContent:'space-between', flexDirection:'row',  alignItems:'center', paddingHorizontal:10}}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>${item?.price}</Text>
            <Text style={{fontSize:15, color:'#ffc72c', fontWeight:'bold'}}>{item?.rating.rate} Notes</Text>
        </View>

        <TouchableOpacity style={{flexDirection:'row', backgroundColor:'gold', justifyContent:'center', marginHorizontal:10, paddingVertical:5, gap:25, marginTop:10}}>
            <FontAwesome name="cart-plus" size={24} color="black" />
            <Text style={{alignItems:'center', fontSize:16, fontWeight:'bold'}}>Panier</Text>
        </TouchableOpacity>
    </Pressable>
    // const [items, setItems] = useState([
    //     {label: "Men's clothing", value: "men' clothing"},
    //     {label: 'jewerely', value: 'jewerely'},
    //     {label: 'electronics', value: 'electronics'},
    //     {label: "women's clothing", value: "women's clothing"}
    //   ]);

    // {products?.filter((item) => item.category === category).map((item, index) => (
    //     <ProductItems item={item} key={index}/> 
    //   ))}
  )
}


export default ProductItems

const styles = StyleSheet.create({})