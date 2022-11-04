import React, { FC } from "react";
import { ButtonProps } from "../../types";
import { CustomButton } from "./styles";

const Button: FC<ButtonProps> = ({ name, background, borderColor, color }) => {
  return (
    <CustomButton
      background={background}
      borderColor={borderColor}
      color={color}
    >
      {name}
    </CustomButton>
  );
};

export default Button;
