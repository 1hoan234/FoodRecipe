import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './styles';
import ItemNote from '../../components/ItemNote/ItemNode';
import { getData } from '../../helper/storageHelper';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../database/firestore';
const listEmpty = require('../../../assets/images/wishlist.png');

type Props = {
    closeModal: () => void;
    navigation: any;
};

interface Item {
    _id: string;
    title: string;
    image: string;
    servings_default: number;
    ingredients: Ingredient[];
}

interface Ingredient {
    amount: number;
    unit: string;
    ingredient: string;
}

const Note: React.FC<Props> = ({ closeModal, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Item[]>([]);

    const getDataFromLocalStorage = async () => {
        try {
            const data = await getData('shoppingList');
            if (data) {
                const docPromises = data.map(async (value: string) => {
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

                // Filter out undefined values in case some documents don't exist
                setData(listData.filter((item) => item !== undefined));
            }
        } catch (error) {
            console.log('Error reading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateData = (_id: string) => {
        const newData = data.filter((value: Item) => value._id !== _id);
        setData(newData);
    };

    useEffect(() => {
        getDataFromLocalStorage();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Today list shopping</Text>
                <TouchableOpacity style={styles.btnXMark} onPress={closeModal}>
                    <FontAwesomeIcon icon={faXmark} size={20} color="#65676b" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="small" color="#000" style={{ marginTop: 12 }} />
            ) : (
                <View style={styles.body}>
                    {data.length === 0 ? (
                        <View style={styles.ctnImage}>
                            <Image source={listEmpty} style={styles.image} />
                            <Text style={styles.textField}>There are no ingredients to shop for today!</Text>
                            <TouchableOpacity
                                style={styles.btnAdd}
                                onPress={() => {
                                    navigation.navigate('Search');
                                    closeModal();
                                }}
                            >
                                <Text style={styles.textBtnAdd}>Add ingredients</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ paddingBottom: 48 }}>
                                {data.map((item: Item, index: number) => {
                                    return (
                                        <ItemNote
                                            key={index}
                                            item={item}
                                            navigation={navigation}
                                            closeModal={closeModal}
                                            updateData={(_id: string) => updateData(_id)}
                                        />
                                    );
                                })}
                            </View>
                        </ScrollView>
                    )}
                </View>
            )}
            <View></View>
        </View>
    );
};

export default Note;
