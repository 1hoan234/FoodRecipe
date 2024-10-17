import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    ctnCard: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 80,
    },
    itemRecipe: {
        width: '44%',
        marginHorizontal: 10,
        position: 'relative',
        // height: 320
        marginBottom: 24,
    },
    imgRecipe: {
        width: '100%',
        height: 220,
        borderRadius: 18,
    },
    nameRecipe: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        marginVertical: 16,
    },
    buttonBack: {
        padding: 8,
        marginLeft: -8,
    },
    textCategory: {
        fontSize: 20,
        fontFamily: 'Poly-Regular',
        fontWeight: 'bold',
    },
    ctnHeart: {
        position: 'absolute',
        top: 180,
        right: 10,
        backgroundColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
    },
    textHeart: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        marginLeft: 8,
    },
    ctnType: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ceec9c',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
    },
    textType: {
        fontFamily: 'Poly-Regular',
        fontSize: 14,
    },
    noData: {
        fontSize: 20,
        fontFamily: 'Poly-Regular',
        textAlign: 'center',
    },
});

export default styles;
