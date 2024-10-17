import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 28,
        flexDirection: 'column',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },
    header: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poly-Regular',
        textAlign: 'center',
    },
    itemLeft: {
        width: '50%',
        borderRightWidth: 1,
        borderColor: '#ccc',
        padding: 12,
    },
    itemRight: {
        width: '50%',
        padding: 12,
    },
    btnSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    itemSelect: {
        position: 'relative',
        width: '50%',
        borderRightWidth: 1,
        borderColor: '#ccc',
        padding: 12,
    },
    itemAdjust: {
        width: '50%',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textQuantity: {
        fontSize: 16,
        fontFamily: 'Poly-Regular',
    },
    textError: {
        position: 'absolute',
        top: -36,
        marginTop: 12,
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poly-Regular',
    },
});

export default styles;
