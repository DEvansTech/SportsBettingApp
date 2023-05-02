import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    flex: 1
  },
  contentView: {
    position: 'relative',
    flexGrow: 1
  },
  container: {
    paddingHorizontal: 30 * scale,
    marginTop: 10 * scale
  },
  closeBtn: {
    position: 'absolute',
    top: 0 * scale,
    right: 20 * scale
  },
  closeIcon: {
    width: 33 * scale,
    height: 33 * scale,
    marginRight: 9 * scale,
    marginTop: 3 * scale
  },
  mainView: {
    marginTop: deviceHeight * 0.35,
    flex: 1
  },
  signTitle: {
    fontFamily: Fonts.regular,
    fontSize: 18 * scale,
    marginTop: 20 * scale,
    textAlign: 'center',
    color: 'white'
  },
  socialBtns: {
    marginTop: 25 * scale,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 60 * scale
  },
  socialIcon: {
    fontSize: 40 * scale,
    color: 'white'
  },
  emailBtn: {
    backgroundColor: Colors.black
  },
  footerText: {
    marginTop: deviceHeight * 0.25
  },
  blackLabel: {
    color: 'white',
    fontSize: 16 * scale,
    lineHeight: 20 * scale,
    textAlign: 'center',
    fontFamily: Fonts.regular
  },
  disclaimer: {
    color: 'white',
    fontSize: 16 * scale,
    lineHeight: 20 * scale,
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontStyle: 'italic'
  },
  buttonText: {
    color: 'white',
    fontSize: 17 * scale,
    fontFamily: Fonts.regular
  },
  italicLabel: {
    fontStyle: 'italic'
  },

  //////////EmailResgister////////
  backgroundImage: {
    flex: 1,
    justifyContent: 'center'
  },
  emailForm: {
    marginTop: 20 * scale
  },
  emailItem: {
    flex: 1,
    width: '100%',
    marginTop: 15 * scale,
    borderBottomColor: 'transparent',
    borderWidth: 0
  },
  emailFormTitle: {
    fontSize: 30 * scale,
    color: 'white',
    paddingVertical: 20 * scale,
    textAlign: 'center',
    fontFamily: Fonts.regular
  },
  input: {
    fontFamily: Fonts.regular,
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5 * scale,
    fontSize: 18 * scale,
    color: 'white',
    marginLeft: 5 * scale
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
  emailFormBtn: {
    marginTop: 20 * scale
  },
  emailHaveBtn: {
    backgroundColor: 'white',
    marginTop: 20 * scale,
    height: 45 * scale
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
  textFooter: {
    marginTop: 50 * scale
  },
  chevronIcon: {
    fontSize: 35 * scale,
    color: Colors.black
  }
});
