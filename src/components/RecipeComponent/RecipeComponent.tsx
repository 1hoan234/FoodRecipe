import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';

import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import OptionRecipe from '../OptionRecipe/OptionRecipe';
import Notice from '../NoticeForm/NoticeForm';

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

type Props = {
    plan: DayPlan;
    navigation: any;
    updatePlan: (recipe: string, index: number, type: string) => void;
};
const RecipeComponent: React.FC<Props> = ({ plan, navigation, updatePlan }) => {
    const [showOptions, setShowOptions] = useState<boolean[]>(
        new Array(plan.dinner.length + plan.lunch.length).fill(false),
    );
    const [showNotice, setShowNotice] = useState<boolean>(false);
    const [textNotice, setTextNotice] = useState<string>('');
    const [typeNotice, setTypeNotice] = useState<string>('');

    const handlePress = (index: number) => {
        let newShowOptions = new Array(plan.dinner.length + plan.lunch.length).fill(false);
        newShowOptions[index] = true;
        setShowOptions(newShowOptions);
    };

    const handleClose = () => {
        setShowOptions(new Array(plan.dinner.length + plan.lunch.length).fill(false));
    };

    const handleShowNotice = (text: string, type: string) => {
        setTextNotice(text);
        setTypeNotice(type);
        setShowNotice(true);
    };

    if (showNotice) {
        setTimeout(() => {
            setShowNotice(false);
        }, 1000);
    };

    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={showNotice}>
                <Notice text={textNotice} type={typeNotice} />
            </Modal>
            <Text style={styles.category}>Lunch</Text>
            {plan.lunch.map((dish: Dish, index: number) => (
                <View key={index}>
                    {showOptions[index] && 
                    <OptionRecipe 
                        close={handleClose} _id={dish._id} 
                        showNotice = {(text:string, type: string) => handleShowNotice(text, type)}
                        type = 'lunch'
                        index = {index}
                        day = {plan.day}
                        updatePlan = {updatePlan}
                    />}
                    <TouchableOpacity
                        style={styles.ctnItem}
                        onPress={() => navigation.navigate('Recipe', { _id: dish._id })}
                    >
                        <View style={styles.itemLeft}>
                            <Image src={dish.image} style={styles.imageDish} />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Text style={styles.textDish} numberOfLines={1}>
                                    {dish.title}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faClock} color="#da7e4f" />
                                    <Text style={styles.timeCook}>{dish.time_cook}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.itemRight}>
                            <TouchableOpacity onPress={() => handlePress(index)} style = {{padding: 4, marginRight: -4, marginTop: -4}}>
                                <FontAwesomeIcon icon={faEllipsisH} color="#65676b" />
                            </TouchableOpacity>
                            <Text style={styles.labelDish}>{dish.label !== 'General' && dish.label}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
            <Text style={styles.category}>Dinner</Text>
            {plan.dinner.map((dish: Dish, index: number) => (
                <View key={index}>
                    {showOptions[index + plan.lunch.length] && 
                        <OptionRecipe 
                            close={handleClose} _id={dish._id} 
                            showNotice = {(text:string, type: string) => handleShowNotice(text, type)}
                            type = 'dinner'
                            index = {index}
                            day = {plan.day}
                            updatePlan = {updatePlan}
                        />
                    }
                    <TouchableOpacity
                        style={styles.ctnItem}
                        onPress={() => navigation.navigate('Recipe', { _id: dish._id })}
                    >
                        <View style={styles.itemLeft}>
                            <Image src={dish.image} style={styles.imageDish} />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Text style={styles.textDish} numberOfLines={1}>
                                    {dish.title}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faClock} color="#da7e4f" />
                                    <Text style={styles.timeCook}>{dish.time_cook}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.itemRight}>
                            <TouchableOpacity onPress={() => handlePress(index + plan.lunch.length)} style = {{padding: 4, marginRight: -4, marginTop: -4}}>
                                <FontAwesomeIcon icon={faEllipsisH} color="#65676b" />
                            </TouchableOpacity>
                            <Text style={styles.labelDish}>{dish.label !== 'General' && dish.label}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default RecipeComponent;
