import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text, Modal, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { collection, getDocs, limit, query, where, startAfter } from 'firebase/firestore';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StackNavigationProp } from '@react-navigation/stack';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './styles';
import db from '../../database/firestore';
import TimeCook from '../../components/TimeCook/TimeCook';
import FilterDish from '../../layouts/FilterDish/FilterDish';
import { FlatList } from 'react-native-gesture-handler';

type Route = RouteProp<RootStackParamList, 'Category'>;
interface Props {
    navigation: StackNavigationProp<RootStackParamList>;
    route: Route;
}

interface Dish {
    _id: string;
    image: string;
    is_vegetarian: boolean;
    time_cook: string;
    title: string;
}

interface Ingredients {
    amount: string;
    ingredient: string;
    unit: string;
}

interface Nutrition {
    Cal: string;
    Fat: string;
    Protein: string;
    Carb: string;
}

interface Item extends Dish {
    ingredients: Ingredients[];
    nutritions: Nutrition[];
    category: string[];
}

interface Filter {
    Category: string[];
    Diet: string[];
    Country: string[];
    Ingredients: string[];
}

const Loader = ({ size = 'large', color = '#000' }: { size?: 'small' | 'large'; color?: string }) => (
    <ActivityIndicator size={size} color={color} />
);

const Category: React.FC<Props> = ({ navigation, route }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [dataDish, setDataDish] = useState<Dish[]>([]);
    const [showFilter, setShowFilter] = useState(false);

    const [filterState, setFilterState] = useState<any>({
        indexCategory: [false, false, false, false],
        itemCategory: [false, false, false],
        itemDiet: [false, false, false],
        listCountry: [false, false, false, false, false],
        listIngredient: [false, false, false, false, false, false, false],
    });

    const fontLoaded = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    const sizePage = 10;

    const fetchData = async (isLoadMore = false) => {
        if (isLoadMore && isEnd) {
            return;
        }
        if (isLoadMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }
        try {
            let q;
            if (route.params.category === 'All') {
                q = query(collection(db, 'recipes'), limit(sizePage));
            } else {
                q = query(
                    collection(db, 'recipes'),
                    where('category', 'array-contains', route.params.category),
                    limit(sizePage),
                );
            }
            if (isLoadMore && lastVisible) {
                q = query(q, startAfter(lastVisible));
            }
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                _id: doc.id,
                image: doc.data().image,
                title: doc.data().title,
                time_cook: doc.data().time_cook,
                is_vegetarian: doc.data().is_vegetarian ? true : false,
            }));
            setDataDish((prev) => (isLoadMore ? [...prev, ...data] : data));
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setIsEnd(snapshot.docs.length < sizePage);
        } catch (e) {
            console.log(e);
        } finally {
            if (isLoadMore) {
                setLoadingMore(false);
            } else {
                setLoading(false);
            }
        }
    };

    const handleFilters = async (itemFilter: Filter, filterState: any) => {
        try {
            setLoading(true);
            setFilterState(filterState);
            const dishRef = collection(db, 'recipes');
            const queries: any[] = [];

            // Filter by Category
            if (itemFilter.Category.length > 0) {
                itemFilter.Category.forEach((category) => {
                    queries.push(query(dishRef, where('category', 'array-contains', category)));
                });
            }

            // Filter by Diet
            if (itemFilter.Diet.length > 0) {
                itemFilter.Diet.forEach((diet) => {
                    if (diet === 'Vegan') {
                        queries.push(query(dishRef, where('category', '==', diet)));
                    } else if (diet === 'Vegetarian') {
                        queries.push(query(dishRef, where('is_vegetarian', '==', 'Vegetarian'))); // Assuming boolean field
                    } else if (diet === 'Low carb') {
                        queries.push(query(dishRef, where('nutritions', '!=', null))); // Low-carb filtering happens later
                    }
                });
            }

            // Filter by Country
            if (itemFilter.Country.length > 0) {
                itemFilter.Country.forEach((country) => {
                    queries.push(query(dishRef, where('category', 'array-contains', country)));
                });
            }

            // Execute all queries and merge results
            const querySnapshots = await Promise.all(queries.map((q) => getDocs(q)));

            // Use a Map to avoid duplicates
            const resultMap = new Set<Item>();
            querySnapshots.forEach((snapshot) => {
                snapshot.forEach((doc: any) => {
                    const data = {
                        _id: doc.id,
                        ...doc.data(),
                    };
                    resultMap.add(data);
                });
            });

            // Filter for "Low carb" if included in Diet
            let filteredDishes = Array.from(resultMap.values());
            if (itemFilter.Diet.includes('Low carb')) {
                filteredDishes = filteredDishes.filter((dish: Item) => {
                    const carb = dish.nutritions?.find((n: any) => n.Carb);
                    const carbValue = carb ? Number(carb.Carb.split(' ')[0]) : null;
                    return carbValue && carbValue >= 20 && carbValue <= 130;
                });
            }

            const resultSet = new Set();
            // Filter by Ingredients
            if (itemFilter.Ingredients.length > 0) {
                const snapShot = await getDocs(dishRef);
                let data = snapShot.docs.map(
                    (doc) =>
                        ({
                            _id: doc.id,
                            ...doc.data(),
                        }) as Item,
                );
                itemFilter.Ingredients.forEach((ingredient) => {
                    data = data.filter((dish: Item) => {
                        return dish.ingredients.find((i) =>
                            i.ingredient.split(' ').includes(ingredient.toLocaleLowerCase()),
                        );
                    });
                });
                data.forEach((dish: Item) => resultSet.add(dish));
            }

            filteredDishes.forEach((dish: Item) => resultSet.add(dish));
            const results = Array.from(resultSet.values());

            // Update state with filtered results
            setDataDish(results as Dish[]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const renderFooter = () => {
        if (!loadingMore) return null;
        return <ActivityIndicator size="large" color="#fff" />;
    };

    const renderCard = ({ item }: { item: Dish }) => {
        return (
            <TouchableOpacity
                style={styles.itemRecipe}
                onPress={() => navigation.navigate('Recipe', { _id: item._id })}
            >
                <TimeCook time={item.time_cook} />
                <Image source={{ uri: item?.image }} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe} numberOfLines={1}>
                    {item.title}
                </Text>
                <View style={styles.ctnHeart}>
                    <FontAwesomeIcon icon={faHeart} color="#212121" />
                    {/* <Text style={styles.textHeart}>{item.likes.length}</Text> */}
                </View>
                {(item.is_vegetarian || route.params.category === 'Vegan') && (
                    <View style={styles.ctnType}>
                        <Text style={styles.textType}>Vegetarian</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    return !showFilter ? (
        <View style={styles.container}>
            <View style={{ marginBottom: 80 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingVertical: 24,
                        paddingHorizontal: 16,
                    }}
                >
                    <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={22} />
                    </TouchableOpacity>
                    <Text style={styles.textCategory}>{route.params.category}</Text>
                    {route.params.category === 'All' ? (
                        <TouchableOpacity style={styles.buttonBack} onPress={() => setShowFilter(true)}>
                            <FontAwesomeIcon icon={faBars} size={22} />
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ color: '#fff' }}>{route.params.category}</Text>
                    )}
                </View>
                {loading ? (
                    <Loader />
                ) : dataDish.length > 0 ? (
                    <FlatList
                        data={dataDish}
                        renderItem={renderCard}
                        onEndReached={() => fetchData(true)}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        numColumns={2}
                    />
                ) : (
                    <Text style={styles.noData}>No dish found!</Text>
                )}
            </View>
        </View>
    ) : (
        <Modal transparent={true} animationType="slide">
            <FilterDish
                filedState={filterState}
                closeModal={() => setShowFilter(false)}
                filter={(item: Filter, filedState: any) => handleFilters(item, filedState)}
            />
        </Modal>
    );
};

export default Category;
