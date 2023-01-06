import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  contentView: {
    position: 'relative',
    flexGrow: 1
  },
  container: {
    flex: 1
  },
  myTeamsView: {
    backgroundColor: Colors.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5 * scale,
    borderTopColor: Colors.black,
    padding: 15 * scale
  },
  teamPlusText: {
    fontSize: 22 * scale,
    color: 'white',
    fontFamily: Fonts.black
  },
  teamPlusIcon: {
    fontSize: 25 * scale,
    color: 'white',
    marginLeft: 10 * scale
  },
  teamCloseIcon: {
    fontSize: 25 * scale,
    color: Colors.grey,
    marginRight: 20 * scale,
    alignSelf: 'flex-end',
    zIndex: 1
  },
  selectionView: {
    zIndex: 0
  },
  selectionIconView: {
    position: 'relative',
    marginTop: 15 * scale,
    flex: 1
  },
  noDataView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  spinnerTextStyle: {
    color: Colors.green
  }
});
