import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import debounce from 'lodash.debounce';
import { collection, getDocs, query, where } from 'firebase/firestore';

import styles from './styles';
import db from '../../database/firestore';

type Props = {
    closeModal: () => void;
    navigation: any;
};
interface Dish {
    _id: string;
    image: string;
    title: string;
}

interface Item extends Dish {
    ingredients: Ingredients[];
    category: string[];
}

interface Ingredients {
    amount: string;
    ingredient: string;
    unit: string;
}

const LayoutSearch: React.FC<Props> = ({ closeModal, navigation }) => {
    const [animation] = useState(new Animated.Value(0.8)); // Initial animated value
    const inputRef = useRef<TextInput>(null);
    const [dataDish, setDataDish] = useState<Dish[]>([]);
    const [textInput, setTextInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
        // Run animation when component mounts
        Animated.timing(animation, {
            toValue: 1, // Target value
            duration: 1000, // Duration in milliseconds
            useNativeDriver: true, // Use native driver for performance
        }).start(); // Start the animation
    }, []);

    const renderDish = dataDish.map((dish: Dish, index: number) => {
        return (
            <TouchableOpacity
                key={index}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                    paddingVertical: 4,
                }}
                onPress={() => {
                    navigation.navigate('Recipe', { _id: dish?._id });
                    closeModal();
                }}
            >
                <Image
                    source={{ uri: dish.image }}
                    resizeMode="cover"
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                    }}
                />
                <Text style={styles.textNameDish} numberOfLines={1}>
                    {dish.title}
                </Text>
            </TouchableOpacity>
        );
    });

    const handleSearch = async (text: string) => {
        if (text === '') {
            return;
        }
        setLoading(true);
        setTextInput(text);

        try {
            const dishsRef = collection(db, 'recipes');
            const result = new Map<string, Dish>();
            const normalizedText = text.toLowerCase();

            // Query for titles and categories
            const searchQueries = [
                query(dishsRef, where('title', '>=', normalizedText), where('title', '<=', normalizedText + '\uf8ff')),
                query(
                    dishsRef,
                    where('category', '>=', normalizedText),
                    where('category', '<=', normalizedText + '\uf8ff'),
                ),
            ];

            // Execute queries
            const [titleSnapshot, categorySnapshot] = await Promise.all(searchQueries.map(getDocs));

            // Process title results
            titleSnapshot.forEach((doc) => {
                result.set(doc.id, { _id: doc.id, ...doc.data() } as Item);
            });

            // Process category results
            categorySnapshot.forEach((doc) => {
                result.set(doc.id, { _id: doc.id, ...doc.data() } as Item);
            });

            // Process ingredient matches
            const allDocsSnapshot = await getDocs(dishsRef);
            allDocsSnapshot.forEach((doc) => {
                const dish = { _id: doc.id, ...doc.data() } as Item;
                dish.ingredients.forEach((ingredient) => {
                    if (ingredient.ingredient.toLowerCase().includes(normalizedText)) {
                        result.set(dish._id, dish);
                    }
                });
            });

            // Update state with unique results
            setDataDish(Array.from(result.values()));
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const debounceFn = debounce(() => {}, 500);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        opacity: animation, // Use animated value for opacity
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <TouchableOpacity onPress={closeModal} style={styles.buttonBack}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} />
                    </TouchableOpacity>
                    <View style={styles.ctnSearch}>
                        <TextInput
                            placeholderTextColor="#7d7d80"
                            style={styles.input}
                            cursorColor="#7d7d80"
                            ref={inputRef}
                            onChangeText={(text) => handleSearch(text)}
                        />
                    </View>
                </View>
            </Animated.View>

            <ScrollView bounces={false}>
                <View style={{ width: '100%' }}>
                    {renderDish}
                    {dataDish.length === 0 && textInput.length > 0 && !loading && (
                        <Text style={styles.textNotFound}>Dish not found!</Text>
                    )}
                </View>
                {loading && <ActivityIndicator size="large" color="#da7e4f" />}
            </ScrollView>
        </View>
    );
};

export default LayoutSearch;
