import { Box, Typography } from "@mui/material"
import SideBar from "@/components/side-bar/SideBar"
import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { scroller,Link } from 'react-scroll'

function Master({ children, marks }) {
  const [sliderValue, setSliderValue] = useState(70)
  const [isScrolling, setIsScrolling] = useState(false);
  const [showFixedSideBar, setShowFixedSideBar] = useState(true);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);

  useEffect(() => {
    if(marks){
      const values = marks.map(mark => mark.value);
      const max = Math.max(...values);
      const min = Math.min(...values);

      setMaxValue(max);
      setMinValue(min);
    }

    const handleResize = () => {
      setShowFixedSideBar((window.innerWidth > 899));         
    };  
   
    window.addEventListener('resize', handleResize); 
  
    return () => window.removeEventListener('resize', handleResize);
  }, [children, marks]);  

  const scrollToSection = (section: string, offset: number = 0) => {
    scroller.scrollTo(section, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: offset,
    });
  };

  const handleSliderChange = (sessionValue: number) =>{
    if (isScrolling) {
      return;
    }
    setIsScrolling(true);   

    var sessionName = marks.find(mark => mark.value === sessionValue)?.label as string; 
    scrollToSection(sessionName, -80)            
    setSliderValue(sessionValue);
    setTimeout(() => setIsScrolling(false), 500);
  }

  const handleSectionActive = (section: string) => {
    if (isScrolling) {
      return;
    }

    setIsScrolling(true);   
    var sessionValue = marks.find(mark => mark.label === section)?.value as number;          
    setSliderValue(sessionValue);   
    setTimeout(() => setIsScrolling(false), 150);
  };
  
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <Box sx={{ display: 'none' }}>
        {!!marks && marks.map((session) => (          
          <Link 
            activeClass="active" 
            to={session.label} 
            spy={true}                  
            onSetActive={handleSectionActive}
            offset={-80}
          />))}
      </Box>
      {showFixedSideBar &&
       <Box
        sx={{
          flex: '0 0 14%',
          minWidth: '300px',
          backgroundColor: 'lightblue'             
        }}
      >
       <SideBar isInTemporaryDrawer={false}/> 
      </Box>
      }
      <Box
        sx={{
          flex: '1 1 auto',
            padding: '40px 80px 40px 80px',          
            overflow: 'auto',
            borderLeft: '1px solid black',
            borderColor: 'hsl(215, 15%, 92%);'
        }}
      >
        {children}
      </Box>
      {!!marks && <Box
        sx={{
          flex: '0 0 14%',
          position: 'relative',         
          zIndex: 1000, 
          '@media (max-width: 1920px)': {
            flex: '0 0 14%'          
          },
          '@media (max-width: 1728px)': {
            flex: '0 0 16%'          
          },
          '@media (max-width: 1570px)': {
            flex: '0 0 18%'          
          },      
          '@media (max-width: 1412px)': {
            flex: '0 0 19%'          
          },
          '@media (max-width: 1300px)': {
            display: 'none'          
          },          
        }}
      >
        <Typography variant="h6" sx={{ position: 'fixed',right: 180,  padding: '10px'}}>Contents</Typography>
        <Slider
          value={sliderValue}
          aria-label="Always visible"
          orientation="vertical"
          defaultValue={70}
          min={minValue}
          max={maxValue}
          step={10}
          marks={marks}
          track={'inverted'}
          sx={{ height: marks.length * 50,  marginTop: '60px',position: 'fixed',right: 200,
          '& .MuiSlider-markLabel': { 
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'ellipsis',
            },
            '& .MuiSlider-markLabelActive': {
              color: '#49a2e8',
              fontWeight: 'bold'
            },           
           }}
          onChange={(event: Event) => handleSliderChange(event.target?.value)}
        />
      </Box>}
    </Box>
    </>
  );
};

Master.propTypes = {
  children: PropTypes.any,
  marks:  PropTypes.arrayOf<string>
};

export default Master;