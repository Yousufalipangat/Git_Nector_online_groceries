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
import { constants } from "../utils/Utils";



export default function SignUp({navigation}){
    const [username,setusername] = useState();
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("");

    const {register} = useContext(GlobelContext)

    return (
        <ScrollView contentContainerStyle={{padding:25}} style={style.container}>

        <View style={{width:'100%',alignItems:'center'}}>
            <Icon name="carrot" size={55} style={{marginVertical:30}} color='orange'/>
        </View>

        <Text style={{fontWeight:'bold',color:'black',fontSize:23,marginVertical:15}}>Sign Up</Text>
        <Text>Enter your credentials to continue </Text>
        
        
        <InputField maxLength = {30}label={'Username'} placeholder="Enter your name" onChangeText ={(text)=>{setusername(text)} }/>
        <InputField maxLength = {30} label={'Email'} placeholder="Enter your email"  onChangeText ={(text)=>{setemail(text)}}/>
        <InputField maxLength = {10} secureTextEntry={true} label={'Password'} placeholder="Enter your password" onChangeText ={(text)=>{setpassword(text)} }/>


        <Text style={{marginBottom:40,marginTop:15}}>By continuing you agree to our
        <Text style={{color:constants.green}}>Terms of Service</Text> and <Text style={{color:constants.green}}> Privacy Policy.</Text>
        </Text>

        <View style={{width:'100%',alignItems:'center'}}>
        <CustButton color={'white'} text={'Sign Up'} onPress={()=>{register(email,password)}}/>
        
        <Text style={{color:'black',fontWeight:'bold',marginVertical:20}}>Already have an account ? 
        <Text style={{color:constants.green}} onPress={()=>{
            navigation.navigate('Login')}
        }> Login</Text>
        </Text>
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