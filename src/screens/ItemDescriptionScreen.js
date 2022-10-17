import firedatabase from "@react-native-firebase/database"
import firebase from "@react-native-firebase/firestore"
import React, { useEffect, useState } from "react"

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Alert,

} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"
import { CustButton } from "../components/Components"

export const ItemDescriptionScreen = ({ route }) => {

    const [qty, setqty] = useState(1)
    const [prdDetVis, setprdDetVis] = useState(true)
    const [cartItem,setcartItem] = useState();
    const [itemDescription, setitemDescription] = useState([{Desription:"", Review:""}])
    let item = route.params.item

    useEffect(() => {
        
        firebase().collection('ItemDetails').doc(item.name).get()
            .then((snap) => {
                
                setitemDescription(snap.data())

            }).catch((e)=>{
               // setitemDescription([])
            })

    }, [])

    const addQty = () => {
        setqty((data) => data + 1)
    }

    const removeQty = () => {
        if (qty > 1) {
            setqty((data) => data - 1)
        }
    }

    const addToBasket=()=>{
        firedatabase().ref('cart/'+item.name).set({...item,qty : qty
        })
    }

    const addToFavorite=()=>{
        firedatabase().ref('favorite/'+item.name).set({...item,
            ...itemDescription
        }).then(
          Alert.alert("Information","Item added to Favourites",[{text:'OK',onPress:()=>{}}])
        )
    }

    return (
        <ScrollView style={{ height: '100%', width: '100%', backgroundColor: 'white', padding: 15 }}>
            <Image source={{ uri: item.image }} style={{ height: 300, width: '100%', resizeMode: 'contain', backgroundColor: '#ddd', borderRadius: 15 }} />


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                <Icon name="favorite-outline" size={24} style={{ marginHorizontal: 15 }} onPress={()=>{addToFavorite()}}/>
            </View>
            <Text>{item.label}</Text>

            <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <Icon name="remove" size={24} onPress={() => { removeQty() }} />
                <TextInput value={qty + ""} style={{ height: 30, marginHorizontal: 15, borderWidth: 2, borderColor: '#ddd', borderRadius: 5, fontSize: 18, padding: 0, paddingLeft: 12 }} />
                <Icon name="add" size={24} onPress={() => { addQty() }} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', position: 'absolute', right: 15 }}>{item.price}</Text>
            </View>

            <View>
                <View style={{ flexDirection: 'row',marginVertical:15, justifyContent:"space-between"}}>
                    <Text style={{ color: 'black' }}>Product Details</Text>
                    <Icon style={{marginHorizontal:10}} name={prdDetVis?'expand-more':'chevron-right'} size={24} color={'black'} onPress={()=>{setprdDetVis(pr=>!pr)}}/>
                </View>
                <View>
                    
                    {
                    prdDetVis &&
                    (
                    itemDescription ? 
                    <Text>{itemDescription.Description}</Text>:<Text>No description</Text>
                    )
                    }
                    
                </View>

                <View style={{ flexDirection: 'row',marginVertical:15, justifyContent:"space-between"}}>
                    <Text style={{ color: 'black' }}>Review</Text>
                    

                   {itemDescription ?
                    <Text style={{marginHorizontal:10}}>
                     {itemDescription.Review}</Text> : 
                     <Text style={{marginHorizontal:10}}>
                    No Review</Text>
                    }   
                </View>
                  
            </View>
            
            <CustButton text={"Add to Basket"} color="white" onPress={()=>{addToBasket()}}/>

        </ScrollView>)


}