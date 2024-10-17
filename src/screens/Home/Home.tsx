import React, { useEffect, useState } from 'react';
import {
    Image,
    Modal,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useFonts } from 'expo-font';
import { faHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
const background = require('../../../assets/images/home_bg.jpeg');
const image = require('../../../assets/images/R1016-final-photo-1.jpg');
import Footer from '../../components/Footer/Footer';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import DishCard from '../../components/DishCard/DishCard';
import SelectInforUser from '../SelectInfor/SelectInforUser';
import TimeCook from '../../components/TimeCook/TimeCook';
import Note from '../Note/Note';
import { getData } from '../../helper/storageHelper';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeProps {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
}

interface DataUser {
    area: string;
    time: string;
    numberPeople: number;
    optionChoices: number;
    diets: string[];
    quantity: number[];
}

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
    const [dataUser, setDataUser] = useState<DataUser>({
        area: '',
        time: '',
        numberPeople: 0,
        optionChoices: 0,
        diets: [''],
        quantity: [0],
    });
    const [showModal, setShowModal] = useState(false);
    const [modalNotceVisible, setModalNotceVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [liked, setLiked] = useState<string[]>([]);
    const [fontLoaded] = useFonts({
        'Poly-Italic': require('../../../assets/fonts/Poly-Italic.ttf'),
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
        'Poly-Inter': require('../../../assets/fonts/Poly-Inter.ttf'),
    });
    useEffect(() => {
        const getDataFromLocalStorage = async () => {
            try {
                const data = await getData('userInfor');
                const liked = await getData('liked');
                if (data) {
                    setDataUser(data);
                }
                if (liked) {
                    setLiked(liked);
                }
                setShowModal(!data);
            } catch (error) {
                console.error('Error fetching data from local storage:', error);
            }
        };
        getDataFromLocalStorage();
    }, []);

    if (!fontLoaded) {
        return <View style={styles.container} />;
    }

    const onRefresh = () => {
        // Thực hiện các tác vụ cần thiết để làm mới dữ liệu
        setRefreshing(true);

        // Sau khi làm mới dữ liệu xong, set refreshing về false để dừng indicator
        setTimeout(() => {
            setRefreshing(false);
        }, 500); // Thời gian làm mới ở đây là 500ms (0.5 giây)
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback style={styles.overlay}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <SelectInforUser closeModal={() => setShowModal(false)} address="Home" data={dataUser} />
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNotceVisible}
                onRequestClose={() => setModalNotceVisible(false)}
            >
                <TouchableWithoutFeedback style={styles.overlay}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <Note closeModal={() => setModalNotceVisible(false)} navigation={navigation} />
            </Modal>
            <View style={styles.ctnImage}>
                <Image source={background} resizeMode="cover" style={styles.image} />
            </View>
            <View style={styles.ctnNote}>
                <TouchableOpacity style={styles.ctnIcon} onPress={() => setModalNotceVisible(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} size={26} />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                // bounces={false}
                scrollEventThrottle={16}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                // onScroll={(event: any) => {
                //     const {y} = event.nativeEvent.contentOffset;
                //     console.log(y);
                // }}
            >
                <View style={styles.searchView}>
                    <View style={styles.ctnSearch}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color="#4A4747" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="What dish do you want to cook?"
                            placeholderTextColor="#4A4747"
                            style={styles.input}
                            cursorColor={'#65676b'}
                            onFocus={() => navigation.navigate('Search')}
                        />
                    </View>
                </View>
                <View style={styles.marginTop}></View>
                <View style={{ width: '100%' }}>
                    <View style={styles.ctnSuggest}>
                        <View style={styles.suggest}>
                            <View>
                                <Text style={styles.headerSuggest}>Weekend Delicacies</Text>
                                <Text style={styles.textSuggest}>How to make cakes at home</Text>
                            </View>

                            <View style={styles.infoAuthor}>
                                <Text style={styles.author}></Text>
                                <FontAwesomeIcon icon={faHeart} size={18} style={styles.iconHeart} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View>
                            <View style={[styles.ctnCategory, { marginBottom: 20 }]}>
                                <Text style={styles.textHeader}>Recipes for you</Text>
                            </View>
                            <View style={{ marginBottom: 32, position: 'relative' }}>
                                <TimeCook time="15 min" />
                                <Image source={image} style={{ width: '100%', height: 240, borderRadius: 18 }} />
                                <View style={styles.ctnHeart}>
                                    <FontAwesomeIcon icon={faHeart} color="#212121" />
                                </View>
                            </View>
                        </View>

                        <View>
                            <View style={[styles.ctnCategory, { marginBottom: 20 }]}>
                                <Text style={styles.textHeader}>Merry Christmas</Text>
                            </View>

                            <DishCard
                                navigation={navigation}
                                params="Christmas"
                                refreshing={refreshing}
                                liked={liked}
                            />
                        </View>

                        <View>
                            <View style={[styles.ctnCategory, { marginBottom: 20 }]}>
                                <Text style={styles.textHeader}>Asian Food</Text>
                                <TouchableOpacity
                                    style={styles.btnSeeAll}
                                    onPress={() => navigation.navigate('Category', { category: 'Asian' })}
                                >
                                    <Text style={styles.textAll}>All</Text>
                                    <FontAwesomeIcon icon={faChevronRight} color="#da7e4f" size={14} />
                                </TouchableOpacity>
                            </View>

                            <DishCard navigation={navigation} params="Asian" refreshing={refreshing} liked={liked} />
                        </View>

                        <View>
                            <View style={[styles.ctnCategory, { marginBottom: 20 }]}>
                                <Text style={styles.textHeader}>Eroupe Food</Text>
                                <TouchableOpacity
                                    style={styles.btnSeeAll}
                                    onPress={() => navigation.navigate('Category', { category: 'Europe' })}
                                >
                                    <Text style={styles.textAll}>All</Text>
                                    <FontAwesomeIcon icon={faChevronRight} color="#da7e4f" size={14} />
                                </TouchableOpacity>
                            </View>

                            <DishCard navigation={navigation} params="Europe" refreshing={refreshing} liked={liked} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} address="Home" />
        </View>
    );
};

export default Home;
