import styled from 'styled-components';
import { space, color, layout } from 'styled-system';

export const Box = styled('div')(
  { boxSizing: 'border-box' },
  space,
  color,
  layout
);
