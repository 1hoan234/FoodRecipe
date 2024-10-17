import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        width: '100%',
        height: '100%',
        marginTop: 36,
        paddingHorizontal: 16,
    },
    searchLabel: {
        fontSize: 24,
        fontFamily: 'Poly-Regular',
        fontWeight: 'bold',
        marginRight: 24,
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#fff',
        width: '100%',
        marginBottom: 12,
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
        fontSize: 16,
        marginLeft: 4,
        width: '100%',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#ffe',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 8,
        marginVertical: 8,
        marginRight: 10,
        color: '#000',
        position: 'relative',
    },
    buttonBack: {
        padding: 8,
        marginLeft: -8,
    },
    selectSearch: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 36,
    },
    selectSearchChild: {
        // aspectRatio: 1,
        width: Dimensions.get('window').width / 3 - 16,
        backgroundColor: '#fdf6eb',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    selectSearchChildImg: {
        height: 60,
        width: '100%',
    },
    selectSearchChildTxt: {
        marginTop: 16,
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        color: '#565454',
    },
    textCategory: {
        marginBottom: 12,
        fontSize: 24,
        fontFamily: 'Poly-Regular',
        fontWeight: 'bold',
    },
    ctnAllRecipes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },
    textAllRecipes: {
        fontFamily: 'Poly-Regular',
        fontSize: 17,
        color: '#747070',
    },
});

export default styles;