import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type Props = {
    value: number;
    updateDiet: (diet: string, index: number) => void;
};

const ListDiet: React.FC<Props> = ({ value, updateDiet }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => updateDiet('Vegan', value)}>
                <Text style={styles.text}>Vegan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => updateDiet('Keto', value)}>
                <Text style={styles.text}>Keto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => updateDiet('Low carb', value)}>
                <Text style={styles.text}>Low carb</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ListDiet;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1000,
        width: '98%',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        borderRadius: 10,
        top: 32,
        left: '4%',
    },
    item: {
        padding: 8,
        marginVertical: 4,
    },
    text: {
        fontFamily: 'Poly-Regular',
        textAlign: 'center',
        fontSize: 16,
    },
});
