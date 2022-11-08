import React from "react";
import {
  CardItem,
  Cards,
  Circle,
  Col,
  Container,
  Cross,
  Header,
  Info,
  Item,
  Logo,
  Row,
  Social,
  SocialItem,
  Socials,
  SocialTitle,
  Square,
  Title,
} from "./styles";

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Logo>
            <Circle />
            <Cross />
            <Square />
            <Title>AMAKENZI</Title>
          </Logo>
          <Info>Comgin soon</Info>
          <Social>
            <SocialTitle>Connect with us</SocialTitle>
            <Socials>
              <SocialItem>
                <i className="fa-brands fa-instagram"></i>
              </SocialItem>
              <SocialItem>
                <i className="fa-brands fa-github"></i>
              </SocialItem>
              <SocialItem>
                <i className="fa-brands fa-linkedin-in"></i>
              </SocialItem>
            </Socials>
          </Social>

          <Cards>
            <CardItem>
              <i className="fa-brands fa-cc-mastercard"></i>
            </CardItem>
            <CardItem>
              <i className="fa-brands fa-cc-visa"></i>
            </CardItem>
          </Cards>
        </Col>
        <Col>
          <Row>
            <Col>
              <Header>My Projects</Header>
              <Item>Project 1</Item>
              <Item>Project 2</Item>
              <Item>Project 3</Item>
              <Item>Project 4</Item>
            </Col>
            <Col>
              <Header>Other Links</Header>
              <Item>Link 1</Item>
              <Item>Link 2</Item>
            </Col>
            <Col>
              <Header>Working?</Header>
              <Item>Work with me</Item>
              <Item>Freelance me</Item>
              <Item>Give me a job</Item>
            </Col>
          </Row>
        </Col>
        <Col>
          <Header>Address</Header>
          <Item>
            777 Wonderful st.,
            <br /> Atyrau, Kazakhstan,
            <br /> 060000
          </Item>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
