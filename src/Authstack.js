import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";

const Stack = createStackNavigator();

const Authstack = ()=>{

return(

  <Stack.Navigator initialRouteName="SignUp">
    <Stack.Screen
    name="SignUp"
    component={SignUp}
    options={{headerShown:false}}
    />

    <Stack.Screen
    name="Login"
    component={Login}
    options={{headerShown:false}}
    />

  </Stack.Navigator>
  

)
}
export default Authstack;