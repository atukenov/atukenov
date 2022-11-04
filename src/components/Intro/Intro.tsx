import React from "react";
import { Container, Job, Title, Wrapper, Avatar } from "./styles";

const Intro = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Designer, Full-Stack Developer & Husband</Title>
        <Job>
          I design and code everything what I see{" "}
          <span style={{ letterSpacing: 0 }}>(o_o)</span>.
        </Job>
        <Avatar>Avatar</Avatar>
      </Wrapper>
    </Container>
  );
};

export default Intro;
