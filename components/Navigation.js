
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Toolbar, Container, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';

import Searchbar from 'components/Searchbar';
import { maxWidth } from '@mui/system';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    position: 'static',
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 3),
    width: '100%',
    maxWidth: '1536px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

const Navigation = ({ onOpenSidebar }) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
          <Icon icon={menu2Fill} />
        </IconButton>
        <Searchbar />
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navigation;