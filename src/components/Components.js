import { useNavigation } from "@react-navigation/native"
import React from "react"
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Image,

} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"

import { constants } from "../utils/Utils"
const CustButton = ({ text, color, ...props }) => {
    return (
        <TouchableOpacity {...props}
            style={{ width: '100%', height: 55, backgroundColor: constants.green, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
            <Text style={{ color: color }}>{text}</Text>
        </TouchableOpacity>
    )
}

const InputField = ({ label, placeholder, ...props }) => {
    return (

        <View>
            <Text style={{ marginTop: 30, fontWeight: 'bold' }}>{label}</Text>
            <TextInput style={{ width: '100%', height: 55 }} {...props} placeholder={placeholder} underlineColorAndroid='#eee' />
        </View>
    )
}

const ItemCard = (item, navigation) => {

    return (
        <TouchableOpacity style={{ backgroundColor: 'white', width: 168, marginRight: 15, height: 200, padding: 10, borderRadius: 10, justifyContent: 'space-around', borderColor: '#ddd', borderWidth: 2 }}
            onPress={() => {
                navigation.navigate('ItemDescriptionScreen', { item: item })
            }}
        >
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 80, resizeMode: 'contain' }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
            <Text>{item.label}</Text>
            <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.price}</Text>
                <Icon name="add-box" size={35} color={constants.green} />
            </View>

        </TouchableOpacity>
    )
}

const CategoriesCard = (item, navigation) => {

    const randomColor = "#"+Math.floor(Math.random()*16777215).toString(16)+'99';

    return (
        <TouchableOpacity style={{ backgroundColor: randomColor, width: 168, marginRight: 10, marginBottom: 10, height: 200, padding: 10, borderRadius: 10, justifyContent: 'space-around', borderColor: '#ddd', borderWidth: 2 }}
            onPress={() => {

                navigation.navigate('ItemListScreen', { category: item.Categories })
            }}
        >

            <Image source={{ uri: item.Image }} style={{ width: '100%', height: 80, resizeMode: 'contain' }} />
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.Title}</Text>

        </TouchableOpacity>
    )
}

const CartItem = (item, navigation,addQty,removeQty,removeItem) => {
    
    
        return (
            <TouchableOpacity style={{ backgroundColor: 'white', width: "100%", padding: 10, borderRadius: 10, justifyContent: 'space-between', borderColor: '#ddd', borderWidth: 2, flexDirection: 'row',marginBottom:10 }}
                onPress={() => {
                      navigation.navigate('ItemDescriptionScreen',{item:item})
                }}
            >
                <Image source={{ uri: item.image }} style={{ width: 70, height: 70, resizeMode: 'contain' }} />

                <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' ,marginHorizontal:15}}>{item.name}</Text>
                    <Text>{item.label}</Text>
{ item.qty &&
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Icon name="remove" size={24} onPress={() => { removeQty(item) }} />
                <TextInput value={item.qty+""} style={{ height: 30, marginHorizontal: 15, borderWidth: 2, borderColor: '#ddd', borderRadius: 5, fontSize: 18, padding: 0, paddingLeft: 12 }} />
                <Icon name="add" size={24} onPress={() => { addQty(item) }} />
                 </View>
}
                </View>

                <View style={{}}>
                    <Icon name="close" size={35} color={constants.green} onPress={()=>{removeItem(item)}}/>
                    <Text style={{ fontWeight: 'bold', color: 'black' ,marginHorizontal:15}}>{item.price}</Text>
                </View>

            </TouchableOpacity>
        )
    
}

export { CustButton, InputField, ItemCard, CategoriesCard, CartItem };