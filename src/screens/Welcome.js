import React from "react";
import {
    View,
    Text,
    ImageBackground,
    Button,


} from 'react-native'
import { ceil } from "react-native-reanimated";

import{ CreateButton, CreateText} from '../components/Components'

export default function Welcome({navigation}){
    
    return (
        <View style={{width:'100%',height:'100%'}}>
            <ImageBackground 
            
            resizeMode="cover"
            style={{width:'100%',height:'100%',justifyContent:"flex-end",alignItems:"center"}}
            source={require('../assets/images/pexels-kindel-media-6868797.jpg')}>
            <View style={{width:'100%',height:300,alignItems:'center',paddingBottom:50,backgroundColor:'rgba(0,0,0,.5)'}}>
            <Text style={{fontWeight:'bold',fontSize:40,marginHorizontal:20,color:'white'}}>Welcome</Text>
            <Text style={{fontWeight:'bold',fontSize:40,marginHorizontal:20,color:'white'}}>to our store</Text>
            <Text style={{fontWeight:'bold',fontSize:15,marginHorizontal:20,color:'grey',marginVertical:10}}>Get your groceries in as fast as one hour</Text>
            
            <CreateButton text='Get Started' action={()=>{navigation.navigate('SignUpOptions')}}/>
   
            </View>
            </ImageBackground>

            
        </View>
    )


}