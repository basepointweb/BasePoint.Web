import { Box } from '@mui/material'
import './App.css'
import ApplicationBar from './components/Home/application-bar/ApplicationBar'
import Routes from './Routes' 

function App() {
return (
    <>
    <Box sx={{ marginTop: '65px' }}>
    <ApplicationBar/>         
      <Routes />      
    </Box>
    </>   
  )
}

export default App
