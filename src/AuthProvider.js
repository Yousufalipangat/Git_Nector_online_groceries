

import React, { useState } from "react";
import { auth } from './utils/FirebaseConfig'
import { createContext } from "react";

export const GlobelContext = createContext()



const AuthProvider = ({ children }) => {

    const [user, setuser] = useState()

    const login = async (email,password) => {
        try {
            console.log('asss')
            await auth().signInWithEmailAndPassword(email,password)
                .catch((e) => {
                    console.log(e)
                    let error = JSON.stringify(e)
                    alert(error)

                })
        } catch (e) {
            console.log(e)
        }

    }

    const register = async (email, password) => {

        try {
            await auth().createUserWithEmailAndPassword(email, password)
                .catch((e) => {
                    console.log(e)
                    let error = JSON.stringify(e)
                    alert(error)

                })
        } catch (e) {
            console.log(e)
        }

    }

    const logout = async () => {
        try {
            await auth().signOut()
                .catch((e) => {
                    console.log(e)
                    let error = JSON.stringify(e)
                    alert(error)
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <GlobelContext.Provider value={{
            user,
            setuser,
            login,
            register,
            logout
        }}>
            {children}
        </GlobelContext.Provider>
    )
}
export default AuthProvider;