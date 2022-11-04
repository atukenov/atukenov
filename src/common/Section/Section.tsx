import React, { FC } from "react";
import { SectionProps } from "../../types";
import { Wrapper, Container, Description, Title, Content } from "./styles";

const Section: FC<SectionProps> = ({ title, description, children }) => {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Content>{children}</Content>
      </Wrapper>
    </Container>
  );
};

export default Section;
