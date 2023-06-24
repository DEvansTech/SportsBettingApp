import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  spinnerTextStyle: {
    color: 'white'
  },
  logo: {
    width: 150 * scale,
    height: 150 * scale,
    alignSelf: 'center'
  },
  title: {
    color: Colors.white,
    fontSize: 32 * scale,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginHorizontal: 10 * scale
  },
  contentView: {
    position: 'relative',
    paddingHorizontal: 20 * scale,
    paddingTop: 20 * scale
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center'
  },
  renderItem: {
    width: '100%',
    borderRadius: 20 * scale,
    overflow: 'hidden',
    marginTop: 20 * scale
  },
  renderItemHeader: {
    backgroundColor: 'black',
    paddingVertical: 10 * scale,
    paddingHorizontal: 15 * scale,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    color: Colors.white,
    fontSize: 19 * scale,
    fontFamily: Fonts.black,
    textTransform: 'uppercase'
  },
  itemDescription: {
    color: Colors.green,
    fontSize: 19 * scale,
    fontFamily: Fonts.black,
    textTransform: 'uppercase',
    marginTop: 3 * scale
  },
  itemPriceContent: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  itemCurrency: {
    fontFamily: Fonts.regular,
    fontSize: 20 * scale,
    lineHeight: 22 * scale,
    color: Colors.white
  },
  itemPrice: {
    fontFamily: Fonts.regular,
    fontSize: 45 * scale,
    color: Colors.white,
    lineHeight: 45 * scale
  },
  renderItemBody: {
    backgroundColor: 'transparent',
    paddingVertical: 10 * scale,
    paddingHorizontal: 15 * scale,
    marginTop: 4 * scale,
    borderColor: 'white',
    borderWidth: 1 * scale,
    borderBottomRightRadius: 20 * scale,
    borderBottomLeftRadius: 20 * scale,
    position: 'relative',
    height: 120 * scale
  },
  bestDealText: {
    lineHeight: 26 * scale,
    fontFamily: Fonts.black,
    fontSize: 19 * scale,
    color: Colors.white
  },
  dealText: {
    fontFamily: Fonts.regular,
    fontSize: 19 * scale,
    color: Colors.white
  },
  checkIcon: {
    position: 'absolute',
    right: 20 * scale,
    bottom: 20 * scale,
    width: 40 * scale,
    height: 40 * scale
  },
  selectedItem: {
    backgroundColor: 'white'
  },
  selectedItemText: {
    color: 'black'
  },
  subscribeBtn: {
    marginTop: 40 * scale,
    backgroundColor: Colors.white
  },
  subscribeSelectedBtn: {
    marginTop: 40 * scale,
    backgroundColor: Colors.black
  },
  buttonBlackText: {
    color: 'black',
    fontSize: 19 * scale,
    fontFamily: Fonts.regular
  },
  buttonWhiteText: {
    color: 'white',
    fontSize: 19 * scale,
    fontFamily: Fonts.regular
  },
  underline: {
    textDecorationLine: 'underline'
  },
  closeBtn: {
    position: 'absolute',
    top: 5 * scale,
    right: 20 * scale
  },
  closeIcon: {
    width: 33 * scale,
    height: 33 * scale,
    color: 'white'
  }
});
