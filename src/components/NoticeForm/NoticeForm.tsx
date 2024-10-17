import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    type: string;
    text: string;
}

const Notice: React.FC<Props> = ({ type, text }) => {
    const [fontLoaded] = useFonts({
        'Poly-Regular': require('../../../assets/fonts/Poly-Regular.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.ctnNotice}>
            <View
                style={
                    type === 'error'
                        ? styles.noticeError
                        : type === 'warn'
                          ? styles.noticeWarning
                          : styles.noticeSuccess
                }
            >
                <Text
                    style={
                        type === 'error' ? styles.textNotice : type === 'warn' ? styles.textNotice : styles.textNotice
                    }
                >
                    {text}
                </Text>
            </View>
        </View>
    );
};

export default Notice;

const styles = StyleSheet.create({
    ctnNotice: {
        position: 'absolute',
        top: 20,
        width: '100%',
        zIndex: 1000,
        padding: 16,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    noticeError: {
        backgroundColor: '#f66358',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 8,
    },
    noticeWarning: {
        backgroundColor: '#ffc12b',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 8,
    },
    noticeSuccess: {
        backgroundColor: '#145f48',
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: '100%',
        borderRadius: 8,
    },
    textNotice: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poly-Regular',
    },
});
