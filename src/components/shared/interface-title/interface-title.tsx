import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types';

function InterfaceTitle({ classDeclarationName }) {  
  return (
    <>
    <Box>
      <Typography variant="h4" sx={{ fontFamily: "'Cascadia Code', monospace"}}>
        <Box sx={{display: 'inline', color: '#0852c1'}}>
          interface
         </Box>
         <Box sx={{display: 'inline', color: '#b8d7a3'}}>
          {' ' + classDeclarationName}
         </Box>
        </Typography>
      </Box>
    </>
  );
};

InterfaceTitle.propTypes = {
  classDeclarationName: PropTypes.string
};

export default InterfaceTitle;