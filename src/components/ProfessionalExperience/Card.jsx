import React from "react";
import styled from "styled-components";

import SlideInBottom from '../../animations/SlideInBottom';

const Container = styled.div`
  width: 450px;
  min-height: 600px;
  min-width: 180px;
  margin: 30px;
  padding: 50px;
  background: ${({ theme }) => theme.secondary};
  border-radius: 13px;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 375px) {
    min-width: 170px;
  }
  :hover {
    transition: border .5s ease;
    border: 2px solid ${({ theme }) => theme.text};
  }
`;

const Title = styled.h1`
  animation: ${SlideInBottom} 1s forwards;
  color: ${({ theme }) => theme.text};
  font-size: 3rem;
  line-height: 38px;
  margin: 30px;
  font-weight: 600;
  text-align: center;
`;

const Text = styled.p`
  font-size: 2rem;
  letter-spacing: 1.4px;
  text-align: center;
  overflow-wrap: anywhere;
`;

const Card = ({ icon, title, text }) => {
  return (
    <Container>
      {icon}
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Container>
  );
};

export default Card;
