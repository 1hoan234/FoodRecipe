import React from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import styles from './styles';

const Splash: React.FC = () => {
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>kitchen stories</Text>
            <Text style={styles.slogan}>any one can cook</Text>
        </View>
    );
};

export default Splash;
