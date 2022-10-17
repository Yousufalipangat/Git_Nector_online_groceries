import React, { useContext, useState } from "react";

import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobelContext } from "../../AuthProvider";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";


export const DrawerContent = ({ navigation }) => {

    const [image, setimage] = useState('')
    const [upload, setupload] = useState(false);
    const [transferred, settransferred] = useState(0)

    const { user } = useContext(GlobelContext)
    const ItemGen = ({ name, screen }) => {

        return (
            <TouchableOpacity onPress={() => { navigation.navigate(screen) }}>
                <View style={{ flexDirection: 'row', padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 1, justifyContent: 'space-between' }}>
                    {/* <Icon name="" size={""}/> */}
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#444' }}>{name}</Text>
                    <Icon name="chevron-right" size={24} color='#444' />
                </View>
            </TouchableOpacity>
        )
    }

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets };
               // console.log(source);
                setimage(source.uri[0].uri);
            }
        });

        uploadImage()
    };
    const uploadImage = async () => {
        const uri  = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setupload(true);
        settransferred(0);
        const task = storage()
          .ref('images/'+filename)
          .putFile(uploadUri);
        // set progress state
        
        task.on('state_changed', snapshot => {
          settransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(transferred)
        });
        try {
          await task;
        } catch (e) {
          console.error(e);
        }


        setupload(false);
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setimage("");
      };

return (
    <ScrollView style={{ width: '100%', height: '100%' }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
            <TouchableOpacity onPress={() => { selectImage() }}>
                <Image
                    source={ image ? {uri:image}:{ uri: "https://png2.cleanpng.com/sh/e907b429768257105c52e13307643d36/L0KzQYm3U8MyN5pBfZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgV0baMye95ycD3kgsW0lgNmel46edRvMUPncoa9UsRmPF82T6k6N0S1QoK8UsI1P2I9Uas8NUK8PsH1h5==/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png" }} style={{ backgroundColor: '#fff', width: 100, height: 100, borderRadius: 50 }} />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 20 }}>
                <Text >
                    Hi
                </Text>
                <Text>
                    {user.email}
                </Text>
            </View>

        </View>
            <Text style={{marginHorizontal:10}} onPress={()=>{setimage("")}} >Remove image</Text>
        <ItemGen name="Orders" screen="DrawerDemo" />
        <ItemGen name="My Details" screen="DrawerDemo" />
        <ItemGen name="Delivery Address" screen="DrawerDemo" />
        <ItemGen name="Payement Methods" screen="DrawerDemo" />
        <ItemGen name="Promo code" screen="DrawerDemo" />
        <ItemGen name="Notifications" screen="DrawerDemo" />
        <ItemGen name="Help" screen="DrawerDemo" />
        <ItemGen name="About" screen="DrawerDemo" />



    </ScrollView>
)
}