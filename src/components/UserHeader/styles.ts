import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.black,
    height: 60 * scale,
    width: deviceWidth,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    fontSize: 33 * scale,
    color: Colors.white
  },
  closeIcon: {
    fontSize: 30 * scale,
    color: Colors.white,
    marginRight: 5 * scale
  },
  headerText: {
    fontSize: 20 * scale,
    color: Colors.white,
    marginLeft: 10 * scale,
    fontFamily: Fonts.extraBold
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15 * scale
  }
});
