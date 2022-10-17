import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Button,
    Alert,

} from 'react-native'
import Icon from "react-native-vector-icons/AntDesign"

import { CreateText } from "../components/Components"
import { auth } from "../utils/FirebaseConfig"
import { constants } from "../utils/Utils"

import SignUp from "./SignUp"

import { currentUser, logout, signInWithPhoneNumber, confirmCode } from '../utils/Authenticate'


export default function SignUpOptions() {
    const navigation = useNavigation();

    const [confirm, setConfirm] = useState(null);
    const [countryCode, setcountryCode] = useState();
    const [phoneNumber, setphoneNumber] = useState();

    const [code, setcode] = useState();
    const [user, setuser] = useState(null);

    useEffect(() => {
        checkCurrentUser();

        const unsubscriber = auth().onAuthStateChanged((user) => {
            setuser(user)
        })

        return () => { unsubscriber };

    }, [])

    const checkCurrentUser = () => {
        let user = currentUser();
        setuser(user);
    }

    const performLogout = () => {
        logout;
    }


    const performSignInWithPhoneNumber = async () => {
        const confirmation = signInWithPhoneNumber(countryCode, phoneNumber)
       // console.log(JSON.stringify(confirmation));
        setConfirm(confirmation);
    }

    const checkOTP = async () => {
        console.log(JSON.stringify(confirm) + '---'+typeof(confirm))

        try{
        await confirm.confirm(code);
        alert('signed in')
        AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        console.log(error,'Invalid code.');
    }
    }

    
    
    console.log(user)

    if (user != null && user != 'null' && user != undefined) {
        return <SignUp logout={performLogout()} />

    }
    else {

        if (!confirm) {

            return (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ width: '100%', height: "100%" }}>

                    <View style={{ width: '100%', height: 350 }}>
                        <Image style={{ resizeMode: 'cover', width: '100%', height: '100%' }} source={require('../assets/images/groceriesBackground.jpg')} />
                    </View>

                    <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>

                        <Text style={{ fontSize: 30, fontWeight: '700', color: 'black' }}>Get your groceries with nector</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TextInput keyboardType="numbers-and-punctuation" placeholder="+91" style={{
                                borderBottomColor: "#ccc", borderBottomWidth: 1, width: '20%', height: 55, fontSize: 20
                            }}
                                onChangeText={(text) => { setcountryCode(text) }}
                            />
                            <TextInput keyboardType="numeric" placeholder="Phone Number" style={{
                                borderBottomColor: "#ccc", borderBottomWidth: 1, width: '70%', fontSize: 20, height: 55
                            }}
                                onChangeText={(text) => { setphoneNumber(text) }}
                            />
                            <Icon name="rightsquare" color={constants.green} size={37} onPress={() => { performSignInWithPhoneNumber() }} />
                        </View>

                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <CreateText text={'Or connect with social media'} color='grey' size={13} />
                        </View>

                        <TouchableOpacity style={{ backgroundColor: constants.blue, width: '100%', height: 55, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="google" size={25} color='white' style={{ marginHorizontal: 10 }} />
                            <CreateText text={'Continue with Google'} color='white' fontSize={15} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: constants.darkblue, width: '100%', height: 55, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                            <Icon name="facebook-square" size={25} color='white' style={{ marginHorizontal: 10 }} />
                            <CreateText text={'Continue with Facebook'} color='white' fontSize={15} />
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            )
        }

        return (
            <View style={{ justifyContent:"center",alignItems:'center'}}>
                <TextInput keyboardType="default" placeholder="code" style={{
                    borderBottomColor: "#ccc", borderBottomWidth: 1, width: '20%', height: 55, fontSize: 20
                }}
                    onChangeText={(text) => { setcode(text) }}
                />
                <Button title="check" onPress={() => { checkOTP() }} />
            </View>
        )

    }
}