import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useFonts } from 'expo-font';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import AddComponent from '../../components/Add/Add';

interface Props {
    numberPage: number;
    largeText: string;
    smallText: string;
    video: any;
    nextPage: () => void;
    navigation: any;
    handleCancel: () => void;
}

const Intro2: React.FC<Props> = ({ numberPage, largeText, smallText, video, nextPage, navigation, handleCancel }) => {
    const player = useVideoPlayer(video, (player) => {
        player.loop = true;
        player.play();
        player.volume = 0;
    });
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    const handleToHome = () => {
        navigation.navigate('Home', { user: null, prevAddress: null });
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.ctnIntro}>
                <VideoView style={styles.backgroundVideo} player={player} nativeControls={false} />

                <TouchableOpacity style={styles.ctnSkip} onPress={handleCancel}>
                    <Text style={styles.textSkip}>Skip</Text>
                </TouchableOpacity>

                <View style={styles.title}>
                    <Text style={styles.appName}>kitchen stories</Text>
                </View>

                <View style={[styles.content, { bottom: 100 }]}>
                    <Text style={styles.textWelcome}>{largeText}</Text>

                    <Text style={styles.text}>{smallText}</Text>
                </View>

                <View style={styles.footer}>
                    <View style={styles.paging}>
                        {[1, 2, 3].map((value, key) =>
                            value === numberPage ? (
                                <View style={styles.isActive} key={key}></View>
                            ) : (
                                <FontAwesomeIcon icon={faCircle} size={8} color="#fff" key={key} />
                            ),
                        )}
                    </View>

                    <TouchableOpacity onPress={numberPage === 3 ? () => handleToHome() : nextPage}>
                        <Text style={styles.textButtonNext}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <AddComponent />
        </View>
    );
};

export default Intro2;
