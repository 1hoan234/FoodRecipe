import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ctnItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    category: {
        fontFamily: 'Poly-Regular',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    itemLeft: {
        flexDirection: 'row',
        width: '60%',
    },
    imageDish: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    textDish: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 8,
    },
    timeCook: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        color: '#65676b',
        marginLeft: 4,
    },
    labelDish: {
        fontFamily: 'Poly-Regular',
        fontSize: 14,
        color: '#65676b',
        fontWeight: 'bold',
        color: '#458e6e',
    },
    itemRight: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
});

export default styles;
