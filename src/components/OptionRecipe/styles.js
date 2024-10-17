import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 240,
        padding: 4,
        position: 'absolute',
        zIndex: 100,
        right: 8,
        top: 12,
        borderRadius: 8,
    },
    option2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 160,
        padding: 4,
        position: 'absolute',
        zIndex: 100,
        bottom: 52,
        right: 8,
        borderRadius: 8,
    },
    btnOptionDelete: {
        paddingVertical: 8,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    btnOptionSend: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingLeft: 10,
    },
    textBtnOption: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: 'bold',
    },
    btnCancel: {
        padding: 8,
    },
});

export default styles;
