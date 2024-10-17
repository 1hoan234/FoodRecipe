import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng icon mũi tên
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import Footer from '../../components/Footer/Footer';
import styles from './styles';
import type { Navigation } from '../../components/Footer/Footer';

const arrowImage = require('../../../assets/images/arrow.jpg')


const Display:React.FC<Navigation>  = ({ navigation, address }) => {
  const [selectedDisplay, setSelectedDisplay] = useState('Default'); // State mặc định là English

  const handleDisplayChange = (display: React.SetStateAction<string>) => {
    setSelectedDisplay(display);
  };

  return (
    <View style={styles.container}>
      {/* Header với nút quay lại và tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImage} style={{
            width: 40,
            height: 40,
            marginTop: 33,
            paddingLeft: 14,
            marginBottom: 20,
            marginLeft: 0,
          }}></Image>
        </TouchableOpacity>
        <Text style={[styles.title,{
          marginLeft: 120,
        }]}>Display</Text>
      </View>

      {/* Các nút radio */}
      
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => handleDisplayChange('Default')}
      >
        <Text style={styles.radioLabel}>Default</Text>
        <View style={styles.radioCircle}>
          {selectedDisplay === 'Default' && <View style={styles.radioSelected} />}
        </View>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => handleDisplayChange('Light')}
      >
        <Text style={styles.radioLabel}>Light</Text>
        <View style={styles.radioCircle}>
          {selectedDisplay === 'Light' && <View style={styles.radioSelected} />}
        </View>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => handleDisplayChange('Dark')}
      >
        <Text style={styles.radioLabel}>Dark</Text>
        <View style={styles.radioCircle}>
          {selectedDisplay === 'Dark' && <View style={styles.radioSelected} />}
        </View>
        
      </TouchableOpacity>

      <Footer navigation={navigation} address="Setting"/>
    </View>
  );
};


export default Display;
