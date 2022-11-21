import * as SC from './Button.styled';

const Button = ({ text, buttonHandler }) => (
  <SC.Button onClick={buttonHandler}>{text}</SC.Button>
);

export default Button;
