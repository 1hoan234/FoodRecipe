import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ctnIntro: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.72,
    },
    backgroundVideo: {
        position: 'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        position: 'absolute',
        top: 60,
        width: '100%',
    },
    ctnSkip: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    textSkip: {
        fontFamily: 'Poly-Regular',
        color: '#fff',
        fontSize: 18,
    },
    appName: {
        color: '#fff',
        fontSize: 28,
        fontFamily: 'Poly-Regular',
        textAlign: 'center',
    },
    content: {
        position: 'absolute',
        bottom: 32,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 12,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    paging: {
        width: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 28,
        marginBottom: 8,
    },
    textWelcome: {
        fontFamily: 'Poly-Regular',
        fontSize: 44,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
    },
    text: {
        fontFamily: 'Poly-Regular',
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        lineHeight: 22,
        paddingHorizontal: 26,
    },
    isActive: {
        width: 24,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FC7A01',
    },
    ctnButton: {
        backgroundColor: '#458e6e',
        width: '60%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginTop: 12,
    },
    textButton: {
        fontFamily: 'Poly-Regular',
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
    },
    textButtonNext: {
        fontFamily: 'Poly-Regular',
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
