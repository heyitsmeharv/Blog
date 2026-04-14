import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ToastInRight from "../../animations/ToastInRight";

import { ToastCloseButton } from "../Button/Button";
import { StyledClose } from "../../resources/styles/icons";

const Container = styled.div`
  width: 280px;
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1100;
`;

const Wrapper = styled.div`
  animation: ${ToastInRight} 0.7s;
  transition: transform 0.6s ease-in-out;
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Box = styled.div`
  width: 75%;
  padding: 10px 0 12px;
`;

const Icon = styled.div`
  svg {
    margin: 10px;
  }
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

const Text = styled.p`
  font-size: 14px;
  color: white;
  margin: 6px 0 0;
`;

const Toast = ({ toastList }) => {
  const [list, setList] = useState([]);

  const deleteToast = (itemId) => {
    setList((currentList) => currentList.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    setList(toastList);
  }, [toastList]);

  useEffect(() => {
    if (!list.length) {
      return undefined;
    }

    const timeouts = list.map((toast) =>
      setTimeout(() => {
        deleteToast(toast.id);
      }, 5000),
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [list]);

  return (
    <Container role="region" aria-label="Notifications">
      {list.map((toast) => (
        <Wrapper
          key={toast.id}
          style={{ backgroundColor: toast.backgroundColor }}
          role="status"
          aria-live="polite"
        >
          <FlexWrapper>
            <Icon aria-hidden="true">{toast.icon}</Icon>
            <Box>
              <FlexWrapper>
                <Title>{toast.title}</Title>
                <ToastCloseButton
                  onClick={() => deleteToast(toast.id)}
                  aria-label={`Dismiss ${toast.title} notification`}
                >
                  <StyledClose />
                </ToastCloseButton>
              </FlexWrapper>
              <Text>{toast.description}</Text>
            </Box>
          </FlexWrapper>
        </Wrapper>
      ))}
    </Container>
  );
};

export default Toast;
