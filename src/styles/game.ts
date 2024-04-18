import {makeStyles} from '@rneui/themed';
import {StyleSheet} from 'react-native';

const useStyles = makeStyles(() => ({
  container: StyleSheet.absoluteFillObject,
  winningAnimation: {width: '100%', height: '100%', position: 'absolute'},
  ListEmptyContainer: {
    width: '100%',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBgAnimation: {width: 200, height: 200},
  emptyHintText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

export default useStyles;
