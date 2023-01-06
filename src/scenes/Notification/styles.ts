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
    flexGrow: 1,
    paddingHorizontal: 20 * scale,
    marginTop: 10 * scale
  },
  notificationView: {
    marginVertical: 10 * scale,
    flexDirection: 'column'
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5 * scale
  },
  title: {
    fontSize: 20 * scale,
    color: Colors.black,
    flex: 0.9
  },
  details: {
    fontSize: 15 * scale,
    color: Colors.greyLine
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
  }
});
