import { merge } from 'lodash';
import Card from './Card';
import Input from './Input';
import Typography from './Typography';
import IconButton from './IconButton';

const ComponentsOverrides = (theme) => {
  return merge(
    Card(theme),
    Input(theme),
    Typography(theme),
    IconButton(theme),
  );
};

export default ComponentsOverrides;