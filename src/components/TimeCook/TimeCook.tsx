import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    time: string;
};

const TimeCook: React.FC<Props> = ({ time }) => {
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff5c6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 14,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 100,
    },
    text: {
        fontFamily: 'Poly-Regular',
        fontSize: 13,
        color: '#000',
    },
});

export default TimeCook;
