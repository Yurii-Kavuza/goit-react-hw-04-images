import * as SC from './Button.styled';

const Button = ({ text, buttonHandler }) => (
  <SC.Button onClick={buttonHandler} type="button">
    {text}
  </SC.Button>
);

export default Button;
