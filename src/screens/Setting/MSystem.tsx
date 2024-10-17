import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng icon mũi tên
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import Footer from '../../components/Footer/Footer';
import styles from './styles';
import type { Navigation } from '../../components/Footer/Footer';

const arrowImage = require('../../../assets/images/arrow.jpg')


const MSystem:React.FC<Navigation>  = ({ navigation, address }) => {
  const [selectedMSystem, setSelectedMSystem] = useState('Metric'); // State mặc định là English

  const handleMSystemChange = (mode: React.SetStateAction<string>) => {
    setSelectedMSystem(mode);
  };

  return (
    <View style={styles.container}>
      {/* Header với nút quay lại và tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source = {arrowImage} style = {[
            {
              width: 40,
              height: 40,
              marginTop: 33,
              paddingLeft: 14,
              marginBottom: 20,
              marginLeft: 0,
            }
          ]}></Image>
        
        </TouchableOpacity>
        <Text style={[
          styles.title,
          {
            marginLeft: 45,
          }
        ]}>Measurement System</Text>
      </View>
      {/* Các nút radio */}
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => handleMSystemChange('Metric')}
      >
        <Text style={styles.radioLabel}>Metric</Text>
        <View style={styles.radioCircle}>
          {selectedMSystem === 'Metric' && <View style={styles.radioSelected} />}
        </View>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => handleMSystemChange('Imperial')}
      >
        <Text style={styles.radioLabel}>Imperial</Text>
        <View style={styles.radioCircle}>
          {selectedMSystem === 'Imperial' && <View style={styles.radioSelected} />}
        </View>
        
      </TouchableOpacity>
      <Footer navigation={navigation} address="Setting"/>
    </View>
  );
};


export default MSystem;
