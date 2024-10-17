import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import ListDiet from './Diet';

type Props = {
    itemProp: boolean[];
    dietProp: string[];
    quantityProp: number[];
    showErrorProp: boolean;
    updateComponentDiet: (item: boolean[], diets: string[], quantity: number[], showError: boolean) => void;
};

const ComponentDiet: React.FC<Props> = ({ itemProp, dietProp, quantityProp, showErrorProp, updateComponentDiet }) => {
    const [fontsLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });
    const [item, setItem] = useState<boolean[]>(itemProp);
    const [diets, setDiets] = useState<string[]>(dietProp);
    const [quantity, setQuantity] = useState<number[]>(quantityProp);
    const [showError, setShowError] = useState<boolean>(showErrorProp);

    const updateItem = (index: number) => {
        const newItem = [...item];
        newItem[index] = !newItem[index];
        setItem(newItem);
        updateComponentDiet(newItem, diets, quantity, showError);
    };

    const updateDiets = (diet: string, index: number) => {
        if (diets.includes(diet) && diets.indexOf(diet) !== index) {
            setShowError(true);
            updateComponentDiet(item, diets, quantity, true);
        } else {
            const newDiets = [...diets];
            newDiets[index] = diet;
            const newIem = [...item];
            newIem[index] = false;
            setItem(newIem);
            setDiets(newDiets);
            setShowError(false);
            updateComponentDiet(newIem, newDiets, quantity, false);
        }
    };

    const updateQuantity = (index: number, type: string) => {
        const newQuantity = [...quantity];
        const total = quantity.reduce((total, q) => total + q, 0);

        if (type === 'plus') {
            if (total < 5) {
                newQuantity[index] += 1;
                if (newQuantity[index] < 2 && diets[index] && item.length < 3) {
                    setQuantity([...newQuantity, 0]);
                    setDiets([...diets, '']);
                    setItem([...item, false]);
                    updateComponentDiet([...item, false], [...diets, ''], [...newQuantity, 0], showError);
                } else {
                    setQuantity(newQuantity);
                    updateComponentDiet(item, diets, newQuantity, showError);
                }
            }
        } else if (type === 'sub' && newQuantity[index] > 0) {
            newQuantity[index] -= 1;
            setQuantity(newQuantity);
            updateComponentDiet(item, diets, newQuantity, showError);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {showError && <Text style={styles.textError}>Diet cannot be duplicated!</Text>}
            <View style={styles.header}>
                <View style={styles.itemLeft}>
                    <Text style={styles.textTitle}>Diet</Text>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.textTitle}>Member</Text>
                </View>
            </View>
            <View>
                {item.map((value, index: number) => (
                    <View style={styles.item} key={index}>
                        <View style={styles.itemSelect}>
                            <TouchableOpacity style={styles.btnSelect} onPress={() => updateItem(index)}>
                                <Text style={{ fontFamily: 'Poly-Regular', fontSize: 16 }}>
                                    {diets[index] ? diets[index] : 'Select diet'}
                                </Text>
                                <FontAwesomeIcon icon={faChevronDown} size={14} />
                            </TouchableOpacity>
                            {item[index] && <ListDiet updateDiet={updateDiets} value={index} />}
                        </View>

                        <View style={styles.itemAdjust}>
                            <TouchableOpacity
                                onPress={() => updateQuantity(index, 'sub')}
                                style={{ paddingHorizontal: 2 }}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </TouchableOpacity>
                            <Text style={styles.textQuantity}>{quantity[index]}</Text>
                            <TouchableOpacity
                                onPress={() => updateQuantity(index, 'plus')}
                                style={{ paddingHorizontal: 2 }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ComponentDiet;
