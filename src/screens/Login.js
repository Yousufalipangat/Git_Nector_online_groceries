import React, { useContext, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,


} from 'react-native'
import  Icon from "react-native-vector-icons/FontAwesome5";
import { GlobelContext } from "../AuthProvider";
import { CustButton, InputField } from "../components/Components";



export default function Login({navigation}){
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("");


    const {login} = useContext(GlobelContext);

    return (
        <ScrollView contentContainerStyle={{padding:25}} style={style.container}>

        <View style={{width:'100%',alignItems:'center'}}>
            <Icon name="carrot" size={55} style={{marginVertical:30}} color='orange'/>
        </View>

        <Text style={{fontWeight:'bold',color:'black',fontSize:23,marginVertical:15}}>Login</Text>
        <Text>Enter your credentials to continue </Text>
        
        
        
        <InputField maxLength = {30} label={'Email'} placeholder="Enter your email" onChangeText ={(text)=>{setemail(text)} } />
        <InputField maxLength = {10} secureTextEntry={true} label={'Password'} placeholder="Enter your password"  onChangeText ={(text)=>{setpassword(text)} }/>


        <View style={{width:'100%',alignItems:'center'}}>
        <CustButton color={'white'} text={'Login'} onPress={()=>{login(email,password)}}/>
        
       </View>

        

        </ScrollView>
    )


    
}
const style = StyleSheet.create(
    {
        container: {
            height:'100%',
            width:'100%',
            backgroundColor:'white',
        },

        
    }
)