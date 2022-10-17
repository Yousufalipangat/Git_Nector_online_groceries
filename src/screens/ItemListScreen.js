import firebase from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Button,

} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { ItemCard } from "../components/Components";

export const ItemListScreen = ({ route }) => {
    const [itemsList, setitemList] = useState([]);
    const [category, setcategory] = useState(route.params.category)
    const navigation= useNavigation();
    useEffect(() => {
        fetchData()

        return () => { fetchData }
    }, [])

   


    const fetchData = async () => {
        try {

            await firebase().collection(category).get()
                .then(
                    setitemList([])
                )
                .then((querysnapshot) => {
                    querysnapshot.forEach((docsnapshot) => {
                        setitemList((predata) => [...predata, docsnapshot.data()])

                    })
                })
        } catch (e) {
            console.log(JSON.stringify(e))
        }
    }

    return (
        <View style={style.container} contentContainerStyle={style.contentContainer}>
            <View style={style.searchbar}>

                <Icon name="search" size={23} />
                <TextInput placeholder="search" />

            </View>
            <FlatList
                numColumns={2}
                data={itemsList}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => ItemCard(item,navigation)}
                contentContainerStyle={{ justifyContent: 'flex-end' }}
                style={{}}
            />
           
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