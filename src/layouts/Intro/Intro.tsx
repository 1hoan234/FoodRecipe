import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useFonts } from 'expo-font';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import AddComponent from '../../components/Add/Add';
import Intro2 from './Intro2';
import styles from './styles';

const video1 =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/videoIntro%2Fvideo1.mp4?alt=media&token=cadd3d5d-616b-41b6-8e82-1c231086fcbf';
const video2 =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/videoIntro%2Fvideo2.mp4?alt=media&token=ab41db80-d47c-45d0-8d51-79a4cca360c9';
const video3 =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/videoIntro%2Fvideo3.mp4?alt=media&token=5ecb18d1-c536-4d4e-9afe-208820fa9094';
const video4 =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/videoIntro%2Fvideo4.mp4?alt=media&token=81a134e8-e3b2-4ea6-aa0b-02c61c68212b';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Intro: React.FC<Navigation> = ({ navigation }) => {
    const player = useVideoPlayer(video1, (player) => {
        player.loop = true;
        player.play();
        player.volume = 0;
    });
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    const videos = [video2, video3, video4];

    const largeTexts = ['Get inspired', 'Family connection', 'Skill training'];

    const smallTexts = [
        'discover delicious recipes, cooking tips and tricks',
        'share kitchen stories together',
        'with new and exciting recipes',
    ];

    const nextPage = () => {
        setIndex(index + 1);
    };

    const handleClick = () => {
        setShow(true);
    };

    const handleCancel = () => {
        navigation.navigate('Home', { user: null, prevAddress: null });
    };

    const handleNextLayout = () => {
        navigation.navigate('Home', { user: null, prevAddress: null });
    };

    if (!fontLoaded) {
        return null;
    }

    return !show ? (
        <View style={styles.container}>
            <View style={styles.ctnIntro}>
                <VideoView style={styles.backgroundVideo} player={player} nativeControls={false} />

                <View style={styles.title}>
                    <Text style={styles.appName}>kitchen stories</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.textWelcome}>Welcome</Text>

                    <TouchableOpacity style={styles.ctnButton} onPress={handleClick}>
                        <Text style={styles.textButton}>I start cook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ctnButton} onPress={handleNextLayout}>
                        <Text style={styles.textButton}>I used to cook</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <AddComponent />
        </View>
    ) : (
        <Intro2
            largeText={largeTexts[index]}
            smallText={smallTexts[index]}
            video={videos[index]}
            numberPage={index + 1}
            nextPage={nextPage}
            navigation={navigation}
            handleCancel={handleCancel}
        />
    );
};

export default Intro;
