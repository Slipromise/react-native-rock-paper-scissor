import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles((theme, {isDone}: {isDone?: boolean}) => {
  return {
    container: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      backgroundColor: isDone ? theme.colors.disabled : theme.colors.white,
    },
    title: {
      fontSize: 20,
      color: theme.colors.black,
      fontWeight: '700',
    },
    subtitle: {
      color: theme.colors.grey2,
      fontSize: 14,
      fontWeight: '400',
    },
  };
});

export default useStyles;
