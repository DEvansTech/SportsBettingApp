import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: Colors.grey
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center'
  },
  backgroundImageStyle: {
    opacity: 1
  },
  contentView: {
    position: 'relative',
    flexGrow: 1,
    paddingHorizontal: 30 * scale
  },
  closeBtn: {
    position: 'absolute',
    top: 10 * scale,
    right: 20 * scale,
    backgroundColor: Colors.whiteTransparent,
    height: 28 * scale,
    borderWidth: 0,
    zIndex: 1
  },
  closeBtnText: {
    color: 'white',
    fontSize: 13 * scale,
    fontFamily: Fonts.regular,
    textTransform: 'uppercase'
  },
  btnView: {
    marginBottom: Platform.OS === 'ios' ? 50 * scale : 70 * scale,
    justifyContent: 'flex-end',
    flex: 1
  }
});
