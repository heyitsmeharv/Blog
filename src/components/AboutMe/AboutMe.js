import React, { useState, useEffect } from "react";
import styled from "styled-components";

import hdate from 'human-date';

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// helpers
import { aboutMe, aboutMeText, aliveText } from "../../helpers/text";

const Container = styled.section`
  width: 100%;
  max-height: 100%;
  padding: 4rem 0;
  background: ${({ theme }) => theme.secondary};
  animation: ${SlideInBottom} 0.5s forwards;
  border: 2px solid transparent;
  :hover {
    transition: border .5s ease;
    border: 2px solid ${({ theme }) => theme.text};
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`;

const Text = styled.p`
  font-size: 2rem;
  letter-spacing: 1.4px;
  margin: 1rem 4rem;
  margin-top: 30px;
  text-align: center;
  font-weight: 600;
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.separator};
`;

const AboutMe = ({ language }) => {
  const [age, setAge] = useState(hdate.relativeTime(new Date("09-27-1993".replace(/-/g, "/")), { returnObject: true }));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(hdate.relativeTime(new Date("09-27-1993".replace(/-/g, "/")), { returnObject: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Title>{aboutMe(language)}</Title>
      <Separator />
      <Text>
        {aboutMeText(language)}
      </Text>
      {/* <Text>{aliveText(language, age)}</Text> */}
    </Container>
  )
}

export default AboutMe;