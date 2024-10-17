import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        paddingHorizontal: 16,
        zIndex: 100,
        width: '100%',
        top: 0,
        bottom: 0,
    },
    buttonBack: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginLeft: -8,
    },
    ctnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        fontFamily: 'Poly-Regular',
        borderColor: 'transparent',
        borderWidth: 0,
        paddingVertical: 8,
        paddingHorizontal: 8,
        fontSize: 18,
        marginLeft: 4,
        width: '100%',
    },
    box: {
        width: '100%',
        paddingTop: 40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    textNameDish: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        marginLeft: 12,
        width: 280,
        lineHeight: 22,
    },
    textNotFound: {
        fontFamily: 'Poly-Regular',
        fontSize: 24,
        textAlign: 'center',
    },
});

export default styles;
