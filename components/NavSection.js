import Link from 'next/link';

import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, ListItemText, ListItemButton } from '@mui/material';

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,

      [theme.breakpoints.up('lg')]: {
        top: 'unset',
        width: '100%',
        height: 3,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 4,
      }
    }
  })
);

const NavItem = ({ item, active }) => {
  const theme = useTheme();
  const isActiveRoot = active === item.path;
  const { title, path } = item;

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' }
  };

  return (
    <ListItemStyle
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <Link href={path}>
        <ListItemText disableTypography primary={title} />
      </Link>
    </ListItemStyle>
  );
}

const NavSection = ({ navConfig, ...other }) => {
  return (
    <Box {...other}>
      <List 
        disablePadding
        sx={{
          display: {
            lg: 'flex'
          },
        }}
      >
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={'/'} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;