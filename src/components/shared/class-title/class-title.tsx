import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types';

function ClassTitle({ classDeclarationName, subTitle }) {  
  return (
    <>
    <Box sx={{ marginBottom: '20px'}}>
      <Typography variant="h4" sx={{ fontFamily: "'Cascadia Code', monospace"}}>
        <Box sx={{display: 'inline', color: '#0852c1'}}>
          class
         </Box>
         <Box sx={{display: 'inline', color: '#4eb67e'}}>
          {' ' + classDeclarationName}
         </Box>
        </Typography>
        {!!subTitle && <Typography variant="h6">
        <Box sx={{display: 'inline', color: 'gray', fontStyle: 'italic'}}>
          {subTitle}
         </Box>       
        </Typography>}
      </Box>
    </>
  );
};

ClassTitle.propTypes = {
  classDeclarationName: PropTypes.string,
  subTitle: PropTypes.string,
};

export default ClassTitle;