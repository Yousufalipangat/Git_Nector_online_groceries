

import React, { useContext, useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import Authstack from "./Authstack";

import AuthProvider, { GlobelContext } from "./AuthProvider";
import { StackSelector } from "./StackSelector";


const Route = () => {

    return (
        
        <AuthProvider>
            <NavigationContainer>
                <StackSelector/>
            </NavigationContainer>
        </AuthProvider>

    )
}

export default Route;