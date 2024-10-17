import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageStyle,
    Modal,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { faChevronLeft, faChevronRight, faClock, faEllipsisH, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';

import Footer from '../../components/Footer/Footer';
import { RootStackParamList } from '../../../App';
import styles from './styles';
import SelectInforUser from '../SelectInfor/SelectInforUser';
import getTime from '../../helper/getCurrentTime';
import getWeek from '../../helper/getCurrentWeek';
import { getData, storeData } from '../../helper/storageHelper';
import createMealPlanner from '../../helper/createMealPlanner';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../database/firestore';
const listEmpty = require('../../../assets/images/list.png');
import RecipeComponent from '../../components/RecipeComponent/RecipeComponent';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

interface DataUser {
    area: string;
    time: string;
    numberPeople: number;
    optionChoices: number;
    diets: string[];
    quantity: number[];
}

interface DayPlan {
    lunch: Dish[];
    dinner: Dish[];
    day: string;
}

interface Dish {
    _id: string;
    title: string;
    image: string;
    time_cook: string;
    label: string;
}

const MealPlanner: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });
    const currentTime = new Date();

    const [index, setIndex] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [dataUser, setDataUser] = useState<DataUser>({
        area: '',
        time: '',
        numberPeople: 0,
        optionChoices: 0,
        diets: [''],
        quantity: [0],
    });
    const [indexTime, setIndexTime] = useState<number>(0);

    const [recipeDay, setRecipeDay] = useState<DayPlan | null>(null);
    const [recipeWeek, setRecipeWeek] = useState<DayPlan[]>([]);
    const [totalRecipeWeek, setTotalRecipeWeek] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    if (!fontLoaded) {
        return null;
    }

    const createMeal = async () => {
        const userInfor = await getData('userInfor');
        if (!userInfor) return;
        setDataUser(userInfor);
        let mealWeekly = await getData('weeklyPlan');
        const createdPlan = await getData('createdPlan');
        if (currentTime.getDay() === 6) {
            storeData('createdPlan', false);
        }
        if (currentTime.getDay() === 0 && !createdPlan) {
            await createMealPlanner();
            mealWeekly = await getData('weeklyPlan');
            storeData('createdPlan', true);
        };        
        const data = mealWeekly.plan;
        const result = [];
        let totalRecipeWeeks = 0;
        for (const plan of data) {
            const lunch = plan.lunch;
            const dinner = plan.dinner;
            totalRecipeWeeks += lunch.length + dinner.length;
            const day = plan.day;
            const lunchPromises = lunch.map(async (value: any) => {
                const docRef = doc(db, 'recipes', value._id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return {
                        _id: docSnap.id,
                        title: docSnap.get('title'),
                        image: docSnap.get('image'),
                        time_cook: docSnap.get('time_cook'),
                        label: value.label,
                    };
                }
            });

            const dinnerPromises = dinner.map(async (value: any) => {
                const docRef = doc(db, 'recipes', value._id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    return {
                        _id: docSnap.id,
                        title: docSnap.get('title'),
                        image: docSnap.get('image'),
                        time_cook: docSnap.get('time_cook'),
                        label: value.label,
                    };
                }
            });

            // Wait for all promises to resolve
            const listLunch = await Promise.all(lunchPromises);
            const listDinner = await Promise.all(dinnerPromises);
            result.push({
                lunch: listLunch.filter((item) => item !== undefined),
                dinner: listDinner.filter((item) => item !== undefined),
                day: day,
            });
        }
        setRecipeDay(result[currentTime.getDay()]);
        setTotalRecipeWeek(totalRecipeWeeks);
        setRecipeWeek(result);
        setIndexTime(currentTime.getDay());
        setLoading(false);
    };

    const changeDay = (type: string) => {
        if (type === 'Previous') {
            if (indexTime === 0) {
                return;
            } else {
                setIndexTime(indexTime - 1);
            }
        }
        if (type === 'Next') {
            if (indexTime === 6) {
                return;
            } else {
                setIndexTime(indexTime + 1);
            }
        }
    };

    const updateRecipeWeek = (recipe: string, index: number, type: string) => {
        const newRecipeWeek = [...recipeWeek];
        // const newRecipe = { ...newRecipeWeek[id] };
        const planItem : DayPlan = newRecipeWeek[index];
        const updatePlam : DayPlan = {...planItem};
        if (type === 'lunch') {
            planItem.lunch = planItem.lunch.filter((item) => item._id !== recipe);
        }
        else if (type === 'dinner') {
            planItem.dinner = planItem.dinner.filter((item) => item._id !== recipe);
        }
        newRecipeWeek[index] = updatePlam;
        setRecipeWeek(newRecipeWeek);
    };

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="small" color="#000" style={{ marginTop: 12 }} />;
        }
    
        switch (index) {
            case 0:
                return recipeWeek[indexTime] ? (
                    <View
                        style={{
                            borderTopColor: '#ccc',
                            borderTopWidth: 1,
                            paddingTop: 16,
                            marginTop: -8,
                        }}
                    >
                        <RecipeComponent 
                            plan={recipeWeek[indexTime]} navigation={navigation} 
                            updatePlan={(recipe: string, index: number, type: string) => updateRecipeWeek(recipe, index, type)}
                        />
                    </View>
                ) : (
                    <View style={styles.ctnItemEmpty}>
                                <Image source={listEmpty} style={styles.imageEmpty as ImageStyle} />
                                <Text style={styles.textEmpty}>You have no recipes planned</Text>
                                <TouchableOpacity style={styles.btnDiscovery} onPress={() => setShowModal(true)}>
                                    <Text style={styles.txtDiscovery}>Discovery</Text>
                                </TouchableOpacity>
                            </View>
                );
    
            case 1:
                return recipeWeek.length > 0 ? (
                    <RecipeComponent 
                        plan={recipeWeek[indexTime]} navigation={navigation} 
                        updatePlan={(recipe: string, index: number, type: string) => updateRecipeWeek(recipe, index, type)}
                    />
                ) : (
                    <View style={styles.ctnItemEmpty}>
                                <Image source={listEmpty} style={styles.imageEmpty as ImageStyle} />
                                <Text style={styles.textEmpty}>You have no recipes planned</Text>
                                <TouchableOpacity style={styles.btnDiscovery} onPress={() => setShowModal(true)}>
                                    <Text style={styles.txtDiscovery}>Discovery</Text>
                                </TouchableOpacity>
                            </View>
                );
    
            case 2:
                return (
                    <View style={styles.ctnItemEmpty}>
                            <Image source={listEmpty} style={styles.imageEmpty as ImageStyle} />
                            <Text style={styles.textEmpty}>No recipes to schedule</Text>
                            <Text style={styles.subText}>
                                If a recipe's in your meal plan but not yet slated for cooking, you'll see it here.
                            </Text>
                        </View>
                );
    
            default:
                return null;
        }
    };
    
    useEffect(() => {
        createMeal();
    }, []);

    useEffect(() => {
        const getDataFromLocalStorage = async () => {
            try {
                const data = await getData('userInfor');
                if (data) {
                    setDataUser(data);
                }
                setShowModal(!data);
            } catch (error) {
                console.error('Error fetching data from local storage:', error);
            }
        };
        getDataFromLocalStorage();
    }, []);

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
                <SelectInforUser closeModal={() => setShowModal(false)} address="MealPlanner" data={dataUser} />
            </Modal>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Meal Planner</Text>
                <TouchableOpacity style={styles.ctnIcon}>
                    <FontAwesomeIcon icon={faUser} size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <View style={styles.ctnTimeFiled}>
                    <TouchableOpacity
                        onPress={() => setIndex(0)}
                        style={[index === 0 ? styles.btnActive : styles.btnTimeFiled, { width: '25%' }]}
                    >
                        <Text style={styles.textTimeFiled}>Today</Text>
                        <Text style={styles.quantityRecipes}>
                            {recipeDay ? recipeDay.dinner.length + recipeDay.lunch.length : 0} recipes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setIndex(1)}
                        style={[index === 1 ? styles.btnActive : styles.btnTimeFiled, { width: '35%' }]}
                    >
                        <Text style={[styles.textTimeFiled, { marginLeft: 28 }]}>This Week</Text>
                        <Text style={[styles.quantityRecipes, { marginLeft: 28 }]}>{totalRecipeWeek} recipes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setIndex(2)}
                        style={[index === 2 ? styles.btnActive : styles.btnTimeFiled, { width: '40%' }]}
                    >
                        <Text style={[styles.textTimeFiled, { marginLeft: 28 }]}>Unscheduled</Text>
                        <Text style={[styles.quantityRecipes, { marginLeft: 28 }]}>0 recipes</Text>
                    </TouchableOpacity>
                </View>

                {index !== 2 && (
                    <View style={styles.ctnTime}>
                        <View style={styles.displayTime}>
                            <TouchableOpacity onPress={() => changeDay('Previous')}>
                                <FontAwesomeIcon icon={faChevronLeft} color="#535353" />
                            </TouchableOpacity>
                            <Text style={styles.timeText}>{index === 0 ? getTime(recipeWeek[indexTime]?.day?.toString() || currentTime.toString()).str : getWeek().str}</Text>
                            <TouchableOpacity onPress={() => changeDay('Next')}>
                                <FontAwesomeIcon icon={faChevronRight} color="#535353" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {renderContent()}
                </View>
            </ScrollView>

            <Footer navigation={navigation} address="Meal Planner" />
        </View>
    );
};

export default MealPlanner;
