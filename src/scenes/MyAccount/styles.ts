import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   backgroundColor: Colors.green,
  //   height: 65 * scale,
  //   borderColor: 'transparent',
  //   paddingHorizontal: 10 * scale
  // },
  // headerLeft: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start'
  // },
  backIcon: {
    fontSize: 28 * scale,
    color: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    height: 65 * scale,
    borderColor: 'transparent',
    marginHorizontal: 10 * scale
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerText: {
    fontSize: 20 * scale,
    fontFamily: Fonts.regular,
    color: 'white',
    marginLeft: 10 * scale
  },
  contentView: {
    position: 'relative',
    flexGrow: 1
  },
  container: {
    paddingHorizontal: 20 * scale,
    marginTop: 10 * scale
  },
  mainView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    fontSize: 32 * scale,
    color: Colors.black,
    marginTop: 20 * scale,
    fontFamily: Fonts.regular
  },
  inputView: {
    marginHorizontal: 5 * scale,
    height: 40 * scale,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    fontFamily: Fonts.regular,
    fontSize: 16 * scale
  },
  signInDate: {
    fontSize: 13 * scale,
    color: Colors.black,
    marginTop: 10 * scale,
    fontFamily: Fonts.regular
  },
  basicView: {
    marginTop: 25 * scale,
    width: '100%'
  },
  basicTitle: {
    fontSize: 15 * scale,
    color: Colors.black,
    textTransform: 'uppercase',
    marginBottom: 10 * scale,
    fontFamily: Fonts.black
  },
  itemView: {
    paddingVertical: 5 * scale,
    marginHorizontal: 10 * scale,
    marginVertical: 5 * scale,
    borderWidth: 0,
    borderColor: 'transparent'
  },
  // itemView1: {
  //   paddingVertical: 5 * scale,
  //   marginHorizontal: 10 * scale,
  //   marginVertical: 5 * scale
  // },
  // itemIcon: {
  //   fontSize: 22 * scale,
  //   color: Colors.black
  // },
  itemText: {
    fontSize: 18 * scale,
    color: Colors.black
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: -5 * scale,
    fontSize: 20 * scale,
    color: Colors.grey
  },
  selectIcon: {
    fontSize: 20 * scale,
    color: Colors.black
  },
  // phoneInputView: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   borderBottomWidth: 1,
  //   marginHorizontal: 5 * scale,
  //   height: 40 * scale,
  //   flex: 1,
  //   borderBottomColor: Colors.grey,
  //   fontFamily: Fonts.regular,
  //   fontSize: 16 * scale
  // },
  // phontTextInputStyle: {
  //   padding: 0 * scale,
  //   backgroundColor: 'white',
  //   fontFamily: Fonts.regular
  // },
  saveButton: {
    marginVertical: 20 * scale,
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: Fonts.regular
  },
  subscriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7 * scale,
    marginHorizontal: 5 * scale,
    marginBottom: 20 * scale
  },
  subscriptionText: {
    fontSize: 16 * scale,
    color: Colors.black,
    fontFamily: Fonts.regular
  },
  switchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5 * scale,
    paddingLeft: 5 * scale
  },
  switchTitle: {
    fontSize: 16 * scale,
    color: Colors.black
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
  },
  cancelAccountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30 * scale,
    paddingTop: 20 * scale,
    paddingLeft: 5 * scale,
    borderTopColor: Colors.grey,
    borderTopWidth: 1
  },
  cancelAccountText: {
    fontFamily: Fonts.regular,
    fontSize: 16 * scale,
    color: Colors.black
  }
});

// export const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 17 * scale,
//     letterSpacing: scale,
//     borderColor: Colors.transparent,
//     backgroundColor: Colors.transparent,
//     color: Colors.black,
//     width: deviceWidth - 70 * scale,
//     height: 30 * scale,
//     fontFamily: Fonts.regular
//   },
//   inputAndroid: {
//     fontSize: 17 * scale,
//     letterSpacing: scale,
//     height: 45 * scale,
//     borderColor: Colors.transparent,
//     backgroundColor: Colors.transparent,
//     color: Colors.black,
//     paddingRight: 30 * scale,
//     width: deviceWidth - 70 * scale,
//     fontFamily: Fonts.regular
//   },
//   iconContainer: {
//     top: 2 * scale,
//     right: 0 * scale
//   }
// });
