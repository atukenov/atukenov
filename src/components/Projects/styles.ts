import styled from "styled-components";

export const ProjectList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
export const ProjectItem = styled.div`
  height: 220px;
  flex-basis: calc(100% / 3);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 769px) {
    flex-basis: 100%;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #000;
  width: 90%;
  height: 90%;
`;
export const Title = styled.h1`
  text-align: center;
`;
export const Website = styled.div`
  text-align: center;
`;
