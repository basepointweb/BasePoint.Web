
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
return (
    <>
    <Grid      
      container
      direction="row"    
      justifyContent="center"
      style={{  }}
    >
      <Grid item xs={9}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '8px',
          }}
        >
          <Box
            sx={{
              width: '49%',             
              textAlign: 'center',
              lineHeight: '100px',
              marginTop: '200px'
            }}
          >
            <Box style={{ }}>
              <Typography variant="h2">Move faster</Typography>
              <Typography variant="h2">with intuitive</Typography>
              <Typography variant="h2">BasePoint classes</Typography>  
              <Typography paragraph>
                BasePoint Framework is a back-end structure for creating software solutions with modern architectures based on the ASP.NET Core platform.
              </Typography>   
              <Button
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                onClick={ () => {navigate('/getting-started')}}
                sx={{
                  textTransform: 'none'
                }}>
                Explore BasePoint libraries
              </Button>  
            </Box>
          </Box>
          <Box
            sx={{
              width: '49%',             
              textAlign: 'center',
              lineHeight: '100px',
            }}
          >
            <Box style={{ }}>
              <Typography variant="h2">Move faster</Typography>
              <Typography variant="h2">with intuitive</Typography>
              <Typography variant="h2">BasePoint classes</Typography>  
              <Typography paragraph>
                BasePoint Framework is a back-end structure for creating software solutions with modern architectures based on the ASP.NET Core platform.
              </Typography>   
              <Button variant="contained" endIcon={<KeyboardArrowRightIcon />} onClick={ () => {navigate('/getting-started')}}>
                Explore BasePoint libraries
              </Button>  
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default Home
