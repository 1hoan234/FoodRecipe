import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, faClock, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import RecipeComponent from '../RecipeComponent/RecipeComponent';

interface RecipeDay {
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
    data: RecipeDay[];
    navigation: any;
};

const RecipeWeek: React.FC<Props> = ({ data, navigation }) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [showRecipeWeek, setShowRecipeWeek] = useState<boolean[]>([false, false, false, false, false, false, false]);

    const handleShowRecipe = (index: number) => {
        const newShowRecipeWeek = [...showRecipeWeek];
        newShowRecipeWeek[index] = !newShowRecipeWeek[index];
        setShowRecipeWeek(newShowRecipeWeek);
    };

    return (
        <View style={{ marginTop: -8 }}>
            {data.map((item: RecipeDay, index: number) => (
                <View key={index} style={styles.ctnItem}>
                    <View style={styles.header}>
                        <Text style={styles.textDay}>{days[index]}</Text>
                        <TouchableOpacity style={styles.btnShowDown} onPress={() => handleShowRecipe(index)}>
                            <Text style={styles.textTotalRecipes}>{item.lunch.length + item.dinner.length}</Text>
                            <FontAwesomeIcon
                                icon={showRecipeWeek[index] ? faChevronUp : faChevronDown}
                                size={12}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {showRecipeWeek[index] && (
                        <RecipeComponent plan={item} navigation={navigation} />
                    )}
                </View>
            ))}
        </View>
    );
};

export default RecipeWeek;
