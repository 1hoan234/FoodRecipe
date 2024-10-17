import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faWineGlassEmpty,
    faIceCream,
    faCookie,
    faLeaf,
    faCarrot,
    faWheatAwn,
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles';

type Props = {
    filedState: any;
    closeModal: () => void;
    filter: (item: Filter, filedState: any) => void;
};

interface Filter {
    Category: string[];
    Diet: string[];
    Country: string[];
    Ingredients: string[];
}

const FilterDish: React.FC<Props> = ({ filedState, closeModal, filter }) => {
    const fontLoaded = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    const categories = [
        { label: 'Drinks', value: 'Drink', icon: faWineGlassEmpty },
        { label: 'Dessert', value: 'Dessert', icon: faCookie },
        { label: 'Ice', value: 'Ice', icon: faIceCream },
    ];

    const diets = [
        { label: 'Low carb', value: 'Low carb', icon: faWheatAwn },
        { label: 'Vegan', value: 'Vegan', icon: faCarrot },
        { label: 'Vegetarian', value: 'Vegetarian', icon: faLeaf },
    ];

    const countries = [
        { label: 'Asian', value: 'Asian' },
        { label: 'American', value: 'American' },
        { label: 'Chinese', value: 'Chinese' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Europe', value: 'Europe' },
    ];

    const ingredients = [
        { label: 'Chicken', value: 'Chicken' },
        { label: 'Fish', value: 'Fish' },
        { label: 'Pasta', value: 'Pasta' },
        { label: 'Rice', value: 'Rice' },
        { label: 'Potato', value: 'Potato' },
        { label: 'Egg', value: 'Eggs' },
        { label: 'Tomato', value: 'Tomatoes' },
    ];

    const [filterState, setFilterState] = useState<any>(filedState);

    const [itemFilter, setItemFilter] = useState<Filter>({
        Category: [],
        Diet: [],
        Country: [],
        Ingredients: [],
    });

    if (!fontLoaded) {
        return null;
    }

    const handleSelect = (type: keyof Filter, index: number, value: string, typeFilter: string) => {
        const updatedList = [...filterState[typeFilter]];
        updatedList[index] = !updatedList[index];

        const updatedFilter = { ...itemFilter };
        if (updatedList[index]) {
            updatedFilter[type].push(value);
        } else {
            updatedFilter[type] = updatedFilter[type].splice(updatedFilter[type].indexOf(value), 1);
        }

        setFilterState({ ...filterState, [typeFilter]: updatedList });
        setItemFilter(updatedFilter);
    };

    const handleClick = (categoryIndex: number) => {
        let temp = [...filterState.indexCategory];
        temp[categoryIndex] = !temp[categoryIndex];
        setFilterState({ ...filterState, indexCategory: temp });
    };

    const handleTouchResults = () => {
        filter(itemFilter, filterState);
        closeModal();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={closeModal} style={styles.btnCancel}>
                    <Text style={styles.textBtn}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.txtFilter}>Filter</Text>
                <TouchableOpacity style={styles.btnShoow} onPress={handleTouchResults}>
                    <Text style={styles.textBtn}>Show results</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} scrollEventThrottle={16}>
                <View style={styles.body}>
                    <View style={styles.ctnItem}>
                        <TouchableOpacity style={styles.btnFilter} onPress={() => handleClick(0)}>
                            <Text style={styles.txtCategory}>Category</Text>
                            <FontAwesomeIcon
                                icon={filterState.indexCategory[0] ? faChevronUp : faChevronDown}
                                color="#DA7E4F"
                            />
                        </TouchableOpacity>

                        {filterState.indexCategory[0] && (
                            <View style={styles.ctnCategory}>
                                {categories.map((cat, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={filterState.itemCategory[index] ? styles.btnActive : styles.btnCategory}
                                        onPress={() => handleSelect('Category', index, cat.value, 'itemCategory')}
                                    >
                                        <FontAwesomeIcon
                                            icon={cat.icon}
                                            size={18}
                                            color={filterState.itemCategory[index] ? '#fc642d' : '#000'}
                                        />
                                        <Text
                                            style={
                                                filterState.itemCategory[index]
                                                    ? styles.textActive
                                                    : styles.itemCategory
                                            }
                                        >
                                            {cat.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.ctnItem}>
                        <TouchableOpacity style={styles.btnFilter} onPress={() => handleClick(1)}>
                            <Text style={styles.txtCategory}>Diet</Text>
                            <FontAwesomeIcon
                                icon={filterState.indexCategory[1] ? faChevronUp : faChevronDown}
                                color="#DA7E4F"
                            />
                        </TouchableOpacity>

                        {filterState.indexCategory[1] && (
                            <View style={styles.ctnCategory}>
                                {diets.map((diet, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={filterState.itemDiet[index] ? styles.btnActive : styles.btnCategory}
                                        onPress={() => handleSelect('Diet', index, diet.value, 'itemDiet')}
                                    >
                                        <FontAwesomeIcon
                                            icon={diet.icon}
                                            size={18}
                                            color={filterState.itemDiet[index] ? '#fc642d' : '#000'}
                                        />
                                        <Text
                                            style={
                                                filterState.itemDiet[index] ? styles.textActive : styles.itemCategory
                                            }
                                        >
                                            {diet.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.ctnItem}>
                        <TouchableOpacity style={styles.btnFilter} onPress={() => handleClick(2)}>
                            <Text style={styles.txtCategory}>Country</Text>
                            <FontAwesomeIcon
                                icon={filterState.indexCategory[2] ? faChevronUp : faChevronDown}
                                color="#DA7E4F"
                            />
                        </TouchableOpacity>

                        {filterState.indexCategory[2] && (
                            <View style={styles.ctnListCountry}>
                                {countries.map((country, index) => (
                                    <View key={index} style={styles.itemCountry}>
                                        <Text style={styles.txtCountry}>{country.label}</Text>
                                        <Checkbox
                                            style={styles.checkbox}
                                            value={filterState.listCountry[index]}
                                            color={filterState.listCountry[index] ? '#16a085' : undefined}
                                            onValueChange={() =>
                                                handleSelect('Country', index, country.value, 'listCountry')
                                            }
                                        />
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.ctnItem}>
                        <TouchableOpacity style={styles.btnFilter} onPress={() => handleClick(3)}>
                            <Text style={styles.txtCategory}>Ingredients</Text>
                            <FontAwesomeIcon
                                icon={filterState.indexCategory[3] ? faChevronUp : faChevronDown}
                                color="#DA7E4F"
                            />
                        </TouchableOpacity>

                        {filterState.indexCategory[3] && (
                            <View style={styles.ctnListCountry}>
                                {ingredients.map((ingredient, index) => (
                                    <View key={index} style={styles.itemCountry}>
                                        <Text style={styles.txtCountry}>{ingredient.label}</Text>
                                        <Checkbox
                                            style={styles.checkbox}
                                            value={filterState.listIngredient[index]}
                                            color={filterState.listIngredient[index] ? '#16a085' : undefined}
                                            onValueChange={() =>
                                                handleSelect('Ingredients', index, ingredient.value, 'listIngredient')
                                            }
                                        />
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default FilterDish;
