import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
const addLogo = require('../../../assets/images/StreamYard-Logo.jpg');
const addImage = require('../../../assets/images/ad.png');

const AddComponent: React.FC = () => {
    return (
        <View style={styles.ctnAdd}>
            <View style={styles.ctnContentAdd}>
                <Image source={addImage} style={styles.imgAdd} />
            </View>
            <View style={styles.ctnTextAdd}>
                <Text style={[styles.textAdd, { fontWeight: 'bold', fontSize: 20 }]}>
                    StreamYard is livestreaming studio
                </Text>
                <Text style={styles.textAdd}>The easiest way to create professional livestream.</Text>
                <Text style={styles.textAdd}>Get started today.</Text>
            </View>
            <View>
                <Image source={addLogo} style={styles.imgLogoAdd} />
            </View>
            <View>
                <TouchableOpacity style={styles.btnInstall}>
                    <Text style={styles.textButtonInstall}>INSTALL</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddComponent;
