import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  scroll: {
    flexGrow: 1
  },
  sidebarContent: {
    flex: 1,
    position: 'relative',
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
    fontSize: 15 * scale,
    fontFamily: Fonts.semiBold,
    marginLeft: -20 * scale,
    color: 'white'
  },
  separator: {
    backgroundColor: Colors.white,
    height: 1,
    marginVertical: 15 * scale
  },
  logo: {
    width: 240 * scale,
    height: 90 * scale,

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
    fontSize: 21 * scale,
    alignSelf: 'center',
    marginTop: 10 * scale,
    fontFamily: Fonts.regular
  },
  feedbackContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.black,
    paddingVertical: 30 * scale,
    paddingHorizontal: 20 * scale,
    paddingBottom: 50 * scale
  },
  feedbackTitleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20 * scale
  },
  feedbackTitleText: {
    fontSize: 18 * scale,
    fontFamily: Fonts.black,
    color: 'white',
    textTransform: 'uppercase',
    marginLeft: 10 * scale,
    marginTop: -7 * scale
  },
  feedbackGreenText: {
    fontSize: 15 * scale,
    fontFamily: Fonts.black,
    lineHeight: 23 * scale,
    color: Colors.green
  },
  feedbackText: {
    fontSize: 15 * scale,
    fontFamily: Fonts.regular,
    color: Colors.white,
    lineHeight: 23 * scale
  }
});
