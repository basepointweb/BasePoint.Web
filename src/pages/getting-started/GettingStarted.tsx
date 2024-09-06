
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { ListItem, List } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Master from '../master/Master';

function GettingStarted() {
    const navigate = useNavigate();

    const handleLearnMoreBestPracticesGenerator = () => {
        navigate('/getting-started/generator')
    }

    const handleLearnMoreBestPracticesNugetPackage = () => {
        navigate('/getting-started/nuget-packages')
    }
    
  return (
    <>
        <Master children = {
        <>
            <Box>  
                <Typography variant="h4">BasePoint Framework - Overview</Typography>
                <Typography paragraph align='left'>BasePoint framework is a open source library that implements the most important software development practices used in the market.</Typography>

                <Typography variant="h4">Introduction</Typography>
                <Typography paragraph align='left'>BasePoint framework is designed to offer a comprehensive set of classes serving as the foundation for developing software utilizing object-oriented principles, Domain Driven Development principles and Clean Architecture.</Typography>

                <Typography paragraph align='left'>This framework serve as the cornerstone for establishing the DDD layers, including Domain, Application, and Infrastructure. Its include implementations of support classes tailored to some database technologies.</Typography>

                <Typography variant="h4">Advantages of BasePoint Framework</Typography>
                <List>
                    <ListItem><Typography>Productivity: </Typography>Solution to many day-to-day software development problems</ListItem>
                    <ListItem><Typography>Standardization:</Typography>Bring your project in line with the best market practices</ListItem>
                    <ListItem><Typography>Customization made easy: </Typography>Implement your specific needs smoothly</ListItem>
                </List>

                <Typography variant="h4">Start now</Typography>
                <Typography paragraph align='left'>Get started with BasePoint Framework today through some of these useful resources:</Typography>

                    <Grid    container direction="row"  justifyContent="center" >
                        <Grid item xs={9}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '8px',
                                }}
                                >
                            <Card sx={{ minWidth: 275, width: 275}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        BasePoint Nuget package
                                    </Typography>
                                    <Typography variant="h5" textAlign="center"  color="text.secondary">
                                    Implement over the framework
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={handleLearnMoreBestPracticesNugetPackage}>Learn More</Button>
                                </CardActions>
                            </Card>

                            <Card sx={{ minWidth: 275, width: 275}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        BasePoint Generator
                                    </Typography>
                                    <Typography variant="h5" textAlign="center"  color="text.secondary">
                                    Code even faster
                                    </Typography>      
                                    <Typography variant="body2">
                                    Generete all boilerplate                              
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={handleLearnMoreBestPracticesGenerator}>Learn More</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>}>
        </Master>     
    </>
  )
}
    
export default GettingStarted