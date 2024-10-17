import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import styles from './styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import Intro from '../Intro/Intro';
import Footer from '../../components/Footer/Footer';
import type { Navigation } from '../../components/Footer/Footer';

const arrowImage = require('../../../assets/images/arrow.jpg')
const introImage = require('../../../assets/images/intro.jpg')


const AboutUs:React.FC<Navigation>  = ({ navigation, address }) => {
    return (
      <View style ={[styles.container,{
        backgroundColor:'#FFF9E5',
      }]}>
        <View style={[styles.header,{
            backgroundColor: '#FFF9E5',
        }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source = {arrowImage} style = {[
              {
                width: 40,
                height: 40,
                marginTop: 33,
                paddingLeft: 14,
                marginBottom: 20,
              }]}>
            </Image>
          </TouchableOpacity>
          <Text style={[
            styles.title,
            {
              marginLeft: 80,
            }]}> Kitchen Stories </Text>
        </View>

        <ScrollView>
          <View style={styles.viewIntro}>
            <Text style={styles.textIntro}>Introduction</Text>
          </View>

          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Kitchen Stories is a video-based multimedia cooking platform, available as an app. 
                Users get free recipes for every occasion, HD video tutorials, and inspirational articles</Text>
          </View>
          <View style={[styles.section,{
            paddingLeft: 0,
          }]}>
            <Image source={introImage} style={{
                width: '100%' ,
                height: 208,
                marginBottom: 0,
            }}></Image>
            <View style={styles.viewIntro}>
              <Text style={styles.textIntro}> Our mission</Text>
            </View>

            <View style={styles.viewDetail}> 
              <Text style={styles.textDetail}>
                Our mission is to inspire, support and delight aspiring home cooks in their everyday cooking,
                making them feel comfortable in the kitchen.
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.viewIntro}>
              <Text style={styles.textIntro}>Statistical</Text>
            </View>
            <View style={[{
                flexDirection: 'row',
                alignContent: 'space-between',
                justifyContent: 'space-between',
            }]}>
              <View style={[styles.viewInfor,
              {
                marginHorizontal: 15,
              }]}>
                <Text style={styles.textInfor}> Download </Text>
                <Text style ={styles.textInfor}> 2.2M</Text>
              </View>

              <View style={[styles.viewInfor,
              {
                marginHorizontal: 20,
               
              }]}>
                <Text style={styles.textInfor}>Rate</Text>
                <Text style={styles.textInfor}>4.6/5</Text>
              </View>

            </View>
          </View>
        </ScrollView>
        {/* <Footer navigation={navigation} address="Setting" /> */}
        <View style={[styles.section,{
            width: '100%',
            height: 50,
        }]}>
          {/* <View style={styles.sectionTitle}></View> */}
        </View>
      </View>
    );
}



export default AboutUs;
