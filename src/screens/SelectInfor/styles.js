import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        bottom: 0,
        position: 'absolute',
        zIndex: 10,
        height: '85%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Poly-Regular',
        fontSize: 22,
    },
    skipButton: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        color: '#7B7B7B',
    },
    content: {
        height: '80%',
        marginTop: 28,
    },
    subTitle: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        color: '#000',
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkedCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    checkboxText: {
        fontFamily: 'Poly-Regular',
    },
    inputElement: {
        fontFamily: 'Poly-Regular',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        fontSize: 17,
        width: 120,
    },
    footer: {
        position: 'absolute',
        bottom: 32,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBack: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#f0eeed',
        marginRight: 12,
        borderRadius: 20,
        width: 120,
        marginRight: 12,
    },
    textError: {
        marginTop: 12,
        color: '#E53E3E',
        fontSize: 12,
        fontFamily: 'Poly-Regular',
    },
    textBack: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    btnNext: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#458e6e',
        borderRadius: 20,
        width: 120,
        marginLeft: 12,
    },
    textNext: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});

export default styles;
