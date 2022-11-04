import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 25px 0;
`;
export const Left = styled.div`
  font-family: "Anton", sans-serif;
  font-size: 40px;
  z-index: 100;
  span {
    font-family: "Anton", sans-serif;
    color: black;
    transition: color 500ms ease-in-out;
  }
  span.open {
    margin-left: 10px;
    color: white;
  }
`;
export const Right = styled.div`
  z-index: 100;
`;
export const Burger = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 40px;
  cursor: pointer;

  &.open {
    * {
      background-color: white;
      transition: all 1s ease-in-out;
    }
    *:first-child {
      transform: rotate(135deg);
      transform-origin: 18px 12px;
    }
    *:nth-child(2) {
      display: none;
    }
    *:last-child {
      transform: rotate(-135deg);
      transform-origin: 21px 0;
    }
  }
`;
export const BurgerLine = styled.div`
  height: 5px;
  width: 40px;
  background-color: black;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Item = styled.div`
  cursor: pointer;
  padding: 3px 10px 3px 10px;
  color: black;
  border-right: 1px solid black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: all 500ms ease-in-out;
  &:last-child {
    border: none;
    border-radius: 0;
    margin-left: 10px;
    padding: 0;
  }
  &:last-child:hover {
    background-color: transparent;
    margin-right: 0;
    margin-left: 10px;
  }
  &:hover {
    color: white;
    background-color: black;
    margin-right: 10px;
    margin-left: 15px;
  }
`;
export const Sider = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 270px;
  height: 100vh;
  overflow: hidden;
`;
export const SiderWrapper = styled.div`
  padding-top: 20px;
  position: absolute;
  width: 270px;
  height: 100vh;
  top: 0;
  right: -350px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 500ms ease-in-out;

  &.open {
    right: 0;
  }
`;
export const SliderItem = styled.div`
  cursor: pointer;
  padding: 10px 10px 10px 10px;
  color: white;
  border-radius: 10px;
  transition: all 500ms ease-in-out;

  &:first-child {
    margin-top: 110px;
  }
  &:last-child {
    border: none;
    border-radius: 0;
    padding: 0;
    padding-top: 8px;
  }
  &:last-child:hover {
    background-color: transparent;
    margin: 0;
  }
  &:hover {
    color: black;
    background-color: white;
    transform: scale(1.1);
  }
`;
