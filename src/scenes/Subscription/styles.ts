import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts } from '@Theme';

const deviceWidth = Dimensions.get('window').width;
const scale = deviceWidth / 390;

export default StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  spinnerTextStyle: {
    color: 'white'
  },
  title: {
    color: Colors.black,
    fontSize: 25 * scale,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 70 * scale : 30 * scale
  },
  contentView: {
    position: 'relative',
    flexGrow: 1,
    paddingHorizontal: 20 * scale,
    marginTop: 15 * scale
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center'
  },
  renderItem: {
    padding: 16 * scale,
    borderColor: Colors.whiteGreen,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10 * scale,
    borderRadius: 10 * scale,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 10
  },

  itemTitle: {
    color: Colors.black,
    fontSize: 18 * scale,
    fontFamily: Fonts.semiBold
  },
  itemDescription: {
    color: Colors.black,
    fontSize: 12 * scale,
    fontFamily: Fonts.regular,
    marginTop: 10 * scale
  }
});
