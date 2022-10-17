import React from "react";

import {
    View,
    Text,
    StyleSheet,

} from 'react-native'

 export const Account = ()=>{
    return(
        <View style={style.container}>
            <Text>
                Account
            </Text>
        </View>
    )

}

const style = StyleSheet.create(
    {
        container : {
            width:'100%',
            height:'100%',
            justifyContent:'center',
            alignItems:'center'


        }
    }
)