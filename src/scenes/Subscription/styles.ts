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
    width: 240 * scale,
    height: 120 * scale,
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
    paddingHorizontal: 20 * scale
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
  itemHeader: {
    flex: 1
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
    position: 'relative'
    // height: 120 * scale
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
  italicText: {
    fontStyle: 'italic',
    fontFamily: Fonts.regular,
    fontSize: 16 * scale,
    color: Colors.white,
    flex: 1
  },
  newTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10 * scale
  },
  checkIcon: {
    width: 40 * scale,
    height: 40 * scale,
    marginLeft: 10 * scale
  },
  selectedItem: {
    backgroundColor: 'white'
  },
  selectedItemText: {
    color: 'black'
  },
  subscribeBtn: {
    marginTop: 25 * scale,
    backgroundColor: Colors.white
  },
  subscribeSelectedBtn: {
    marginTop: 25 * scale,
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
