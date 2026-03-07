import React from 'react';
import styled from "styled-components";

// animations
import SlideInLeft from "../animations/SlideInLeft";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  background-color: #f8f9fa;
  color: #343a40;
  animation: ${SlideInLeft} 0.5s forwards;
`;

const Message = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Message>404</Message>
      <Description>Oops! The page you're looking for doesn't exist.</Description>
    </Container>
  );
};

export default NotFoundPage;
