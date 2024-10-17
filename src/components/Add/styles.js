import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    ctnAdd: {
        height: Dimensions.get('window').height * 0.28,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    ctnContentAdd: {
        flexDirection: 'row',
        alignContent: 'center',
        position: 'absolute',
        top: 12,
        left: 12,
    },
    imgAdd: {
        width: 20,
        height: 20,
    },
    ctnTextAdd: {
        marginTop: 12,
    },
    textAdd: {
        fontFamily: 'Poly-Regular',
        fontSize: 14,
    },
    imgLogoAdd: {
        width: 120,
        height: 68,
    },
    btnInstall: {
        backgroundColor: '#458e6e',
        width: 200,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginBottom: 12,
    },
    textButtonInstall: {
        fontFamily: 'Poly-Regular',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
