import { createTheme } from '@mui/material/styles';

import palette from './palette';
import shape from './shape';
import typography from './typography';
import { customShadows, shadows } from './shadows';
import componentsOverride from './overrides';

const theme = createTheme({ 
	palette,
	shape,
	typography,
	shadows,
	customShadows
});

theme.components = componentsOverride(theme);

export default theme;