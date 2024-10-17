import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        bottom: 0,
        position: 'absolute',
        zIndex: 10,
        height: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    title: {
        fontFamily: 'Poly-Regular',
        fontSize: 22,
    },
    btnXMark: {
        padding: 10,
        marginRight: -10,
    },
    body: {
        marginTop: 32,
    },
    ctnImage: {
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    textField: {
        fontFamily: 'Poly-Regular',
        fontSize: 18,
        color: '#65676b',
        textAlign: 'center',
    },
    btnAdd: {
        width: 200,
        height: 40,
        backgroundColor: '#449b97',
        borderRadius: 20,
        marginTop: 20,
    },
    textBtnAdd: {
        fontFamily: 'Poly-Regular',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 40,
        color: '#fff',
    },
});

export default styles;
