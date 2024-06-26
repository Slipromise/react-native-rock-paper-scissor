import {makeStyles} from '@rneui/themed';
import {StyleSheet} from 'react-native';

const useStyles = makeStyles(() => ({
  container: StyleSheet.absoluteFillObject,
  emptyContainer: {
    width: '100%',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyAnimation: {
    width: 250,
    aspectRatio: 1,
  },
  emptyHintText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
}));

export default useStyles;
