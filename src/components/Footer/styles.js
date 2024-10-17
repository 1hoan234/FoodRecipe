import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 50,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        borderTopColor: '#CCCCCC',
        borderTopWidth: 1,
    },
    item: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Poly-Regular',
        color: '#747678',
        marginTop: 4,
    },
    textClick: {
        fontFamily: 'Poly-Regular',
        color: '#da7e4f',
        marginTop: 4,
    },
});

export default styles;
