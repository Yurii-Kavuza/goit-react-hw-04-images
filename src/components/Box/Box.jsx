import styled from 'styled-components';
import { space, color, layout, flexbox } from 'styled-system';

const Box = styled('div')(
  { boxSizing: 'border-box' },
  space,
  color,
  layout,
  flexbox
);

export default Box;