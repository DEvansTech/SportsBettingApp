import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export const scale = deviceWidth / 390;

export default StyleSheet.create({
  rangerView: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  thumbImageStyle: {
    width: 60 * scale,
    height: 60 * scale
  },
  thumbStyle: {
    backgroundColor: 'transparent',
    width: 60 * scale,
    height: 60 * scale,
    borderRadius: 50 * scale
  },
  specialRangerView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10
  },
  childView1: {
    alignItems: 'stretch',
    marginRight: -30 * scale,
    flex: 0.6,
    justifyContent: 'center'
  },
  childView2: {
    alignItems: 'stretch',
    marginLeft: -30 * scale,
    flex: 0.6,
    justifyContent: 'center'
  }
});
