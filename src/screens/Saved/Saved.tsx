import React, { useState } from 'react';
import { View, Text, StyleSheet,  Dimensions, TouchableOpacity, Alert  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Edit2, Element4, Notification, SearchNormal1 } from 'iconsax-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import styles from './styles';
import { TabView, SceneMap } from 'react-native-tab-view';
import List from './LikedList';
import Footer from '../../components/Footer/Footer';
import type { Navigation } from '../../components/Footer/Footer';
import LikedList from './LikedList';
import SavedList from './SavedList';
import { useFonts } from 'expo-font';
import { setData } from '../../../helper/storageHelper';
// import GridListExample from './List';
// Screen for Recipe Saved

const addLike = async () => { 
  await setData('saved', ['0Ep6eDl8U5svpyZQ0N7J', '0LQNSK7kzHUJSCrgHidc', '0W3O4apfINcN42zhU5LO']); 
  console.log('add saved'); 
}

const RecipeLikedScreen = () => (
  <View style={[{flex: 1}, {backgroundColor: '#FFFFFF'}]}>
    <LikedList/>
    <TouchableOpacity style={[
      {
        width : 100,
        height: 100,
        backgroundColor: '#333',
      } 

    ]} onPress={addLike}></TouchableOpacity>
  </View>
  
);

const RecipeSavedScreen= () => (
  <View style={[{flex: 1}, {backgroundColor: '#FFFFFF'}]}>
    {/* <GridListExample /> */}
    <SavedList/>
  </View>
);

// Create Tab Navigator
const Tab = createMaterialTopTabNavigator();
const Saved:React.FC<Navigation> = ({navigation,address}) => {
  return (
    <View style={[{flex: 1}]}>  
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#DA7E4F', // Màu chữ tab đang được chọn
          tabBarInactiveTintColor: '#000000', // Màu chữ tab không được chọn
          tabBarStyle: { backgroundColor: '#fff' }, // Màu nền của tab
          tabBarIndicatorStyle: { backgroundColor: '#DA7E4F' }, // Màu của thanh chỉ báo (indicator)
        }}
        >
        <Tab.Screen name="Recipe Saved" component={RecipeSavedScreen} />
        <Tab.Screen name="Recipe Liked" component={RecipeLikedScreen} />
      </Tab.Navigator>
      <Footer navigation={navigation} address="Saved"/>
    </View>
  );
}


export default Saved;
