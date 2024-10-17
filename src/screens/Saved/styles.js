import { StyleSheet, Dimensions } from "react-native";
const numColumns = 2; // Số cột là 2
const { width } = Dimensions.get('window');
const itemWidth = width / numColumns - 20; // Tính chiều rộng của mỗi item (giảm 20px cho khoảng cách giữa các item)
const styles = StyleSheet.create({
    container: {
        
        paddingRight: 14,
        paddingTop: 20,
        // backgroundColor:'#333',
      },
      item: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingBottom: 0,
        fontWeight: 400,
        marginVertical: 0,
        marginBottom: 10,
      },
      text: {
        fontFamily: 'Poly-Regular',
        paddingBottom: 0,
        marginTop: 5,
      },
      image: {
        width: itemWidth,
        height: itemWidth,
        resizeMode: 'cover',
        borderRadius: 8,
      },
      deleteIcon: {
        marginTop: 5,
      }
});

export default styles;
