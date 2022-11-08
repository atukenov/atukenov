import styled from "styled-components";

export const Container = styled.div`
  background-color: black;
  padding: 25px 40px;
  color: white;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* align-items: center; */
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 0 10px; */
  padding: 5px 5px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.div`
  height: 20px;
  background: white;
  border-radius: 50%;
  width: 20px;
  margin-right: 15px;
`;
export const Cross = styled.div`
  margin-right: 15px;
  background: white;
  height: 25px;
  position: relative;
  width: 5px;
  transform: rotate(45deg);
  &:after {
    background: white;
    content: "";
    height: 5px;
    left: -10px;
    position: absolute;
    top: 10px;
    width: 25px;
  }
`;
export const Square = styled.div`
  height: 20px;
  width: 20px;
  background: white;
  margin-right: 10px;
`;
export const Title = styled.h1`
  font-size: 20px;
`;

export const Info = styled.div`
  padding: 5px 0 0 0;
`;
export const Social = styled.div`
  padding: 10px 0 0 0;
`;
export const SocialTitle = styled.h1`
  font-size: 10px;
  font-weight: 100;
`;
export const Socials = styled.div`
  display: flex;
`;
export const SocialItem = styled.div`
  padding: 5px 5px;
  font-size: 25px;
  &:hover {
    transform: scale(1.2);
  }
`;

export const Cards = styled.div`
  display: flex;
`;
export const CardItem = styled.div`
  padding: 0px 7px;
  font-size: 30px;
`;

export const Header = styled.h1`
  font-size: 17px;
  margin: 2px 0;
`;
export const Item = styled.p`
  font-size: 13px;
  margin: 2px 0px;
  &:hover {
    border-bottom: 1px solid white;
    transform: scale(1.1);
  }
`;
