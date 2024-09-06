import Link from '@mui/material/Link';
import * as React from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import CodeMirror from '@uiw/react-codemirror'
import { csharp } from "@replit/codemirror-lang-csharp"
import { codeEditorTheme } from '@shared/configs/constants/themes'
import { Box } from '@mui/material';

function InterfaceLink({ description, routePath, previewCode }) {  

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (previewCode){
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Link sx={{color:'#4eb67e', fontWeight: 'bold'}} href={routePath}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      > {description}</Link>

      <Popover      
        id="mouse-over-popover"
        sx={{       
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box>
        <CodeMirror
                value={previewCode}                              
                theme={codeEditorTheme}
                extensions={[csharp()]}
                width={'auto'}
                minHeight={'200px'}
                readOnly
              />
        </Box>
     
      </Popover>
    </>
  );
};

InterfaceLink.propTypes = {
    description: PropTypes.string,
    routePath: PropTypes.string,
    previewCode: PropTypes.string
};

export default InterfaceLink;