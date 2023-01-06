import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.green,
    height: 65 * scale,
    borderColor: 'transparent',
    paddingHorizontal: 20 * scale
  },
  headerLeft: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10 * scale
  },
  headerText: {
    fontSize: 20 * scale,
    fontFamily: Fonts.regular,
    color: 'white',
    marginLeft: 10 * scale
  },
  contentView: {
    position: 'relative',
    flexGrow: 1,
    paddingHorizontal: 20 * scale,
    marginTop: 10 * scale
  }
});
