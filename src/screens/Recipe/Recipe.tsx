import React, { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { View, ScrollView, Image, Text, TouchableOpacity, Modal } from 'react-native';
import { faPlus, faMinus, faChevronLeft, faCartShopping, faBookmark as Save } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import styles from './styles';
import db from '../../database/firestore';
import { getData, setData } from '../../../helper/storageHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ingredient = require('../../../assets/images/ingredients.png');
const cook = require('../../../assets/images/pan.png');
// import SaveCookBook from '../../layouts/SaveCookBook/SaveCookBook';
// import CookRecipe from '../../layouts/CookRecipe/CookRecipe';
import Notice from '../../components/NoticeForm/NoticeForm';
import addShoppingList from '../../helper/addShoppingList';

type Route = RouteProp<RootStackParamList, 'Recipe'>;

interface RecipeProps {
    navigation: StackNavigationProp<RootStackParamList>;
    route: Route;
}

interface Step {
    time: number;
    img_step: string;
    ingredients: string[];
    nutritions: string[];
    description: string;
    number_of_steps: string;
}

interface Nutrition {
    Cal: number;
    Fat: string;
    Protein: string;
    Carb: string;
}

interface Ingredient {
    amount: number;
    unit: string;
    ingredient: string;
}

interface Recipe {
    _id: string;
    title: string;
    image: string;
    category: string;
    servings_default: number;
    ingredients: Ingredient[];
    utensils: string;
    steps: Step[];
    time_cook: string;
    time_preparation: string;
    nutritions: Nutrition;
    number_like: number;
}

const Recipe: React.FC<RecipeProps> = ({ navigation, route }) => {
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });
    const [quantityIngredient, setQunatityIngre] = useState<string[]>([]);

    const [recipe, setRecipe] = useState<Recipe>({
        _id: '',
        title: '',
        image: 'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2FloadImage.jpg?alt=media&token=b8511f70-070d-4b1d-b1a6-f68daa2a6576',
        category: '',
        servings_default: 0,
        ingredients: [],
        utensils: '',
        steps: [],
        time_cook: '',
        time_preparation: '',
        nutritions: {
            Cal: 0,
            Fat: '',
            Protein: '',
            Carb: '',
        },
        number_like: 0,
    });
    const scrollViewRef = useRef<ScrollView>(null);
    const targetComponentRef = useRef<View>(null);
    const [yScroll, setY] = useState(0);
    const [showButtonCook, setShowCook] = useState(false);
    const [notice, setNotice] = useState(false);
    const [defaultPortion, setDefaultPortion] = useState(0);
    const [ration, setRation] = useState(0);
    const [isLike, setLike] = useState(false);
    const [isSave, setSave] = useState(false);
    const [showStepCook, setShowStepCook] = useState(false);
    const [checkRating, setCheckRating] = useState(false);
    const [showNotice, setShowNotice] = useState(false);
    const [noticeSave, setNoticeSave] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const liked = await getData('liked');
                const saved = await getData('saved');
                const docRef = doc(db, 'recipes', route.params._id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const steps = docSnap.get('steps');
                    const nutritions = docSnap.get('nutritions');
                    const ingredients = docSnap.get('ingredients');
                    const cal = Number(nutritions[0]['Cal']);
                    const fat = nutritions[1]['Fat'];
                    const protein = nutritions[2]['Protein'];
                    const carb = nutritions[3]['Carb'];
                    const data = {
                        _id: docSnap.id,
                        title: docSnap.get('title'),
                        image: docSnap.get('image'),
                        category: docSnap.get('category'),
                        servings_default: docSnap.get('servings_default'),
                        ingredients: ingredients,
                        utensils: docSnap.get('utensils'),
                        steps: steps,
                        time_cook: docSnap.get('time_cook'),
                        time_preparation: docSnap.get('time_preparation'),
                        nutritions: {
                            Cal: cal,
                            Fat: fat,
                            Protein: protein,
                            Carb: carb,
                        },
                        number_like: docSnap.get('number_like') || 0,
                    };
                    const quantityIngredient = data.ingredients.map((item: Ingredient) => item.amount);
                    setDefaultPortion(data.servings_default);
                    setQunatityIngre(quantityIngredient);
                    setRecipe(data);
                    setRation(data.servings_default);
                    if (liked) {
                        setLike(liked.includes(route.params._id));
                    }
                    if (saved) {
                        setSave(saved.includes(route.params._id));
                    }
                } else {
                    console.log('No such document!');
                }
            } catch (error: any) {
                console.log('Error getting document:', error.message);
            }
        };
        fetchData();
    }, []);

    const renderQuantity = recipe.ingredients.map((item: Ingredient, index: number) => {
        return (
            <Text key={index} style={styles.textIngredients}>
                {item.amount ? quantityIngredient[index] : ''} {item.unit}
            </Text>
        );
    });

    const renderIngredients = recipe.ingredients.map((item: Ingredient, index: number) => {
        return (
            <Text key={index} style={styles.textIngredients}>
                {item.ingredient}
            </Text>
        );
    });

    const renderStepCook = recipe.steps.map((step: Step, index: number) => {
        return (
            <View style={styles.ctnCookStep} key={index}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.textStep}>{step.number_of_steps}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        {/* <FontAwesomeIcon icon={faClock} size={20} style={{ marginBottom: 10 }} /> */}
                        {/* {step.time && <Text style={[styles.textStep, { color: '#da7e4f', marginLeft: 6 }]}>{formatTime(step.time)}</Text>} */}
                    </View>
                </View>
                {step.img_step ? (
                    <Image
                        source={{
                            uri: step.img_step
                                ? step.img_step
                                : 'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2FloadImage.jpg?alt=media&token=b8511f70-070d-4b1d-b1a6-f68daa2a6576',
                        }}
                        resizeMode="cover"
                        style={styles.imgStep}
                    />
                ) : null}

                {step.ingredients.length > 0 && (
                    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                        <Image style={styles.imgIcon} source={ingredient} />
                        <Text style={styles.textIngreCook}>{step.ingredients.join(' ')}</Text>
                    </View>
                )}

                {step.nutritions.length > 0 && (
                    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                        <Image style={styles.imgIcon} source={cook} />
                        <Text style={styles.textIngreCook}>{step.nutritions.join(' ')}</Text>
                    </View>
                )}

                <Text style={styles.textDesCook}>{step.description}</Text>
            </View>
        );
    });

    const handleScroll = (event: any) => {
        if (targetComponentRef.current) {
            const { y } = event.nativeEvent.contentOffset;
            setY(y);
            const scrollY = event.nativeEvent.contentOffset.y;
            targetComponentRef.current.measure((x, y, width, height, pageX, pageY) => {
                const componentTop = pageY;

                setShowCook(componentTop <= scrollY);
            });
        }
    };
    const handleSaveRecipe = () => {

    };
    const handleBack = () => {
        navigation.goBack();
    };

    const handleLike = (title : string) => {
        // console.log('liked' + title);
        const data = [title];
        setData('RecipeLiked',data);
        const data1 = getData('RecipeLiked');
        console.log(data1);
    };

    const hanldeAddToCart = () => {
        console.log('success');
    };

    const increaseRations = () => {
        if (defaultPortion === ration + 5) {
            return;
        }
        setDefaultPortion(Number(defaultPortion) + 1);
        var arr = Array.from(quantityIngredient);
        for (let i = 0; i < arr.length; i++) {
            if (Number.isNaN(parseInt(arr[i]) + parseInt(arr[i]) / 2)) {
                arr[i] = arr[i];
            } else {
                arr[i] = (parseInt(arr[i]) + parseInt(arr[i]) / 2).toString();
            }
        }
        setQunatityIngre(arr);
    };
    const handleAddToListShopping = () => {

    };
    const reduceRation = () => {
        if (defaultPortion === ration) {
            return;
        }
        setDefaultPortion(defaultPortion - 1);
        var arr = Array.from(quantityIngredient);
        for (let i = 0; i < arr.length; i++) {
            if (Number.isNaN(parseInt(arr[i]) - parseInt(arr[i]) / 2)) {
                arr[i] = arr[i];
            } else {
                arr[i] = (parseInt(arr[i]) - parseInt(arr[i]) / 2).toString();
            }
        }
        setQunatityIngre(arr);
    };

    if (notice) {
        setTimeout(() => {
            setNotice(false);
        }, 2000);
    }

    if (showNotice) {
        setTimeout(() => {
            setShowNotice(false);
        }, 2000);
    }

    if (noticeSave) {
        setTimeout(() => {
            setNoticeSave(false);
        }, 2000);
    }

    if (checkRating) {
        setTimeout(() => {
            setCheckRating(false);
        }, 2000);
    }

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {yScroll >= 52 ? (
                <View style={styles.ctnSocialOnScroll}>
                    <TouchableOpacity style={{ paddingHorizontal: 8, paddingVertical: 12 }} onPress={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} />
                    </TouchableOpacity>

                    {yScroll >= 518 ? (
                        <View style={styles.ctnSocial}>
                            <TouchableOpacity style={styles.btnSocial} onPress={() => handleLike(recipe.title)}>
                                <FontAwesomeIcon
                                    size={24}
                                    icon={isLike ? heart : faHeart}
                                    color={isLike ? '#fc642d' : '#212121'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnSocial} onPress={handleSaveRecipe}>
                                <FontAwesomeIcon
                                    size={24}
                                    icon={isSave ? Save : faBookmark}
                                    color={isSave ? '#ffc520' : '#000'}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.ctnSocial}></View>
                    )}
                </View>
            ) : (
                <View style={styles.ctnButtonBack}>
                    <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} />
                    </TouchableOpacity>
                </View>
            )}

            <Modal animationType="slide" transparent={true} visible={showStepCook}>
                {/* <CookRecipe data={recipe.step} close={() => setShowStepCook(false)} img = {recipe.imgDes}/> */}
            </Modal>

            <Modal animationType="slide" transparent={true} visible={showNotice}>
                <Notice text="Add ingredient to shopping list successfully!" type="success" />
            </Modal>

            {/*<Modal animationType="slide" transparent={true} visible={checkRating}>
                <Notice text="Bạn đã đánh giá thành công!" type="success" />
            </Modal> */}

            <Modal animationType="slide" transparent={true} visible={noticeSave}>
                <Notice text="You've successfully saved your recipe!" type="success" />
            </Modal>
            <View style={styles.ctnIntro}>
                <Image source={{ uri: recipe.image }} style={styles.imgIntro} resizeMode="cover" />
            </View>
            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                bounces={false}
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.marginTop}></View>
                <View style={styles.ctnInteract}>
                    <Text style={styles.textRecipe} numberOfLines={2}>
                        {recipe.title}
                    </Text>

                    <View style={styles.ctnSocial}>
                        <TouchableOpacity style={styles.btnSocial} onPress={() => handleLike(recipe.title)}>
                            <FontAwesomeIcon
                                size={24}
                                icon={isLike ? heart : faHeart}
                                color={isLike ? '#fc642d' : '#212121'}
                            />
                            <Text style={styles.numberLike}>{recipe.number_like}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSocial} onPress={handleSaveRecipe}>
                            <FontAwesomeIcon
                                size={24}
                                icon={isSave ? Save : faBookmark}
                                color={isSave ? '#ffc520' : '#000'}
                            />
                            <Text style={styles.textSocial}>{isSave ? 'Unsave' : 'Save'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ctnItem}>
                    <View style={styles.ctnTime}>
                        <View>
                            <Text style={styles.textTime}>Prepration</Text>
                            <Text style={styles.textTime}>{recipe.time_preparation}</Text>
                        </View>
                        <View>
                            <Text style={styles.textTime}>Time cook</Text>
                            <Text style={styles.textTime}>{recipe.time_cook}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.ctnIngredients}>
                    <Text style={styles.textHeadingReview}>Ingredients</Text>

                    <View style={styles.ctnAdjust}>
                        <View style={styles.adjustQuantity}>
                            <TouchableOpacity style={styles.btnAdjust} onPress={reduceRation}>
                                <FontAwesomeIcon icon={faMinus} />
                            </TouchableOpacity>
                            <Text style={styles.textAdjust}>{defaultPortion}</Text>
                            <TouchableOpacity style={styles.btnAdjust} onPress={increaseRations}>
                                <FontAwesomeIcon icon={faPlus} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.numberAdjust}>Servings</Text>
                    </View>

                    <View style={styles.renderIngredients}>
                        <View style={styles.itemLeft}>{renderQuantity}</View>

                        <View style={styles.itemRight}>{renderIngredients}</View>
                    </View>

                    <View style={styles.ctnButtonAddToCart}>
                        <TouchableOpacity style={styles.buttonAddToCart} onPress={handleAddToListShopping}>
                            <FontAwesomeIcon icon={faCartShopping} color="#fff" />
                            <Text style={[styles.textCooking, { marginLeft: 8, fontSize: 16 }]}>
                                Add to the list shopping
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ctnIngredients}>
                    <Text style={styles.textHeadingReview}>Utensils</Text>
                    <Text style={styles.textUtensils}>{recipe.utensils}</Text>
                </View>

                <View style={styles.ctnIngredients} ref={targetComponentRef} onLayout={() => {}}>
                    <Text style={styles.textHeadingReview}>Nutrition per serving</Text>

                    <View style={styles.ctnNutrition}>
                        <View>
                            <Text style={styles.textNutition}>Cal</Text>
                            <Text style={styles.textNutition}>{recipe.nutritions.Cal}</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Fat</Text>
                            <Text style={styles.textNutition}>{recipe.nutritions.Fat}</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Protein</Text>
                            <Text style={styles.textNutition}>{recipe.nutritions.Protein}</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Carb</Text>
                            <Text style={styles.textNutition}>{recipe.nutritions.Carb}</Text>
                        </View>
                    </View>

                    <View style={styles.ctnCookStep}>{renderStepCook}</View>
                    <View style={styles.ctnCookStep}>
                        <Text style={[styles.textStep, { marginBottom: 24 }]}>Enjoy!</Text>
                        <Image source={{ uri: recipe.image }} resizeMode="cover" style={styles.imgStep} />
                    </View>
                </View>
            </ScrollView>

            {showButtonCook ? (
                <View style={styles.ctnButtonCook}>
                    {/* <TouchableOpacity style={styles.buttonStartCook} >
                        <Text style={styles.textCooking}>Start cook!</Text>
                    </TouchableOpacity> */}
                </View>
            ) : (
                ''
            )}
        </View>
    );
};

export default Recipe;
