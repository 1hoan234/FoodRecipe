import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping, faRepeat, faRotate, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import addShoppingList from '../../helper/addShoppingList';
import removeRecipe from '../../helper/changeMealPlanner';
import repeatMealPlanner from '../../helper/repeatMealPlanner';

type Props = {
    close: () => void;
    _id: string;
    showNotice: (text: string, type: string) => void;
    type: 'lunch' | 'dinner';
    index: number;
    day: string;
    updatePlan: (recipe: string, index: number, type: string) => void;
};

const OptionRecipe: React.FC<Props> = ({ close, _id, showNotice, type, index, day, updatePlan}) => {

    const handleAddShoopingList = async () => {
        await addShoppingList(_id);
        close();
        showNotice('Add ingredient to shopping list successfully!', 'success');
    };

    const handleRemoveRecipe = async () => {
        await removeRecipe(_id, type, index);
        updatePlan(_id, index, type);
        close();
        // showNotice();
    };

    const handleRepeatNextWeek = async () => {
        const message = await repeatMealPlanner(_id, day, type);
        if (message === 'Suceessfully repeated recipe next week!') {
            close();
            showNotice('Recipe repeated next week!', 'success');
        }
        else {
            close();
            showNotice('Error repeating recipe next week!', 'error');
        }
    };

    return (
        <View>
            <View style={styles.option}>
                <View>
                    <TouchableOpacity style={styles.btnOptionDelete} onPress={handleRemoveRecipe}>
                        <FontAwesomeIcon icon={faXmarkCircle} size={18} color="#65676b" />
                        <Text style={styles.textBtnOption}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnOptionSend]} onPress={handleAddShoopingList}>
                        <FontAwesomeIcon icon={faCartShopping} size={18} color="#65676b" />
                        <Text style={styles.textBtnOption}>Add to shopping list</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnOptionSend, { marginVertical: 4 }]} onPress={handleRepeatNextWeek}>
                        <FontAwesomeIcon icon={faRotate} size={18} color="#65676b" />
                        <Text style={styles.textBtnOption}>Repeat next week</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnCancel} onPress={close}>
                        <FontAwesomeIcon icon={faXmark} size={18} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default OptionRecipe;
