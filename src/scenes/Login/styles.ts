import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center'
  },
  contentView: {
    position: 'relative',
    flex: 1
  },
  container: {
    paddingHorizontal: 30 * scale,
    marginTop: 10 * scale
  },
  closeBtn: {
    position: 'absolute',
    top: 10 * scale,
    right: 20 * scale
  },
  closeIcon: {
    width: 33 * scale,
    height: 33 * scale,
    marginRight: 9 * scale,
    marginTop: 3 * scale
  },
  signTitle: {
    fontFamily: Fonts.regular,
    fontSize: 18 * scale,
    marginTop: 20 * scale,
    textAlign: 'center',
    color: 'white'
  },
  loginForm: {
    marginTop: 40 * scale
  },
  loginFormTitle: {
    fontSize: 30 * scale,
    color: 'white',
    paddingVertical: 20 * scale,
    textAlign: 'center',
    fontFamily: Fonts.regular
  },
  loginItem: {
    marginTop: 20 * scale,
    borderBottomColor: 'transparent',
    borderWidth: 0
  },
  input: {
    color: 'white',
    fontFamily: Fonts.regular,
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5 * scale,
    fontSize: 18 * scale,
    marginLeft: 10 * scale
  },
  eyeIconView: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    top: 20 * scale
  },
  eyeIcon: {
    fontSize: 20 * scale,
    color: 'white'
  },
  loginFormBtn: {
    marginTop: 20 * scale
  },
  loginFormBtns: {
    marginTop: deviceHeight * 0.05
  },
  loginFormNeedBtn: {
    marginTop: 20 * scale,
    backgroundColor: Colors.white,
    height: 45 * scale
  },
  socialBtns: {
    marginTop: 10 * scale
  },
  buttonWhiteText: {
    color: 'white',
    fontSize: 17 * scale,
    fontFamily: Fonts.regular
  },
  buttonBlackText: {
    color: Colors.black,
    fontSize: 17 * scale,
    fontFamily: Fonts.regular,
    textTransform: 'capitalize'
  },
  spinnerTextStyle: {
    color: Colors.green
  }
});
