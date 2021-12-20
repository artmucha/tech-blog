import { Link as NextLink } from 'next/link';

import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

import NavSection from 'components/NavSection';
import MHidden from 'components/@material-extends/MHidden';

import menu from 'constans/menu';

const DRAWER_WIDTH = 280;

const Sidebar = ({ isOpenSidebar, onCloseSidebar }) => {

  const renderContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex', 
        flexDirection: 'column'
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={NextLink} to="/" sx={{ display: 'inline-flex' }}>
          BLOG
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}></Box>

      <NavSection navConfig={menu} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Chcesz więcej?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Wykup Premium
            </Typography>
          </Box>

          <Button
            fullWidth
            href="/"
            target="_blank"
            variant="contained"
          >
            Boom
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Drawer
      open={isOpenSidebar}
      onClose={onCloseSidebar}
      PaperProps={{
        sx: { width: DRAWER_WIDTH }
      }}
    >
      {renderContent}
    </Drawer>
  );
};

export default Sidebar;