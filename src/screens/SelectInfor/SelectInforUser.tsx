import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import styles from './styles';
import ComponentDiet from '../../components/ComponentDiet/ComponentDiet';
import { storeData, getData } from '../../helper/storageHelper';

type SelectInforUserProps = {
    closeModal: () => void;
    data: any;
    address: string;
};

const SelectInforUser: React.FC<SelectInforUserProps> = ({ closeModal, address, data }) => {
    const [areaSelected, setAreaSelected] = useState<string>(data.area);
    const [timeSelected, setTimeSelected] = useState<string>(data.time);
    const [numberPeople, setNumberPeople] = useState<number>(data.numberPeople);
    const [optionChoices, setOptionChoices] = useState<number>(data.optionChoices);
    const [item, setItem] = useState<boolean[]>([false]);
    const [diets, setDiets] = useState<string[]>(data.diets);
    const [quantity, setQuantity] = useState<number[]>(data.quantity);
    const [showError, setShowError] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [showWarning, setShowWarning] = useState<boolean[]>([false, false, false, false]);
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    const handleOnPressButton = (event: string) => {
        if (event === 'next') {
            if (index === 0 && areaSelected === '') {
                setShowWarning([true, false, false, false]);
                return;
            } else if (index === 1 && numberPeople === 0) {
                setShowWarning([false, true, false, false]);
                return;
            } else if (index === 2 && timeSelected === '') {
                setShowWarning([false, false, true, false]);
                return;
            }
            if (index < 3) {
                setIndex(index + 1);
                setShowWarning([false, false, false, false]);
            }
        } else {
            if (index > 0) {
                setIndex(index - 1);
            }
        }
    };

    const updateComponentDiet = (item: boolean[], diets: string[], quantity: number[], showError: boolean) => {
        setItem(item);
        setDiets(diets);
        setQuantity(quantity);
        setShowError(showError);
    };

    const handleSave = async () => {
        if (index === 3 && optionChoices === 0) {
            setShowWarning([false, false, false, true]);
            return;
        }
        const data = {
            area: areaSelected,
            time: timeSelected,
            numberPeople: numberPeople,
            optionChoices: optionChoices,
            diets: diets,
            quantity: quantity,
        };
        await storeData('userInfor', data);
        closeModal();
    };

    const areas = ['Asian', 'Europe', 'American', 'Mexican'];
    const timeOptions = ['Under 30 minutes', 'Under 1 hour', 'Over 1 hour'];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your family's food preferences</Text>
                <TouchableOpacity onPress={closeModal} style={{ padding: 4, marginRight: -4 }}>
                    <Text style={styles.skipButton}>{address === 'Home' ? 'Skip' : 'Close'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {index === 0 && (
                    <View>
                        <Text style={styles.subTitle}>Where are you from?</Text>
                        {areas.map((area, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.checkboxContainer}
                                onPress={() => {
                                    setAreaSelected(area);
                                    setShowWarning([false, false, false, false]);
                                }}
                            >
                                <View style={styles.circle}>
                                    {areaSelected === area && <View style={styles.checkedCircle} />}
                                </View>
                                <Text style={styles.checkboxText}>{area}</Text>
                            </TouchableOpacity>
                        ))}
                        {showWarning[0] && <Text style={styles.textError}>* Please choose</Text>}
                    </View>
                )}
                {index === 1 && (
                    <View>
                        <Text style={styles.subTitle}>How many people are there in your family??</Text>
                        <TextInput
                            value={numberPeople.toString()}
                            style={styles.inputElement}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setNumberPeople(Number(text));
                                if (text.length > 0) {
                                    setShowWarning([false, false, false, false]);
                                    Keyboard.dismiss();
                                }
                            }}
                        />
                        {showWarning[1] && <Text style={styles.textError}>* Please choose</Text>}
                    </View>
                )}
                {index === 2 && (
                    <View>
                        <Text style={styles.subTitle}>How much time do you spend cooking?</Text>
                        {timeOptions.map((time, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.checkboxContainer}
                                onPress={() => setTimeSelected(time)}
                            >
                                <View style={styles.circle}>
                                    {timeSelected === time && <View style={styles.checkedCircle} />}
                                </View>
                                <Text style={styles.checkboxText}>{time}</Text>
                            </TouchableOpacity>
                        ))}
                        {showWarning[2] && <Text style={styles.textError}>* Please choose</Text>}
                    </View>
                )}

                {index === 3 && (
                    <View>
                        <Text style={styles.subTitle}>Customize diet</Text>
                        {[1, 2].map((value, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.checkboxContainer}
                                onPress={() => setOptionChoices(value)}
                            >
                                <View style={styles.circle}>
                                    {optionChoices === value && <View style={styles.checkedCircle} />}
                                </View>
                                <Text style={styles.checkboxText}>{value === 1 ? 'No' : 'Yes'}</Text>
                            </TouchableOpacity>
                        ))}
                        {showWarning[3] && <Text style={styles.textError}>* Please choose</Text>}
                        {optionChoices === 2 && (
                            <ComponentDiet
                                itemProp={item}
                                dietProp={diets}
                                quantityProp={quantity}
                                showErrorProp={showError}
                                updateComponentDiet={updateComponentDiet}
                            />
                        )}
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                {index > 0 ? (
                    <TouchableOpacity style={styles.btnBack} onPress={() => handleOnPressButton('back')}>
                        <Text style={styles.textBack}>Back</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={[styles.btnBack, { backgroundColor: '#f5f5f5' }]}>
                        <Text style={[styles.textBack, { color: '#ccc' }]}>Back</Text>
                    </View>
                )}

                {index !== 3 ? (
                    <TouchableOpacity style={styles.btnNext} onPress={() => handleOnPressButton('next')}>
                        <Text style={styles.textNext}>Next</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.btnNext} onPress={handleSave}>
                        <Text style={styles.textNext}>Save</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default SelectInforUser;
