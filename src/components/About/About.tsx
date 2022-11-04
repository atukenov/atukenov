import React from "react";
import { Container, Description, Greedings, Wrapper } from "./styles";

const About = () => {
  return (
    <Container>
      <Wrapper>
        <Greedings>Hi, I'm Almaz. Nice to meet you!</Greedings>
        <Description>
          Since beginning my journey as a freelance designer over 11 years ago,
          I've done remote work for agencies, consulted for startups, and
          collaborated with talented people to create digital products for both
          business and consumer use. I'm quietly confident, naturally curious,
          and perpetually working on improving my chops one design problem at a
          time.
        </Description>
      </Wrapper>
    </Container>
  );
};

export default About;
