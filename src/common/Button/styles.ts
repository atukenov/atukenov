import styled from "styled-components";
import { ButtonProps } from "../../types";

export const CustomButton = styled.button<ButtonProps>`
  cursor: pointer;
  color: ${(p) => (p.color ? p.color : "black")};
  background: ${(p) => (p.background ? p.background : "transparent")};
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${(p) => (p.borderColor ? p.borderColor : "black")};
  transition: all 500ms ease-in-out;
  position: relative;

  &:hover {
    color: white;
    background: black;
  }
  /* &::after {
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;
    background-color: red;
  } */
`;
