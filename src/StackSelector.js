
import React, { useContext, useEffect, useState } from "react";
import Authstack from "./Authstack";
import Appstack from "../App";
import { GlobelContext } from "./AuthProvider";
import { auth } from "./utils/FirebaseConfig";

export const StackSelector = ()=>{

    const {user,setuser} = useContext(GlobelContext)
    const [isInitialize,setisInitialize] = useState(true)
    
    const onAuthStateChanged = (user)=>{
       
        setuser(user);
        if (isInitialize) setisInitialize(false);
     }

    useEffect(()=>{
        
        console.log(user)
        const subscriber =  auth().onAuthStateChanged(onAuthStateChanged);
       

       return ()=>{ console.log('unmounted') }; // unsubscribe on unmount
      
    }, []);
    

    if(isInitialize) return null;

 
    return(
        
      user ? <Appstack/> : <Authstack/>
    )

}