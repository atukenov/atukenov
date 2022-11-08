import React from "react";
import {
  Container,
  Desc,
  Icon,
  Name,
  Skill,
  Things,
  Tools,
  Wrapper,
} from "./styles";

const Skills = () => {
  return (
    <Container>
      <Wrapper>
        <Skill>
          <Icon>as</Icon>
          <Name>Development</Name>
          <Desc>
            Will create any type of website for your blog, portfolio, business.
          </Desc>
          <Things>da,da,da,da</Things>
          <Tools>da,da,da,da</Tools>
        </Skill>
        <Skill>
          <Icon>as</Icon>
          <Name>da</Name>
          <Desc>ddfasdfsdfaa</Desc>
          <Things>da,da,da,da</Things>
          <Tools>da,da,da,da</Tools>
        </Skill>
        <Skill>
          <Icon>as</Icon>
          <Name>da</Name>
          <Desc>ddfasdfsdfaa</Desc>
          <Things>da,da,da,da</Things>
          <Tools>da,da,da,da</Tools>
        </Skill>
      </Wrapper>
    </Container>
  );
};

export default Skills;
