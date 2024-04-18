import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles((theme, props: {isWinner?: boolean}) => ({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    backgroundColor: props.isWinner ? theme.colors.primary : theme.colors.white,
  },
  animation: {
    width: 50,
    height: 50,
  },
}));

export default useStyles;
