import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.black,
    height: 60 * scale
  },
  headerLeft: {
    marginLeft: 15 * scale
  },
  headerRight: {
    marginRight: 11 * scale
  }
});
