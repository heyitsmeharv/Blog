import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ToastInRight from '../../animations/ToastInRight';

import { ToastCloseButton } from '../Button/Button';
import { StyledClose } from '../../resources/styles/icons';

const Container = styled.div`
  width: 250px;
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  top: 12px;
  right: 12px;
`;

const Wrapper = styled.div`
  animation: ${ToastInRight} .7s;
  transition: transform .6s ease-in-out;
  margin: 10px 0px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  width: 75%;
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
`;

const Text = styled.p`
  font-size: 14px;
  color: white;
`;

const Toast = ({ toastList }) => {
  const [list, setList] = useState([toastList]);

  const deleteToast = item => {
    const index = list.findIndex(e => e.id === item);
    list.splice(index, 1);
    setList([...list]);
  }

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, 1);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <Container>
      {list.map((toast, i) =>
        <Wrapper
          key={i}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <FlexWrapper>
            <Icon>{toast.icon}</Icon>
            <Box>
              <FlexWrapper>
                <Title>{toast.title}</Title>
                <ToastCloseButton onClick={() => deleteToast(toast)}><StyledClose /></ToastCloseButton>
              </FlexWrapper>
              <Text>{toast.description}</Text>
            </Box>
          </FlexWrapper>
        </Wrapper>
      )}
    </Container>
  )
}
export default Toast;
