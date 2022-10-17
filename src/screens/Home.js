import React, { useContext } from "react";
import {
    View,
    Text,


} from 'react-native'
import { GlobelContext } from "../AuthProvider";


export default function Home(){

    const {user} = useContext(GlobelContext)

    return (
        <View>
            
           <Text>{JSON.stringify(user)}</Text>
            
        </View>
    )


}