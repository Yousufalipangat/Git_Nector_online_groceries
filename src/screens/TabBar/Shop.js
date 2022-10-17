import firebase from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
    Button,
    TextInput,

} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { ItemCard } from "../../components/Components";
import { constants } from "../../utils/Utils";

export const Shop = () => {
    const [exclusiveOffer, setexclusiveOffer] = useState([]);
    const [bestSell, setbestSell] = useState([]);
    const [bestOffer, setbestOffer] = useState([]);

    const navigation = useNavigation();
    useEffect(() => {

        let cancel = false;
        //  fetchData('exclusiveOffer',cancel);
        //  fetchData('bestSell',cancel);
        const fetchData = async (collection) => {
            try {

                await firebase().collection(collection).get()
                    .then((querysnapshot) => {

                        if (cancel) return;
                        switch (collection) {
                            case 'bestOffer':
                                setbestOffer([])
                                break;
                            case 'exclusiveOffer':
                                setexclusiveOffer([])
                                break;
                            case 'bestSell':
                                setbestSell([])
                                break;

                        }

                        querysnapshot.forEach((docsnapshot) => {
                            switch (collection) {
                                case 'bestOffer':
                                    setbestOffer((data) => [...data, docsnapshot.data()])
                                    break;
                                case 'exclusiveOffer':
                                    setexclusiveOffer((data) => [...data, docsnapshot.data()])
                                    break;
                                case 'bestSell':
                                    setbestSell((data) => [...data, docsnapshot.data()])
                                    break;

                            }
                        })
                    })
            } catch (e) {
                console.log(JSON.stringify(e))
            }}

            fetchData('exclusiveOffer');
            fetchData('bestOffer');
            fetchData('bestSell');

            return () => { cancel = true}

        }, [])





    return (
        <ScrollView style={style.container} contentContainerStyle={style.contentContainer}>
            <View style={style.searchbar}>

                <Icon name="search" size={23} />
                <TextInput placeholder="search" />

            </View>

            <View style={style.banner} >
                <Image style={{ width: '100%', height: '100%', padding: 30 }} source={{ uri: 'https://images.rawpixel.com/image_700/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg3M2JhdGNoNC1hdW0tMjUuanBn.jpg' }} />
            </View>

            {/* <Button title="sss" onPress={()=>{navigation.openDrawer()}}/> */}

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Exclusive Offer</Text>
                    <Text style={{ color: constants.green }}>See all</Text>
                </View>

                <FlatList
                    horizontal={true}
                    data={exclusiveOffer}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => ItemCard(item,navigation)}
                    contentContainerStyle={{ justifyContent: 'flex-end' }}
                    style={{ flexGrow: 0 }}
                />

            </View>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Daily Offer</Text>
                    <Text style={{ color: constants.green }}>See all</Text>
                </View>

                <FlatList
                    horizontal={true}
                    data={bestOffer}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => ItemCard(item,navigation)}
                    contentContainerStyle={{ justifyContent: 'flex-end' }}
                    style={{ flexGrow: 0 }}
                />

            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Best Selling</Text>
                    <Text style={{ color: constants.green }}>See all</Text>
                </View>

                <FlatList
                    horizontal={true}
                    data={bestSell}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => ItemCard(item,navigation)}
                    contentContainerStyle={{ justifyContent: 'flex-end' }}
                    style={{ flexGrow: 0, marginBottom: 30 }}
                />

            </View>
        </ScrollView>
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
        contentContainer: {


        }
        ,
        banner: {
            backgroundColor: 'white',
            width: '100%',
            height: 100,
            // marginVertical:40



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