import { useState } from 'react';
import { Grid, Stack, Box, Radio, Fade } from '@mui/material';

import { CarouselItem } from 'components/Carousel';

const Carousel = ({items, gap}) => {
  const [slide, setSlide] = useState(0);

  const handleChange = (e) => {
    setSlide(e.target.value);
  };

  return (
    <Grid 
      container
      sx={{
        position: 'relative',
        width: '100%',
        height: '50vh'
      }}
    >
      { 
        items.map((item, index) =>  (
          <Fade 
            key={index} 
            in={slide == index} 
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}>
            <Box>
              <CarouselItem post={item} />
            </Box>
          </Fade>
        ))
      }

      <Stack 
        direction="row"
        justifyContent="center"
        sx={{
          bottom: 0,
          width: '100%',
          position: 'absolute'
        }}
      >
      {
        items.map((button, index) => (
          <Radio
            key={index}
            checked={slide == index}
            onChange={handleChange}
            value={index}
            name="radio-buttons"
            inputProps={{ 'aria-label': index }}
          />
        ))
      }
      </Stack>
    </Grid>
  );
};

export { Carousel };