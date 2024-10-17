import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Checkbox from 'expo-checkbox';

import styles from './styles';
import { getData, removeData, storeData } from '../../helper/storageHelper';

type Props = {
    item: Item;
    navigation: any;
    closeModal: () => void;
    updateData: (_id: string) => void;
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

const ItemNote: React.FC<Props> = ({ item, navigation, closeModal, updateData }) => {
    const [showOption, setShowOption] = useState(false);
    const [checkbox, setCheckBox] = useState<boolean[]>(item.ingredients.map(() => false));
    const [showItem, setShowItem] = useState<boolean[]>(item.ingredients.map(() => true));

    const handleRemove = async () => {
        const data = await getData('shoppingList');
        const newData = data.filter((value: string) => value !== item._id);
        await storeData('shoppingList', newData);
        setShowOption(false);
        updateData(item._id);
    };

    const handleCheckbox = (index: number) => {
        const newData = [...checkbox];
        newData[index] = !newData[index];
        setCheckBox(newData);
    };

    return (
        <View style={styles.itemDish}>
            {showOption && (
                <View style={styles.option}>
                    <View>
                        <TouchableOpacity style={styles.btnOptionDelete} onPress={handleRemove}>
                            <FontAwesomeIcon icon={faXmarkCircle} size={18} color="#65676b" />
                            <Text style={styles.textBtnOption}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOptionSend}>
                            <FontAwesomeIcon icon={faPaperPlane} size={18} color="#65676b" />
                            <Text style={styles.textBtnOption}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => setShowOption(false)}>
                            <FontAwesomeIcon icon={faXmark} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.headerItem}>
                <TouchableOpacity
                    style={styles.ctnInforDish}
                    onPress={() => {
                        navigation.navigate('Recipe', { _id: item._id });
                        closeModal();
                    }}
                >
                    <Image src={item.image} style={styles.imageDish} />
                    <Text style={styles.textDish} numberOfLines={1}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowOption(true)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} size={18} />
                </TouchableOpacity>
            </View>
            <View style={styles.ctnServings}>
                <Text style={styles.textServings}>Servings: </Text>
                <Text style={[styles.textServings, { color: '#da7e4f' }]}>{item.servings_default}</Text>
            </View>
            <View style={styles.ctnIngredients}>
                {item.ingredients.map((value: Ingredient, index: number) => {
                    return (
                        <View style={styles.itemIngredient} key={index}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    value={checkbox[index]}
                                    color={'#16a085'}
                                    style={styles.checkbox}
                                    onValueChange={() => handleCheckbox(index)}
                                />
                                <Text style={styles.textIngredient}>
                                    {value.amount !== 0 && value.amount} {value.ingredient}{' '}
                                </Text>
                            </View>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faXmarkCircle} size={18} color="#65676b" />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default ItemNote;
