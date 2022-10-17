import React, { useContext } from "react";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/screens/Home";
import Icon from "react-native-vector-icons/MaterialIcons";
import AwsmIcon from "react-native-vector-icons/FontAwesome5";
import { Button, Text, View } from "react-native";
import { GlobelContext } from "./src/AuthProvider";


import { Shop } from "./src/screens/TabBar/Shop";
import { Explore } from "./src/screens/TabBar/Explore";
import { Cart } from "./src/screens/TabBar/Cart";
import { Favourite } from "./src/screens/TabBar/Favourite";
import { Account } from "./src/screens/TabBar/Account";
import { constants } from "./src/utils/Utils";
import { ItemListScreen } from "./src/screens/ItemListScreen";
import { ItemDescriptionScreen } from "./src/screens/ItemDescriptionScreen";
import { DrawerDemo } from "./src/screens/Drawer/DrawerDemo";
import { DrawerContent } from "./src/screens/Drawer/DrawerContent";


const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Appstack = () => {
  const { logout } = useContext(GlobelContext);


  const DrawerList = () => {
    return (
      <Drawer.Navigator
    
      drawerContent={(props)=><DrawerContent {...props}/>}
      >
        
        <Drawer.Screen
          name="Home"
          component={BottomBar}
          options={{
            headerShown: false
          }}
        />
         <Drawer.Screen
          name="Order"
          component={DrawerDemo}
          options={{
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="Deliver Address"
          component={DrawerDemo}
          options={{
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="Payement Methods"
          component={DrawerDemo}
          options={{
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="Promo Card"
          component={DrawerDemo}
          options={{
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={DrawerDemo}
          options={{
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="Help"
          component={DrawerDemo}
          options={{
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="About"
          component={DrawerDemo}
          options={{
            headerShown: false
          
          }}
        />
      </Drawer.Navigator>
    )
  }

  const BottomBar = ({navigation}) => {
    return (
      <BottomTab.Navigator
        style={{ marginHorizontal: 20 }}
        screenOptions={{

          tabBarStyle: { height: 80, padding: 5 },
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: constants.green,
          headerRight: () => (<Icon name="logout" size={30} style={{ marginHorizontal: 10 }} onPress={() => { logout() }} />),
          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              <Icon name="menu" style={{ marginHorizontal: 20 }} size={30} onPress={() => { navigation.openDrawer() }} />
              <AwsmIcon name="carrot" size={30} style={{ marginHorizontal: 20 }} color={'orange'} />
            </View>
          ),
          headerTitle: 'Nector',
          headerTitleAlign: 'center'
        }}
      >
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{

            tabBarIcon: ({ focused }) => focused ? <Icon name="store" size={30} color={constants.green} /> : <Icon name="store" size={30} />
          }}
        />
        <BottomTab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarIcon: ({ focused }) => focused ? <Icon name="explore" size={30} color={constants.green} /> : <Icon name="explore" size={25} />
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({ focused }) => focused ? <Icon name="shopping-cart" size={30} color={constants.green} /> : <Icon name="shopping-cart" size={25} />
          }}
        />
        <BottomTab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarIcon: ({ focused }) => focused ? <Icon name="favorite" size={30} color={constants.green} /> : <Icon name="favorite" size={25} />
          }}
        />
        <BottomTab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ focused }) => focused ? <Icon name="account-circle" size={30} color={constants.green} /> : <Icon name="account-circle" size={25} />
          }}
        />
      </BottomTab.Navigator>
    )
  }


  return (

    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen

        name="Drawer"
        component={DrawerList}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ItemListScreen"
        component={ItemListScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ItemDescriptionScreen"
        component={ItemDescriptionScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
export default Appstack;



