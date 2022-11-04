import React from "react";
import Section from "../../common/Section/Section";

import { ProjectItem, ProjectList, Title, Website, Wrapper } from "./styles";

const Projects = () => {
  return (
    <Section
      title="My Recent Projects"
      description={`Here are a few past design projects I've worked on. Want to see more?`}
    >
      <ProjectList>
        <ProjectItem>
          <Wrapper>
            <Title>LineZ</Title>
            <Website>www.linez.kz</Website>
            <div>fdaf</div>
          </Wrapper>
        </ProjectItem>
        <ProjectItem>
          <Wrapper>
            <Title>LineZ</Title>
            <Website>www.linez.kz</Website>
          </Wrapper>
        </ProjectItem>
        <ProjectItem>
          <Wrapper>
            <Title>LineZ</Title>
            <Website>www.linez.kz</Website>
          </Wrapper>
        </ProjectItem>
        <ProjectItem>
          <Wrapper>
            <Title>LineZ</Title>
            <Website>www.linez.kz</Website>
          </Wrapper>
        </ProjectItem>
        <ProjectItem>
          <Wrapper>
            <Title>LineZ</Title>
            <Website>www.linez.kz</Website>
          </Wrapper>
        </ProjectItem>
      </ProjectList>
    </Section>
  );
};

export default Projects;
