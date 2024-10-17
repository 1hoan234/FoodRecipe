import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalElement: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'column',
    },
    ctnImage: {
        width: '100%',
        height: 420,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ctnNote: {
        position: 'absolute',
        bottom: 76,
        right: 16,
        zIndex: 100,
    },
    ctnIcon: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: '#737070',
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
    },
    marginTop: {
        marginTop: 160,
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#fff',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    ctnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 6,
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
        fontSize: 17,
        marginLeft: 4,
        width: '100%',
    },
    ctnSuggest: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    suggest: {
        width: '100%',
        height: 180,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#fdf6eb',
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    headerSuggest: {
        fontFamily: 'Poly-Regular',
        fontSize: 20,
        marginBottom: 16,
    },
    textSuggest: {
        fontFamily: 'Poly-Regular',
        fontSize: 26,
        lineHeight: 32,
    },
    infoAuthor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    author: {},
    iconHeart: {
        marginRight: 12,
        color: '#747678',
    },
    content: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        width: '100%',
        paddingBottom: 140,
        paddingTop: 40,
    },
    ctnCategory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctnHeart: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        backgroundColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
    },
    textHeader: {
        fontFamily: 'Poly-Regular',
        fontSize: 22,
    },
    btnSeeAll: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 16,
        alignItems: 'center',
    },
    textAll: {
        color: '#da7e4f',
        fontSize: 18,
        fontFamily: 'Poly-Regular',
        marginRight: 4,
    },
    itemRecipe: {
        width: 240,
    },
    imgRecipe: {
        width: '100%',
        height: 300,
        borderRadius: 18,
    },
    nameRecipe: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        marginVertical: 16,
    },
    ctnChef: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgChef: {
        width: 28,
        height: 28,
        borderRadius: 50,
        marginRight: 12,
        borderColor: '#ccc',
        borderWidth: 0.2,
    },
    nameChef: {
        fontFamily: 'Poly-Regular',
        color: '#da7e4f',
        fontSize: 17,
    },
    ctnRecipeSelect: {
        backgroundColor: '#fdf6eb',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 24,
        borderRadius: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    imgMess: {
        width: 100,
        height: 100,
    },
    textInconsolata: {
        fontFamily: 'Poly-Regular',
        lineHeight: 22,
        fontSize: 16,
        marginTop: 8,
        color: '#575450',
    },
    btnGetStart: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#2c5d48',
        marginTop: 12,
        width: 220,
        borderRadius: 24,
    },
    textGetStart: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});

export default styles;