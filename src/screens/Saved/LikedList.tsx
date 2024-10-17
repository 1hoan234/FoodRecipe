import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Footer from '../../components/Footer/Footer';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { useFonts } from 'expo-font';
import { getData, setData } from '../../../helper/storageHelper';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../database/firestore';
import styles from './styles';
// import styles from './style';

const deleteIcon = require('../../../assets/images/deleteIcon.jpg');

type DataItem = {
  id : string;
  title: string;
  image: string;
  servings_default: undefined;
  ingredient: object;
};


const numColumns = 2; // Số cột là 2
const { width } = Dimensions.get('window');
const itemWidth = width / numColumns - 20; // Tính chiều rộng của mỗi item (giảm 20px cho khoảng cách giữa các item)
const LikedList:React.FC = () => {
  const [data1, setData1 ] = useState<DataItem[]>([]);

  const getDataFromLocalStorage = async () => { 
    try { 
        const data = await getData('liked'); 
        console.log(data + " 1"); 
        if (data) { 
            const docPromises = data.map(async (value : string) => { 
                const docRef = doc(db, 'recipes', value); 
                const docSnap = await getDoc(docRef); 
                if (docSnap.exists()) { 
                    return { 
                        _id: docSnap.id, 
                        title: docSnap.get('title'), 
                        image: docSnap.get('image'), 
                        servings_default: docSnap.get('servings_default'), 
                        ingredients: docSnap.get('ingredients'), 
                    }; 
                } 
            }); 
  
            // Wait for all promises to resolve 
            const listData = await Promise.all(docPromises); 
            setData1(listData);
            console.log(data1);
            // Filter out undefined values in case some documents don't exist 
            setData('likedList',listData.filter((item: string) => item !== undefined)); 
        } 
    } 
    catch (error) { 
        console.log('Error reading data:', error); 
    } 
  };
    useEffect(() => {
      getDataFromLocalStorage();
    }, []);
    // getDataFromLocalStorage();
    const deleteItem = () => {

    };
    const renderItem = ({ item }: { item: DataItem } ) => (
        <TouchableOpacity onPress={() => {}} style={styles.item}>
          <View style={styles.item}>
            <Image source={{uri : item.image}} style={styles.image} />
            <View style={[{
                width: itemWidth,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',
                // -
            }]}>
              <Text style={styles.text}>{item.title}</Text>
              <TouchableOpacity onPress={() => deleteItem()}>
                <Image source={deleteIcon}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
  return (
    <View>
      <FlatList
        data={data1}
        numColumns={numColumns} // Đặt số cột là 2
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={styles.container}
    />
    </View>
  );
};

export default LikedList;
