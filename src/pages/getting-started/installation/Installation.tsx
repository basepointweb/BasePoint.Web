
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Master from '@/pages/master/Master';

const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

function Installation() {
    return (
      <>
       <Master children = {
        <>
            <Box>
                <Box style={{width: 780 }}>
                    <Typography variant="h4">BasePoint Framework - Installation</Typography>
                    <Typography paragraph align='left'>BasePoint framework is a open source library that implements the most important software development practices used in the market.</Typography>

                    <Typography variant="h4">Introduction</Typography>
                    <Typography paragraph align='left'>BasePoint framework is designed to offer a comprehensive set of classes serving as the foundation for developing software utilizing object-oriented principles, Domain Driven Development principles and Clean Architecture.</Typography>

                    <Typography paragraph align='left'>This framework serve as the cornerstone for establishing the DDD layers, including Domain, Application, and Infrastructure. Its include implementations of support classes tailored to some database technologies.</Typography>

                    <Typography variant="h4">Resources to start with BasePoint Framework</Typography>                                                           
                </Box>  

                <Grid container direction="row"  justifyContent="center" >
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
                                        Best.Practices.Core
                                    </Typography>
                                    <Typography variant="h5" textAlign="center"  color="text.secondary">
                                    Install nuget package
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {openInNewTab('https://www.nuget.org/packages/Best.Practices.Core/')}}>Install now</Button>
                                </CardActions>
                            </Card>

                            <Card sx={{ minWidth: 275, width: 275}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Best.Practices.Cqrs.Dapper
                                    </Typography>
                                    <Typography variant="h5" textAlign="center"  color="text.secondary">
                                    Install nuget package
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {openInNewTab('https://www.nuget.org/packages/Best.Practices.Core.Cqrs.Dapper/')}}>Install now</Button>
                                </CardActions>
                            </Card>

                            
                            <Card sx={{ minWidth: 275, width: 275}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                    Best.Practices.Core.Presentation.AspNetCoreApi 
                                    </Typography>
                                    <Typography variant="h5" textAlign="center"  color="text.secondary">
                                    Install nuget package
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {openInNewTab('https://www.nuget.org/packages/Best.Practices.Core.Presentation.AspNetCoreApi/')}}>Install now</Button>
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
                                    <Button size="small" onClick={ () => {openInNewTab('https://marketplace.visualstudio.com/items?itemName=EliasSilva.BestPracticesGenerator&ssr=false#overview')}}>Install now</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>} >      
        </Master>
      </>
    )
}
    
export default Installation