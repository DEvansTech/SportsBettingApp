import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: Colors.black,
    height: 60 * scale,
    width: deviceWidth,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  chevronIcon: {
    fontSize: 33 * scale,
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
    fontSize: 19 * scale,
    color: 'white',
    fontWeight: 'bold',
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
    paddingVertical: 20 * scale,
    flexDirection: 'row',
    alignItems: 'center'
  },
  favoriteIcon: {
    fontSize: 30 * scale,
    color: Colors.red,
    marginRight: 10 * scale
  },
  teamImg: {
    width: 45 * scale,
    height: 45 * scale
  },
  teamName: {
    flex: 1,
    fontSize: 20 * scale,
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
  searchItem: {
    marginVertical: 15 * scale,
    marginHorizontal: 25 * scale,
    paddingHorizontal: 15 * scale,
    borderWidth: 1,
    borderColor: Colors.mediumGrey,
    borderRadius: 15 * scale,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    fontSize: 30 * scale,
    color: Colors.mediumGrey
  },
  input: {
    color: 'black',
    fontFamily: Fonts.regular,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0.5 * scale,
    fontSize: 18 * scale
  }
});
