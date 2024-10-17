import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';
import LayoutSearch from '../../layouts/Search/LayoutSearch';
import Test from '../show';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Search: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });
    const [modalSearch, setModalSearch] = useState(false);

    const handleOnPress = () => {
        setModalSearch(true);
    };

    if (!fontLoaded) {
        return null;
    }

    const handleClickOnCategory = (category: string) => {
        navigation.navigate('Category', { category: category });
    };

    return modalSearch ? (
        <Modal visible={true} transparent={true} animationType="slide">
            <LayoutSearch closeModal={() => setModalSearch(false)} navigation={navigation} />
        </Modal>
    ) : (
        <View style={styles.container}>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false} bounces={false}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 12,
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={22} />
                    </TouchableOpacity>
                    <Text style={styles.searchLabel}>Search</Text>
                    <Text style={{ color: '#fff' }}>Search</Text>
                </View>
                <View style={styles.searchView}>
                    <View style={styles.ctnSearch}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color="#7d7d80" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="What dish do you want to cook?"
                            placeholderTextColor="#7d7d80"
                            style={styles.input}
                            cursorColor={'#65676b'}
                            onPressIn={handleOnPress}
                        />
                    </View>
                </View>

                <Text style={styles.textCategory}>Categories</Text>

                <View style={styles.selectSearch}>
                    <TouchableOpacity style={styles.selectSearchChild} onPress={() => handleClickOnCategory('Vegan')}>
                        <Image
                            source={require('../../../assets/images/My.png')}
                            resizeMode="contain"
                            style={styles.selectSearchChildImg}
                            />
                        <Text style={styles.selectSearchChildTxt}>Vegan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.selectSearchChild} onPress={() => handleClickOnCategory('Dessert')}>
                        <Image
                            source={require('../../../assets/images/trangmieng.png')}
                            resizeMode="contain"
                            style={styles.selectSearchChildImg}
                        />
                        <Text style={styles.selectSearchChildTxt}>Dessert</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectSearchChild} onPress={() => handleClickOnCategory('Salad')}>
                        <Image
                            source={require('../../../assets/images/monchay.png')}
                            resizeMode="contain"
                            style={styles.selectSearchChildImg}
                        />
                        <Text style={styles.selectSearchChildTxt}>Salad</Text>
                    </TouchableOpacity>
                </View>
            <Test/>
                <TouchableOpacity style={styles.ctnAllRecipes} onPress={() => handleClickOnCategory('All')}>
                    <Text style={styles.textAllRecipes}>All recipes</Text>
                    <FontAwesomeIcon icon={faChevronRight} size={20} color="#747070" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Search;
