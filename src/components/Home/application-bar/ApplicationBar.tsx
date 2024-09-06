import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom'
import { Drawer } from '@mui/material';
import SideBar from '@/components/side-bar/SideBar';

const pages = ['Home', 'Documentation', 'Source Code'];

function ResponsiveAppBar() {
  const [temporaryDrowerOpen, setTemporaryDrowerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickMenuItem = (page: string) => {
    switch ( page ) {
      case 'Home':
          navigate('.')
          break;
      case 'Documentation':
          navigate('/getting-started')        
          break;
      case 'Source Code':
        openInNewTab('https://github.com/eliassilvadev/best-practices')
          break;
      default: 
          // 
          break;
   }
  };

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <AppBar position="fixed" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}           
          >          
             BasePoint
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setTemporaryDrowerOpen(true)}
              color="inherit"
            >              
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"          
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BasePoint
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClickMenuItem(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
        {temporaryDrowerOpen && 
          <Drawer onClose={() => setTemporaryDrowerOpen(false)}        
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
            }}
            open
          >
            { <SideBar isInTemporaryDrawer={true} setTemporaryDrowerOpen={setTemporaryDrowerOpen}/> }
          </Drawer>
        }
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
