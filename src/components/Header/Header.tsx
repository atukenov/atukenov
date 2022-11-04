import { useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import useWindowDimension from "../../utils/useWindowDimension";
import {
  Container,
  Item,
  Left,
  Right,
  Wrapper,
  Sider,
  Burger,
  BurgerLine,
  SiderWrapper,
  SliderItem,
} from "./styles";

const Header = () => {
  const { isMobile } = useWindowDimension();
  const [sider, setSider] = useState(false);

  const handleSlider = () => {
    if (document.body.style.overflow === "hidden")
      document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
    setSider((prev) => !prev);
  };

  return (
    <Container>
      <Left>
        AMA<span className={`${sider ? "open" : ""}`}>KENZI</span>
      </Left>
      <Right>
        {isMobile ? (
          <Burger onClick={handleSlider} className={`${sider ? "open" : ""}`}>
            <BurgerLine />
            <BurgerLine />
            <BurgerLine />
          </Burger>
        ) : (
          <Wrapper>
            <Item>About me</Item>
            <Item>Projects</Item>
            <Item>Services</Item>
            <Item>
              <Button name="Say Hello!" />
            </Item>
          </Wrapper>
        )}
      </Right>
      {isMobile && (
        <Sider>
          <SiderWrapper className={`${sider ? "open" : ""}`}>
            <SliderItem>About me</SliderItem>
            <SliderItem>Projects</SliderItem>
            <SliderItem>Services</SliderItem>
            <SliderItem>
              <Button
                name="Say Hello!"
                background="black"
                color="white"
                borderColor="white"
              />
            </SliderItem>
          </SiderWrapper>
        </Sider>
      )}
    </Container>
  );
};

export default Header;
