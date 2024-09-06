import { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import  List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom'
import { Box, Divider } from '@mui/material'
import { GettingStartedRouteComponents, HomeRouteComponents, DomainLayerRoutes, ApplicationLayerRoutes, InfraStructureLayerRoutes } from '../../Routes'

function SideBar({ isInTemporaryDrawer, setTemporaryDrowerOpen }) {
  const [gettingStartedOpen, setGettingStartedOpen] = useState(true);
  const [layersOpen, setLayersOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('')
  const location = useLocation(); 

  const navigate = useNavigate();
  const listRef = useRef(null);
  
  useEffect(() => {
    setCurrentRoute(location.pathname);
    const handleResize = () => {
      if (window.innerWidth > 899){
        setTemporaryDrowerOpen(false)
      }      
    };
    
   window.scrollTo(0, 0)

    const savedPosition = localStorage.getItem('listScrollPosition');
    if (savedPosition && listRef.current) {
           listRef.current.scrollTop = parseInt(savedPosition, 10);
    }
   
    window.addEventListener('resize', handleResize); 
  
    return () => window.removeEventListener('resize', handleResize);
}, []);


useEffect(() => {
  const handleScroll = () => {
    if (listRef.current) {
      localStorage.setItem('listScrollPosition', listRef.current.scrollTop);
    }
  };

  const listNode = listRef.current;
  listNode.addEventListener('scroll', handleScroll);

  return () => {
    listNode.removeEventListener('scroll', handleScroll);
  };
}, []);


  const handleGettingStartedClick = () => {
    setGettingStartedOpen(!gettingStartedOpen);
  };

  const handleLayersClick = () => {
    setLayersOpen(!layersOpen);
  };

  const handleNavigationFromTemporaryDrawer = (route: string) => {
    setTemporaryDrowerOpen(false)
    navigate(route)
  };

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const handleSourceCodeClick = () => {
    setTemporaryDrowerOpen(false)
    openInNewTab('https://github.com/eliassilvadev/best-practices')
  };
  
  return (
    <>
    <Box sx={{ fontSize: '500px', borderRight: '32px solid black', paddingRight: '16px' }}>
      <List       
        dense
          ref={listRef} 
          style={{height: isInTemporaryDrawer ? 'calc(100%)' : 'calc(100% - 70px)', overflow: 'auto', marginTop: '4px', zIndex: 10 }}    
          sx={{ width: '100%', position: 'fixed',  minWidth: 300, maxWidth: 300, bgcolor: 'background.paper',
            '& .MuiListItemText-primary': {
              fontSize: '12px',
              lineHeight: '1.5',         
            // fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
            }

          }}      
          component="nav"
          aria-labelledby="nested-list-subheader">

          {isInTemporaryDrawer &&
          <>
            {HomeRouteComponents.map((route) => (
              <ListItemButton sx={{ pl: 4,
                '& .MuiListItemText-primary': {
                  fontWeight: currentRoute === route.path ? 'bold' : 'normal',
                  color:  currentRoute === route.path ? '#49a2e8' : 'black',
                }}} onClick={() => handleNavigationFromTemporaryDrawer(route.path)} selected={currentRoute === route.path} >
              <ListItemText primary={route.title} />
              </ListItemButton>
            ))}

            <ListItemButton sx={{ pl: 4 }} onClick={handleSourceCodeClick}>
              <ListItemText primary="Source Code" />
            </ListItemButton>
            <Divider/>
          </>}

          <ListItemButton onClick={handleGettingStartedClick}>
            <ListItemIcon>
              {gettingStartedOpen ? <ExpandMore sx={{ fontSize: 16, color: '#49a2e8' }} /> : <ChevronRightIcon sx={{ fontSize: 16, color: '#49a2e8' }} />}
            </ListItemIcon>
            <ListItemText primary="Getting started"
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  ml: -4
                }}} />
          </ListItemButton>

          <Collapse in={gettingStartedOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {GettingStartedRouteComponents.map((route) => (
                <ListItemButton sx={{ pl: 4,
                  '& .MuiListItemText-primary': {
                    fontWeight: currentRoute === route.path ? 'bold' : 'normal',
                    color:  currentRoute === route.path ? '#49a2e8' : 'black',
                  }
                  }} onClick={() => handleNavigationFromTemporaryDrawer(route.path)} selected={currentRoute === route.path}>
                <ListItemText inset primary={route.title} sx={{ paddingLeft: '20px' }} />
                </ListItemButton>
              ))}        
            </List>
          </Collapse>

          <ListItemButton onClick={handleLayersClick} sx={{fontWeight: 'bold'}}>
            <ListItemIcon>
              {layersOpen ? <ExpandMore sx={{ fontSize: 16, color: '#49a2e8' }} /> : <ChevronRightIcon sx={{ fontSize: 16, color: '#49a2e8' }} />}
            </ListItemIcon>
            <ListItemText primary="Framework classes"
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  ml: -4
                }}} />
          </ListItemButton>

          <Collapse in={layersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} disabled>
                <ListItemText primary="Domain layer" sx={{ paddingLeft: '20px' }} />
              </ListItemButton>

              {DomainLayerRoutes.map((route) => (
                <ListItemButton sx={{ pl: 4,
                  '& .MuiListItemText-primary': {
                    fontWeight: currentRoute === route.path ? 'bold' : 'normal',
                    color:  currentRoute === route.path ? '#49a2e8' : 'black',
                  } }} onClick={() => handleNavigationFromTemporaryDrawer(route.path)} selected={currentRoute === route.path}>
                <ListItemText inset primary={route.title} sx={{ paddingLeft: '20px' }} />
                </ListItemButton>          
              ))}

              <ListItemButton sx={{ pl: 4 }} disabled>
                <ListItemText primary="Application layer" sx={{ paddingLeft: '20px' }} />
              </ListItemButton>

              {ApplicationLayerRoutes.map((route) => (
                <ListItemButton sx={{ pl: 4,
                  '& .MuiListItemText-primary': {
                    fontWeight: currentRoute === route.path ? 'bold' : 'normal',
                    color:  currentRoute === route.path ? '#49a2e8' : 'black',
                  } }} onClick={() => handleNavigationFromTemporaryDrawer(route.path)} selected={currentRoute === route.path}>
                <ListItemText inset primary={route.title} sx={{ paddingLeft: '20px' }} />
                </ListItemButton>          
              ))}

              <ListItemButton sx={{ pl: 4 }} disabled>
                <ListItemText primary="Infrastructure layer" sx={{ paddingLeft: '20px' }} />
              </ListItemButton>

              {InfraStructureLayerRoutes.map((route) => (
                <ListItemButton sx={{ pl: 4,
                  '& .MuiListItemText-primary': {
                    fontWeight: currentRoute === route.path ? 'bold' : 'normal',
                    color:  currentRoute === route.path ? '#49a2e8' : 'black',
                  } }} onClick={() => handleNavigationFromTemporaryDrawer(route.path)} selected={currentRoute === route.path}>
                <ListItemText primary={route.title} sx={{ paddingLeft: '20px' }} />
                </ListItemButton>          
              ))}
            </List>
          </Collapse>
        </List>
      </Box>
    </> 
  )
}

SideBar.defaultProps = {
  isInTemporaryDrawer: false,
  setTemporaryDrowerOpen: () => {}
}
    
export default SideBar