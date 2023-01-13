import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 100 : 80 * scale,
    zIndex: 1,
    borderTopColor: 'transparent'
  },
  tabStyle: {
    height: 80 * scale,
    flexDirection: 'column',
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 10 * scale,
    color: Colors.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: Fonts.extraBold,
    paddingBottom: 20 * scale
  },
  obILabel: {
    color: 'white'
  },
  tabBarView: {
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  obiTabBarView: {
    backgroundColor: Colors.black,
    borderTopColor: Colors.green,
    borderTopWidth: 3
  },
  monthText: {
    position: 'absolute',
    fontSize: 8 * scale,
    top: 5 * scale,
    alignSelf: 'center',
    fontFamily: Fonts.extraBold,
    textTransform: 'uppercase'
  },
  dateText: {
    position: 'absolute',
    fontSize: 19 * scale,
    bottom: 0 * scale,
    alignSelf: 'center',
    fontFamily: Fonts.extraBold
  },
  selectedIcon: {
    opacity: 1
  }
});
