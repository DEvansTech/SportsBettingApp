import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  contentView: {
    position: 'relative',
    flexGrow: 1
  },
  content: {
    position: 'relative'
  },
  titleView: {
    backgroundColor: Colors.darkGrey,
    padding: 15 * scale
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 15 * scale,
    color: 'white'
  },
  boldTitle: {
    fontFamily: Fonts.black,
    fontSize: 15 * scale,
    color: 'white'
  },
  feedbackContent: {
    marginTop: 10 * scale,
    paddingHorizontal: 20 * scale
  },
  feedbackHeader: {
    paddingVertical: 15 * scale
  },
  toView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  subjectView: {
    marginTop: 10 * scale,
    flexDirection: 'row',
    alignItems: 'center'
  },
  subjectBoldText: {
    fontFamily: Fonts.black,
    fontSize: 12 * scale,
    color: Colors.black
  },
  subjectText: {
    fontFamily: Fonts.regular,
    fontSize: 12 * scale,
    color: Colors.black
  },
  sendIcon: {
    width: 34 * scale,
    height: 30 * scale
  },
  input: {
    fontFamily: Fonts.regular,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 0.5 * scale,
    fontSize: 16 * scale,
    color: Colors.black,
    height: 30 * scale
  },
  msgContent: {
    flex: 1
  },
  textArea: {
    fontFamily: Fonts.regular,
    fontSize: 16 * scale,
    paddingTop: 10 * scale,
    borderRadius: 10 * scale,
    backgroundColor: 'transparent'
  },
  sendActiveBtn: {
    backgroundColor: Colors.green,
    marginVertical: 20 * scale
  },
  sendDisBtn: {
    backgroundColor: Colors.grey,
    marginVertical: 20 * scale
  },
  sendBtnText: {
    fontSize: 18 * scale,
    fontFamily: Fonts.regular,
    color: 'white'
  },
  thanksView: {
    position: 'absolute',
    flex: 1,
    backgroundColor: Colors.greenTransparent,
    width: '100%',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 190 * scale : 150 * scale,
    alignItems: 'center',
    paddingHorizontal: 40 * scale,
    marginTop: Platform.OS === 'ios' ? 118 * scale : 60 * scale,
    zIndex: 2
  },
  loadingView: {
    position: 'absolute',
    backgroundColor: Colors.green,
    width: '100%',
    height: '90%',
    alignItems: 'center',
    paddingHorizontal: 40 * scale,
    marginTop: 107 * scale
  },
  checkImg: {
    width: 140 * scale,
    height: 140 * scale
  },
  thankText: {
    fontSize: 56 * scale,
    fontFamily: Fonts.light,
    color: 'white',
    marginTop: 15 * scale,
    textAlign: 'center'
  },
  messageText: {
    fontSize: 15 * scale,
    fontFamily: Fonts.light,
    marginTop: 15 * scale,
    textAlign: 'center',
    paddingHorizontal: 40 * scale,
    color: 'black'
  },
  sendBtnView: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 * scale : 0,
    left: 0 * scale,
    right: 0 * scale,
    paddingHorizontal: 40 * scale,
    backgroundColor: 'white'
  }
});

export { deviceHeight };
