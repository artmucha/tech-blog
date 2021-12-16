import { createTheme } from '@mui/material/styles';

import palette from './palette';
import shape from './shape';
import typography from './typography';
import { customShadows, shadows } from './shadows';

const theme = createTheme({ 
	palette,
	shape,
	typography,
	shadows,
	customShadows
});

export default theme;