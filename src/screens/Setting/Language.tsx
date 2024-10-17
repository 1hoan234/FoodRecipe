import React, { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng icon mũi tên
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import Footer from '../../components/Footer/Footer';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getData, keyExists, removeData, storeData } from '../../../helper/storageHelper';
import type { Navigation } from '../../components/Footer/Footer';
import { storeData } from '../../helper/storageHelper';
const arrowImage = require('../../../assets/images/arrow.jpg')



const LanguageScreen:React.FC<Navigation>  = ({ navigation, address }) => {
  // const {language} = address.params;
   // State mặc định là English
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  // useEffect(() => {
  //   const getLanguage = async () => {
  //     try {
  //       // Lấy giá trị từ AsyncStorage
  //       const value = await AsyncStorage.getItem('language');
  //       if (value !== null) {
  //         console.log(value);
         
  //         // Nếu giá trị tồn tại, cập nhật state
  //         setSelectedLanguage(value);
  //         console.log('running '+ selectedLanguage);
  //       }
  //     } catch (e) {
  //       // Xử lý lỗi nếu có
  //       console.error('Failed to load data from AsyncStorage', e);
  //     }
  //   };

  //   // Gọi hàm để lấy dữ liệu
  //   getLanguage();

  // }, []); 
  // useEffect(() => {
  //   console.log('Selected Language has been updated to:', typeof(selectedLanguage), selectedLanguage);
  //   // handleLanguageChange(selectedLanguage);
  // }, [selectedLanguage]);  // This useEffect will run whenever selectedLanguage changes

  const handleLanguageChange = (language: React.SetStateAction<string>) => {
    setSelectedLanguage(language);
    storeData('language', language);
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
            }
          ]}></Image>
        
        </TouchableOpacity>
        <Text style={[
          styles.title,
          {
            marginLeft: 100,
          }
        ]}>Language</Text>
      </View>

      {/* Các nút radio */}
     
      <TouchableOpacity
        style={[styles.radioContainer]}
        onPress={() => handleLanguageChange('English')}
      >
        <Text style={styles.radioLabel}>English</Text>
        <View style={[styles.radioCircle,
          {}
        ]}>
          {selectedLanguage === 'English' && <View style={styles.radioSelected} />}
        </View>
        
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.radioContainer]}
        onPress={() => handleLanguageChange('Vietnamese')}
      >
        <Text style={styles.radioLabel}>Vietnamese</Text>
        <View style={styles.radioCircle}>
          {selectedLanguage === 'Vietnamese' && <View style={styles.radioSelected} />}
        </View>
        
      </TouchableOpacity>
      <Footer navigation={navigation} address="Setting"/>
    </View>
  );
};

export default LanguageScreen;
