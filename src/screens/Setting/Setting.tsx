import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styles from './styles';
import Footer from '../../components/Footer/Footer';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { useFonts } from 'expo-font';


const languageIcon = require('../../../assets/images/SettingIcons/im1.jpg');
const msIcon = require('../../../assets/images/SettingIcons/im2.jpg');
const displayIcon = require('../../../assets/images/SettingIcons/im3.jpg');
const feedbackIcon = require('../../../assets/images/SettingIcons/im4.jpg');
const reportIcon = require('../../../assets/images/SettingIcons/im5.jpg');
const askedIcon = require('../../../assets/images/SettingIcons/im6.jpg');
const reviewIcon = require('../../../assets/images/SettingIcons/im7.jpg');
const aboutIcon = require('../../../assets/images/SettingIcons/im8.jpg');
const legalIcon = require('../../../assets/images/SettingIcons/im9.jpg');
import type { Navigation } from '../../components/Footer/Footer';

const Setting: React.FC<Navigation> = ({navigation, address}) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <ScrollView>
        {/* System Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System</Text>
          <View style={styles.content}>
            <Image source={languageIcon} style={styles.image} />
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('Language',{language:'Vietnamese'})}}>
              <Text style={styles.itemText}>Language</Text>
            </TouchableOpacity >
          </View>
          <View style={styles.content}>
            <Image source={msIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('MSystem')}}>
              <Text style={styles.itemText}>Measurement System</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Image source={displayIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('Display')}}>
              <Text style={styles.itemText}>Display</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.content}>
            <Image source={feedbackIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Feedback</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Image source={reportIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Report Bug</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Image source={askedIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Frequently Asked Questions</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <View style = {styles.content}>
            <Image source={reviewIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>App Review</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <Image source={aboutIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('AboutUs')}}>
              <Text style={styles.itemText}>About Us</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Image source={legalIcon} style={styles.image}></Image>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Legal Information</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
      <Footer navigation={navigation} address="Setting" />
    </View>
  );
};

// Dummy Home Screen


export default Setting;
