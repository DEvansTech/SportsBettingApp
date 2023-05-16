import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  scroll: {
    flexGrow: 1
  },
  sidebarContent: {
    flex: 1,
    paddingHorizontal: 16 * scale,
    ...Platform.select({
      android: {
        paddingVertical: 16 * scale
      }
    })
  },
  footer: {
    flex: 1,
    justifyContent: 'center'
  },
  itemContainer: {
    paddingHorizontal: 0,
    marginHorizontal: 0
  },
  icon: {
    color: 'white',
    fontSize: 25 * scale
  },
  label: {
    fontSize: 13 * scale,
    fontFamily: Fonts.regular,
    marginLeft: -20 * scale,
    color: 'white'
  },
  separator: {
    backgroundColor: Colors.white,
    height: 1,
    marginVertical: 15 * scale
  },
  logo: {
    width: 117 * scale,
    height: 117 * scale,
    alignSelf: 'center'
  },
  closeBtn: {
    alignSelf: 'flex-end'
  },
  closeIcon: {
    color: Colors.white
  },
  userName: {
    color: 'white',
    fontSize: 20 * scale,
    alignSelf: 'center',
    marginTop: 20 * scale,
    fontFamily: Fonts.regular
  }
});
