import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  contentView: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    height: deviceHeight - 80 * scale
  },
  container: {
    paddingHorizontal: 30 * scale
  },
  closeBtn: {
    position: 'absolute',
    top: 20 * scale,
    right: 20 * scale
  },
  closeIcon: {
    fontSize: 35 * scale,
    color: 'white'
  },
  signTitle: {
    fontFamily: Fonts.regular,
    fontSize: 18 * scale,
    textAlign: 'center'
  },
  loginFormBtns: {
    marginTop: 30 * scale
  },
  loginBtn: {
    marginTop: 20 * scale,
    backgroundColor: Colors.black
  },
  loginFormNeedBtn: {
    marginTop: 20 * scale,
    backgroundColor: Colors.white
  },
  helpText: {
    fontSize: 15 * scale,
    textAlign: 'center',
    marginTop: 30 * scale,
    color: 'white',
    fontFamily: Fonts.regular
  },
  socialBtns: {
    marginTop: 25 * scale,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30 * scale
  },
  socialIcon: {
    fontSize: 40 * scale,
    color: 'white'
  },
  buttonWhiteText: {
    color: 'white',
    fontSize: 17 * scale,
    fontFamily: Fonts.regular
  },
  buttonBlackText: {
    color: Colors.black,
    fontSize: 17 * scale,
    fontFamily: Fonts.regular
  },
  spinnerTextStyle: {
    color: Colors.green
  }
});
