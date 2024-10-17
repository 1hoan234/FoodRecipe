import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions, Image, GestureResponderEvent, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Footer from '../../components/Footer/Footer';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import styles from './style';
import { faTrashCan} from '@fortawesome/free-solid-svg-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../database/firestore';
import { deleteData, getData, setData } from '../../../helper/storageHelper';

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
const SavedList:React.FC = () => {

  const [data1, setData1 ] = useState<DataItem[]>([]);
  const deleteItem = async (key : string, id : string, event?: NativeSyntheticEvent<NativeTouchEvent>) => {

    try {
      // Lấy dữ liệu hiện tại từ localStorage
      const currentData = await getData(key);
      if (currentData) {
        // Lọc bỏ item cần xóa
        const updatedData = currentData.filter((item: DataItem) => item.id !== id);
  
        // Cập nhật lại localStorage
        await setData(key, updatedData);
  
        // Cập nhật state để giao diện được render lại
        setData1(updatedData);
        deleteData(key,id);
        getDataFromLocalStorage();
      }

    } catch (error) {
      console.error('Error deleting item:', error);
    }
    event?.stopPropagation(); // Ngăn sự kiện lan đến cha
    console.log('Child Pressed!');
  };

    const getDataFromLocalStorage = async () => { 
      try { 
          const data = await getData('saved'); 
          console.log(data); 
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
              // Filter out undefined values in case some documents don't exist 
              setData('savedList',listData.filter((item: string) => item !== undefined)); 
          } 
      } 
      catch (error) { 
          console.log('Error reading data:', error); 
      } 
    };

    useEffect(() => {
      getDataFromLocalStorage();
    }, []);
    const renderItem = ({ item }: {item : DataItem}) => (
        <TouchableOpacity onPress={() => {console.log('oke')}} style={styles.item}>
          <View style={styles.item}>
            <Image source={{uri : item.image}} style={styles.image} />
            <View style={[{
                width: itemWidth,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',
                paddingTop: 0,
            }]}>
              <Text style={styles.text} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >{item.title}</Text>
              <TouchableOpacity style = {styles.deleteIcon} onPress={() => deleteItem('savedList', item.id)}>
                <FontAwesomeIcon icon={faTrashCan} size={12}/>
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

const styles = StyleSheet.create({
    container: {
        paddingRight: 14,
        paddingTop: 20,
        // backgroundColor:'#333',
      },
      item: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingBottom: 0,
        fontWeight: 400,
        marginVertical: 0,
        marginBottom: 10,
      },
      text: {
        fontSize: 14,
        // marginBottom: 20,
        // textAlign: 'center',
        fontFamily: 'Poly-Regular',
        paddingBottom: 0,
        marginTop: 5,
      },
      image: {
        width: itemWidth,
        height: itemWidth,
        resizeMode: 'cover',
        borderRadius: 8,
      },
      deleteIcon: {
        marginTop: 5,
      }
});
export default SavedList;


