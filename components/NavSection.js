import { Link as NextLink } from 'next/link';

import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
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

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const NavItem = ({ item, active }) => {
  const theme = useTheme();
  const isActiveRoot = active === item.path;
  const { title, path, icon, info } = item;

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' }
  };

  return (
    <ListItemStyle
      component={NextLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      { icon && 
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle> 
      }
      
      <ListItemText disableTypography primary={title} />
      {info && info}
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