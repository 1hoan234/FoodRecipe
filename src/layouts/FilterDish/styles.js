import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'Poly-Regular',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 24,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
    },
    btnCancel: {
        padding: 10,
        marginLeft: -10,
        width: '30%',
    },
    btnShoow: {
        padding: 10,
        marginRight: -10,
        width: '30%',
    },
    textBtn: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        color: '#fc642d',
    },
    txtFilter: {
        fontFamily: 'Poly-Regular',
        fontSize: 22,
        fontWeight: 'bold',
        width: '40%',
        textAlign: 'center',
    },
    body: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginTop: 68,
    },
    ctnItem: {
        marginBottom: 12,
    },
    btnFilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    txtCategory: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemCategory: {
        fontFamily: 'Poly-Regular',
        fontSize: 14,
        marginTop: 6,
    },
    ctnCategory: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    btnCategory: {
        width: '30%',
        height: 68,
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#fef0e4',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnActive: {
        width: '30%',
        height: 68,
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#fef0e4',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fc642d',
        borderWidth: 1,
    },
    textActive: {
        fontFamily: 'Poly-Regular',
        fontSize: 14,
        marginTop: 6,
        color: '#fc642d',
    },
    ctnListCountry: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 12,
    },
    itemCountry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 22,
    },
    txtCountry: {
        fontFamily: 'Poly-Regular',
        fontSize: 15,
    },
    checkbox: {
        padding: 4,
    },
});

export default styles;
