import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.green,
    height: 65 * scale,
    borderColor: 'transparent',
    marginHorizontal: 10 * scale
  },
  chevronIcon: {
    fontSize: 28 * scale,
    color: 'white'
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10 * scale
  },
  headerText: {
    fontSize: 20 * scale,
    fontFamily: Fonts.semiBold,
    color: 'white',
    marginLeft: 10 * scale
  },
  contentView: {
    position: 'relative',
    flexGrow: 1
  },
  teamView: {
    marginHorizontal: 20 * scale,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: 15 * scale,
    flexDirection: 'row',
    alignItems: 'center'
  },
  favoriteBlackIcon: {
    fontSize: 30 * scale,
    color: Colors.black,
    marginRight: 15 * scale
  },
  favoriteRedIcon: {
    fontSize: 30 * scale,
    color: Colors.red,
    marginRight: 15 * scale
  },

  teamImg: {
    width: 40 * scale,
    height: 40 * scale
  },
  teamName: {
    flex: 1,
    fontSize: 18 * scale,
    marginLeft: 15 * scale,
    fontFamily: Fonts.regular
  },
  spinnerTextStyle: {
    color: Colors.green
  },
  noDataView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  headerDateText: {
    fontSize: 18 * scale,
    color: Colors.green,
    fontWeight: 'bold'
  },
  searchView: {
    position: 'relative',
    backgroundColor: Colors.lightGrey
  },
  searchItem: {
    marginTop: 15 * scale,
    marginHorizontal: 25 * scale,
    paddingHorizontal: 15 * scale,
    borderRadius: 15 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  searchIcon: {
    fontSize: 30 * scale,
    color: Colors.black
  },
  input: {
    color: 'black',
    fontFamily: Fonts.regular,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0.5 * scale,
    fontSize: 18 * scale
  },
  selectItem: {
    marginHorizontal: 30 * scale,
    width: 150 * scale
  },
  selectIcon: {
    fontSize: 20 * scale,
    color: Colors.black
  }
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 25 * scale,
    letterSpacing: scale,
    fontFamily: Fonts.black,
    height: 60 * scale,
    borderColor: Colors.transparent,
    backgroundColor: Colors.transparent,
    color: Colors.black
  },
  inputAndroid: {
    fontSize: 25 * scale,
    letterSpacing: scale,
    fontFamily: Fonts.black,
    height: 60 * scale,
    borderColor: Colors.transparent,
    backgroundColor: Colors.transparent,
    color: Colors.black,
    paddingRight: 25 * scale,
    width: '100%'
  },
  iconContainer: {
    top: 20 * scale,
    right: 3 * scale
  }
});
