import React from 'react'; 
import { Text, View, TouchableOpacity } from 'react-native'; 
import { faHouse, faFloppyDisk, faCartShopping, faGear, faCalendar } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../../App'; 
 
import styles from './styles'; 
import { useFonts } from 'expo-font'; 
 
export type Navigation = { 
    navigation: StackNavigationProp<RootStackParamList>; 
    address: any; 
}; 
 
const Footer: React.FC<Navigation> = ({ navigation, address }) => { 
    const [fontLoaded] = useFonts({ 
        'Poly-Italic': require('../../../assets/fonts/Poly-Italic.ttf'), 
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'), 
    }); 
 
    const handleClick = (address: any) => { 
        navigation.navigate(address); 
    }; 
 
    if (!fontLoaded) { 
        return null; 
    } 
 
    return ( 
        <View style={styles.container}> 
            <TouchableOpacity style={styles.item} onPress={() => handleClick('Home')}> 
                <FontAwesomeIcon size={20} icon={faHouse} color={address === 'Home' ? '#da7e4f' : '#747678'} /> 
                <Text style={address === 'Home' ? styles.textClick : styles.text}>Home</Text> 
            </TouchableOpacity> 
 
            <TouchableOpacity style={styles.item} onPress={() => handleClick('Meal planner')}> 
                <FontAwesomeIcon size={20} icon={faCalendar} color={address === 'Meal planner' ? '#da7e4f' : '#747678'} /> 
                <Text style={address === 'Meal Planner' ? styles.textClick : styles.text}>Meal planner</Text> 
            </TouchableOpacity> 
 
            <TouchableOpacity style={styles.item} onPress={() => handleClick('Saved')}> 
                <FontAwesomeIcon 
                    size={20} 
                    icon={faFloppyDisk} 
                    color={address === 'Saved' ? '#da7e4f' : '#747678'} 
                /> 
                <Text style={address === 'Saved' ? styles.textClick : styles.text}>Saved</Text> 
            </TouchableOpacity> 
 
            <TouchableOpacity style={styles.item} onPress={() => handleClick('Setting')}> 
                <FontAwesomeIcon size={20} icon={faGear} color={address === 'Setting' ? '#da7e4f' : '#747678'} /> 
                <Text style={address === 'Setting' ? styles.textClick : styles.text}>Setting</Text> 
            </TouchableOpacity> 
        </View> 
    ); 
}; 
 
export default Footer;
