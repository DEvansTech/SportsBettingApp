import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@Theme';

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
  headerDateText: {
    fontSize: 18 * scale,
    color: Colors.green,
    fontWeight: 'bold'
  },
  container: {
    flex: 1
  },
  segmentView: {
    marginTop: 10 * scale,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  segmentBtn1: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  segmentBtn2: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  spinnerTextStyle: {
    color: Colors.green
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  noDataView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  }
});
