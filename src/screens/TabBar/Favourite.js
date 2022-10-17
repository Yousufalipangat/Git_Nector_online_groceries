
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import RazorpayCheckout from "react-native-razorpay";

import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Text,

} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { CartItem, CustButton } from "../../components/Components";

export const Favourite = () => {
    const [itemsList, setitemList] = useState([]);
   
    const navigation = useNavigation();

    useEffect(() => {

        fetchData()


        return () => { fetchData }
    }, [])

   
    const addQty = ({ name, qty }) => {
        database().ref('favorite/' + name).update({ qty: qty + 1 })
    }

    const removeQty = ({ name, qty }) => {
        if (qty > 1) {
            database().ref('favorite/' + name).update({ qty: qty - 1 })
        }
    }

    const removeItem = ({ name }) => {

        database().ref('favorite/' + name).remove();
    }


    const fetchData = async () => {
        const onValueChange = database()
            .ref('favorite')
            .on('value', snapshot => {
                setitemList([])


                setitemList(Object.values(snapshot.val()))


            })




        // Stop listening for updates when no longer required
        return () => database().ref('favorite').off('value', onValueChange);
    }

    

    return (
        <View style={style.container} contentContainerStyle={style.contentContainer}>
            <View style={style.searchbar}>

                <Icon name="search" size={23} />
                <TextInput placeholder="search" />

            </View>

            <View style={{ verticalMargin: 10, height: "85%" }}>

                {itemsList.length > 0 &&
                    <FlatList
                        style={{ height: 120 }}
                        data={itemsList}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => CartItem(item, navigation, addQty, removeQty, removeItem)}
                        contentContainerStyle={{ justifyContent: 'flex-end' }}
                    />


                }
            </View>
           

        </View>
    )

}

const style = StyleSheet.create(
    {
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            padding: 20,


        },

        searchbar: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
            marginBottom: 20,
            paddingHorizontal: 15,
            borderRadius: 15
        }
    }
)