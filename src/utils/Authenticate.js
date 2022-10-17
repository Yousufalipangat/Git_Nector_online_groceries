
import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth } from "./FirebaseConfig"

//return current user if any
const currentUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user')
        return user
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

//will logout
const logout = async () =>{
    auth().signOut();
    AsyncStorage.clear();
    
  }

  // return confirmation after sign in
 const signInWithPhoneNumber = async(countryCode,phoneNumber)=>{
    console.log(countryCode , phoneNumber)
    let confirmation;

    let promises = new Promise(async (resolve,reject)=>{
    confirmation = await auth().signInWithPhoneNumber("+918606884012")
    .then(
        resolve('resolved')
    ).catch((error)=>{
        reject(JSON.stringify(error))
    })
    })

    promises.then((result)=>{
        console.log
        return (confirmation)
    }
    ).catch((error)=>{
        console.log(error)
        return(confirmation)
    }
    )

    
    
}


const confirmCode = async ()=> {
    try {
        
        await confirm.confirm(code);
        alert('signed in')
        AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        console.log(error,'Invalid code.');
    }
}

export {currentUser,logout,signInWithPhoneNumber,confirmCode}