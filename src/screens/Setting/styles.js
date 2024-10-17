import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poly-Regular',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 36,
    marrginBottom: 6,
    color: '#000000',
    paddingBottom: 6 ,
    height : 34,
  },
  content: {
    flexDirection: 'row',
    paddingLeft: 14,
    paddingBottom: 5,
    marginBottom: 10,
    marginTop : 11,
    
  },
  section: {
    marginBottom: 0,
    borderTopColor:'#CCCCCCC',
    borderTopWidth: 1,
    paddingLeft : 14,
    paddingBottom : 0,
  },
  sectionTitle: {
    fontFamily: 'Poly-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 10,
    paddingTop: 14,
    paddingLeft : 14,
  },
  item: {
    padding: 0,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 14,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemIcon: {
    marginLeft: 'auto',
    color: '#888',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: 375,
    height: 57,
    paddingLeft: 20,
    marginLeft: 0,
    justifyContent: 'space-between',
    // backgroundColor: '#333',
    // borderColor: '#333',
    // borderWidth: 1,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight : 0,
    // backgroundColor: '#333',
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#555',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poly-Regular',
    paddingLeft : 0,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 70,
    marginBottom: 0,
    // backgroundColor: '#555',
  },

  image : {
    height : 20,
    width : 20,
  },

  viewIntro: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    marginTop: 20,
  },

  textIntro: {
    fontFamily: 'Poly-Regular',
    fontSize: 18,
    
  },

  viewDetail: {
    marginHorizontal: 14,
    marginVertical: 20,   
  },

  textDetail: {
    fontSize: 14,
    fontFamily: 'Poly-Regular',
  },

  viewInfor: {
    marginVertical: 10,
    width: 150,
    justifyContent: 'center',
    alignItems : 'center',
    height: 100,
    fontWeight: 400,
  },

  textInfor: {
    fontFamily: 'Poly-Regular',
    fontSize: 18,
  }
});

export default styles;
