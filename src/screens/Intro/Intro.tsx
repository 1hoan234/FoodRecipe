import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import IntroLayout from '../../layouts/Intro/Intro';
import Splash from '../../layouts/Splash/Splash';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Intro: React.FC<Navigation> = ({ navigation }) => {
    const [nextPage, setNextPage] = useState(false);

    if (!nextPage) {
        setTimeout(() => {
            setNextPage(true);
        }, 2000);
    }

    return nextPage ? <IntroLayout navigation={navigation} /> : <Splash />;
};

export default Intro;
