import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material';

const TypingEffect = ({prefixText, texts, textThemes, prefixSx, sx}) => {
  
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(null);
  
  const typingSpeed = 75; // Velocidade da digitação
  const deletingSpeed = 0; // Velocidade da deleção
  const delay = 1500; // Pausa entre textos

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = texts[textIndex];
      setCurrentTheme(textThemes[textIndex]);

      if (isDeleting) {
        setDisplayText(currentText.substring(0, charIndex));
        setCharIndex((prev) => prev - 1);
      } else {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout); // Limpa o timeout
  }, [charIndex, isDeleting, textIndex, texts, prefixText]);

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center' }}>
        <Typography variant="h2"  align='left' sx={prefixSx} style={{ fontFamily: 'Arial, sans-serif',  display: 'inline' }}>
        {prefixText}{'\u00A0'}
        </Typography>     
        <Typography variant="h2"  align='left' sx={{ ...currentTheme, ...sx }} style={{ fontFamily: 'Arial, sans-serif', display: 'inline' }}>
        {displayText}
        </Typography>
    </Box>    
  );
};

TypingEffect.propTypes = {
  texts: PropTypes.array,
  textThemes: PropTypes.array,
  prefixText: PropTypes.string,
  sx: PropTypes.object
};

TypingEffect.defaultProps = {
  texts: [],
  textThemes: [],
  prefixText: '',
  sx: {},  
};

export default TypingEffect;