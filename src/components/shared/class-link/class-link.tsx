import Link from '@mui/material/Link'
import * as React from 'react'
import PropTypes from 'prop-types'
import CodeMirror from '@uiw/react-codemirror'
import { csharp } from "@replit/codemirror-lang-csharp"
import { codeEditorTheme } from '@shared/configs/constants/themes'
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'

function ClassLink({ description, routePath, previewCode }) {  
  const [open, setOpen] = React.useState(false);
  
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (previewCode !== ''){     
      setOpen(true)
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',   
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
  };

return (
    <>
    <Box    sx ={{display:'inline', padding: '1px'}} >
    {previewCode !== ''  &&
    <Link
      sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.3s ease;', 
        '&:hover .MuiSvgIcon-root': {
          transform: 'scale(1.2)', 
        },
       }}
      aria-haspopup="true"
      onClick={handleOpen}>
      {description}
      <WysiwygIcon sx={{ color: 'inherit', marginLeft: 0.5 }} fontSize="small" />
    </Link>}

    {previewCode === ''  && routePath !== '' &&
      <Link sx={{ cursor:'pointer'}}      
        aria-haspopup="true"
        href={routePath} 
        > {description}
        </Link>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"        
      >
        <Box sx={style}>
          <CodeMirror
            value={previewCode}                              
            theme={codeEditorTheme}
            extensions={[csharp()]}
            readOnly  
            width={'100%'} 
            basicSetup={{
              lineNumbers: false, 
              foldGutter: false,
            }}                
          />
          <Box sx={{marginTop:'10px', marginBottom:'10px', alignItems:'rigth' }}>

            <Button variant="outlined" color="error" sx={{textTransform:'none',float: 'right' }} onClick={ () => {handleClose()}}>
              Fechar
            </Button>
            
            <Button variant="contained" sx={{textTransform:'none', marginRight: '10px', float: 'right' }} endIcon={<KeyboardArrowRightIcon />} onClick={ () => {navigate(routePath)}}>
              Mais detalhes
            </Button>
          </Box>
        </Box>  
      </Modal>
      </Box>
    </>
  );
};

ClassLink.propTypes = {
    description: PropTypes.string,
    routePath: PropTypes.string,
    previewCode: PropTypes.string
};

ClassLink.defaultProps = {
  description: '',
  routePath: '',
  previewCode: ''
};

export default ClassLink;