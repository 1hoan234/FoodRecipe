import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ctnItem: {
        paddingVertical: 16,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    textDay: {
        fontFamily: 'Poly-Regular',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3d9793',
    },
    category: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#65676b',
    },
    btnShowDown: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 12,
        flexDirection: 'row',
        backgroundColor: '#3d9793',
        alignItems: 'center',
    },
    textTotalRecipes: {
        fontFamily: 'Poly-Regular',
        fontSize: 17,
        color: '#fff',
        marginRight: 4,
    },
    ctnItemDish: {
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
