import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 35%,
    rgba(255, 255, 255, 1) 35%
  );
  padding: 25px 10%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 5px 0 rgb(233 240 243 / 50%), 0 0 0 1px #e6ecf8;
  flex-wrap: wrap;
  width: 100%;
`;
export const Skill = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  min-width: 280px;
  border-right: 1px solid #e6ecf8;
  &:last-child {
    border-right: 0;
  }
  @media only screen and (max-width: 769px) {
    border-bottom: 1px solid #e6ecf8;
    border-right: 0;
    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const Icon = styled.div``;
export const Name = styled.h1``;
export const Desc = styled.p``;
export const Things = styled.div``;
export const Tools = styled.div``;
