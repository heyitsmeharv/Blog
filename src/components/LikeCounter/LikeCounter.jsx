
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styled from 'styled-components';

import Toast from '../Toast/Toast';

import Confetti from 'canvas-confetti';

//icons
import { CheckSVG } from '../../resources/styles/icons';
import { ErrorSVG } from '../../resources/styles/icons';
import { Like } from '@styled-icons/boxicons-solid/Like';

const Container = styled.div`
  background: ${({ theme }) => theme.secondary};
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px 5px 0;
`;

const StyledLikeIcon = styled(Like)`
  width: 25px;
  height: 25px;
`;

const StyledButton = styled(motion.button)`
  color: ${({ theme }) => theme.text};
  outline: none;
  background: none;
  border: 2px solid ${({ theme }) => theme.text};
;
  border-radius: 50%;
  padding: 10px;
`;

const StyledText = styled.p`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 2px
`;

const LikeCounter = () => {
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('https://heyitsmeharv-backend.herokuapp.com/likeCount/')
      .then(response => {
        return response.json();
      }).then(likeCount => {
        setCount(likeCount);
        setLoading(false);
      })
      .catch(error => {
        console.log(`Unable to get like count: ${error}`)
      })
  }, [loading]);

  const createToast = type => {
    const id = Math.floor((Math.random() * 100) + 1);
    const toast = {
      id,
      title: type === 'Success' ? 'Success' : 'Error',
      description: type === 'Success' ? 'Successfully Added Like' : 'Failed To Add Like',
      backgroundColor: type === 'Success' ? '#5cb85c' : '#d9534f',
      icon: type === 'Success' ? <CheckSVG /> : <ErrorSVG />
    }
    let array = [];
    array.push(...list, toast);
    setList(array);
  };

  const handleSubmitLike = () => {
    const likeObj = {
      likeCount: count[count.length - 1].likeCount + 1,
    }

    fetch('https://heyitsmeharv-backend.herokuapp.com/likeCount/add', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(likeObj)
    }).then(response => {
      if (response.ok) {
        createToast('Success');
        setLoading(true);
        Confetti();
      } else {
        createToast('Fail');
      }
    })
      .catch(error => {
        console.log(`Unable to submit like: ${error}`);
      });
  }

  return (
    <Container>
      <Wrapper>
        <StyledText>
          {count && count[count.length - 1]?.likeCount}
        </StyledText>
        <StyledButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSubmitLike()}>
          <StyledLikeIcon />
        </StyledButton>
      </Wrapper>
      <Toast toastList={list} />
    </Container>
  );
};

export default LikeCounter;