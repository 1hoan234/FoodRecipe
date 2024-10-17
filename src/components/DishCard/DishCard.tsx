import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import db from '../../database/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import TimeCook from '../TimeCook/TimeCook';

interface Item {
    _id: string;
    image: string;
    is_vegetarian: boolean;
    time_cook: string;
    title: string;
    category: string;
    number_like: number;
}

type Props = {
    navigation: any;
    params: string;
    refreshing: boolean;
    liked: string[];
};

const DishCard: React.FC<Props> = ({ navigation, params, refreshing, liked }) => {
    const [data, setData] = useState<Item[]>([
        {
            _id: '',
            image: 'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2FloadImage.jpg?alt=media&token=b8511f70-070d-4b1d-b1a6-f68daa2a6576',
            title: '',
            time_cook: '',
            is_vegetarian: false,
            category: '',
            number_like: 0,
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let q;
                if (params === 'All') {
                    q = query(collection(db, 'recipes'));
                } else {
                    q = query(collection(db, 'recipes'), where('category', 'array-contains', params));
                }
                const snapshot = await getDocs(q);
                const datas = snapshot.docs.map((doc) => {
                    return { _id: doc.id, ...doc.data() } as Item;
                });
                setData(
                    datas
                        .slice()
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 5),
                );
            } catch (err: any) {
                console.log(err.message);
            }
        };
        fetchData();
    }, [refreshing]);

    const renderCard = ({ item }: { item: Item }) => {
        return (
            <TouchableOpacity
                style={styles.itemRecipe}
                onPress={() => {
                    navigation.navigate('Recipe', { _id: item._id });
                }}
            >
                {item.time_cook && <TimeCook time={item.time_cook} />}
                <Image source={{ uri: item?.image }} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe}>{item.title}</Text>
                <View style={styles.ctnHeart}>
                    {item.title && (
                        <FontAwesomeIcon
                            size={18}
                            icon={liked.includes(item._id) ? heart : faHeart}
                            color={liked.includes(item._id) ? '#fc642d' : '#212121'}
                        />
                    )}
                    {item.number_like > 0 && <Text style={styles.textHeart}>{item.number_like}</Text>}
                </View>
                {item.is_vegetarian && (
                    <View style={styles.ctnType}>
                        <Text style={styles.textType}>Vegetarian</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ marginBottom: 40 }}>
            <FlatList data={data} renderItem={renderCard} horizontal showsHorizontalScrollIndicator={false} />
        </View>
    );
};

export default DishCard;
