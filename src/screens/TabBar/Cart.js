
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import RazorpayCheckout from "react-native-razorpay";

import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Text,
    Modal,
    Button,
    Image,

} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { CartItem, CustButton } from "../../components/Components";
import BottomSheet from "react-native-simple-bottom-sheet";

export const Cart = () => {
    const [itemsList, setitemList] = useState([]);
    const panelRef = useRef(null);
    const [total, settotal] = useState(0);
    const navigation = useNavigation();
    const [isVisible, setisVisisble] = useState(false);

    useEffect(() => {

        fetchData()


        return () => { fetchData }
    }, [])

    useEffect(() => {
        findTotalCost()

        return () => { true }
    }, [itemsList])

    const addQty = ({ name, qty }) => {
        database().ref('cart/' + name).update({ qty: qty + 1 })
    }

    const removeQty = ({ name, qty }) => {
        if (qty > 1) {
            database().ref('cart/' + name).update({ qty: qty - 1 })
        }
    }

    const removeItem = ({ name }) => {

        database().ref('cart/' + name).remove();
    }


    const fetchData = async () => {
        const onValueChange = database()
            .ref('cart')
            .on('value', snapshot => {
                setitemList([])


                setitemList(Object.values(snapshot.val()))


            })




        // Stop listening for updates when no longer required
        return () => database().ref('cart').off('value', onValueChange);
    }

    const findTotalCost = () => {

        let totals = 0
        itemsList.map(item => {
            totals = totals + (parseFloat((item.price).slice(1)) * item.qty)

        })

        settotal(totals)
    }



    const payout = () => {

        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_BClaQ9Gglu7ztO',
            amount: total * 100,
            name: 'Nector Corp',
            // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
            prefill: {
                email: 'gaurav.kumar@example.com',
                contact: '9191919191',
                name: 'Gaurav Kumar'
            },
            theme: { color: '#53a20e' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
           setisVisisble(true)

        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    return (
        <View style={style.container} contentContainerStyle={style.contentContainer}>
            <View style={style.searchbar}>

                <Icon name="search" size={23} />
                <TextInput placeholder="search" />

            </View>

            <Modal
                animationType={"fade"}
                transparent={false}
                visible={isVisible}
                onRequestClose={() => { console.log("Modal has been closed.") }}>
                <View style={style.modal}>
                    <Image style={{width:200,height:200}} source={{uri:'https://png2.cleanpng.com/sh/e94b3c0331d49a8a1f2a04196b11b72f/L0KzQYm3VME5N6JwfZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TfNpbZRwRd9qcnuwc73wkL1ieqUyfARuZX6whLrqi702aZU8TqI7MXPpcrW4U742PWcATqMDNkG4QoW3VsQzQGo9TaIELoDxd1==/kisspng-computer-icons-check-mark-clip-art-green-tick-5ad76021cfbd13.5569618615240642898509.png'}}/>

                    <Text>Your Order is placed</Text>

                    <CustButton text={"Continue shopping"} color="white" onPress={() => {
                        setisVisisble(false)
                    }} />
                    
                </View>
            </Modal>

            

            <View style={{ verticalMargin: 10, height: "65%" }}>

                {itemsList.length > 0 &&
                    <FlatList
                        style={{ height: 120 }}
                        data={itemsList}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => CartItem(item, navigation, addQty, removeQty, removeItem)}
                        contentContainerStyle={{ justifyContent: 'flex-end' }}
                    />


                }
            </View>
            <View style={{ alignItems: 'center', height: 100, justifyContent: 'space-between' }}>

                <CustButton text={'Go to checkout'} color="white" onPress={() => { panelRef.current.togglePanel() }} />

                <Text style={{ color: 'black', fontWeight: 'bold' }}>Total Amount : {Math.round(total * 100) / 100}</Text>
            </View>

            <BottomSheet ref={ref => panelRef.current = ref}>
                <Text style={{ paddingVertical: 30, color: 'black', fontSize: 18 }}>
                    Total Amount is : {Math.round(total * 100) / 100}
                </Text>
                <CustButton text={'procees to pay'} color='white' onPress={() => { payout() }} />
            </BottomSheet>

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
        },

        modal:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#00BCD",
            height: "80%",
            width: '80%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
            marginTop: 80,
            marginLeft: 40,


        }
    }
)