
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Master from '@/pages/master/Master';

function Template() {
    return (
        <>
            <Master children = {
                <>
                    <Box>
                        <Typography variant="h4">BasePoint Framework - Template</Typography>
                    </Box>
                </>}>
            </Master>     
        </>
    )
}
    
export default Template