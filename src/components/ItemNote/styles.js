import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    itemDish: {
        width: '100%',
        marginBottom: 32,
        position: 'relative',
    },
    headerItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
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
        width: 160,
        padding: 4,
        position: 'absolute',
        zIndex: 100,
        right: 16,
        top: 20,
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
        marginTop: 12,
    },
    textBtnOption: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: 'bold',
    },
    ctnInforDish: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnCancel: {
        padding: 8,
    },
    imageDish: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    textDish: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        width: '70%',
        textAlign: 'left',
    },
    ctnServings: {
        padding: 8,
        paddingLeft: 16,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textServings: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        fontWeight: 'bold',
    },
    ctnIngredients: {
        paddingHorizontal: 16,
    },
    checkbox: {
        padding: 4,
    },
    itemIngredient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 28,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    textIngredient: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        marginLeft: 12,
        color: '#4a4a4a',
    },
});

export default styles;
