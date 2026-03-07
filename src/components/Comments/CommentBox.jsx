import React, { useState, useRef } from 'react';
import useDynamicHeightField from '../../hooks/useDynamicHeightField';
import styled, { css } from 'styled-components';

import Toast from '../Toast/Toast';
import { CommentInput, CommentTextArea } from '../Input/Input';
import { CommentSendButton, CommentCancelButton } from '../Button/Button';

//icons
import { CheckSVG } from '../../resources/styles/icons';
import { ErrorSVG } from '../../resources/styles/icons';

// helpers
import { Analytics } from "../../helpers/analytics";
import { nameInput, commentPrompt, cancel, submit } from "../../helpers/text";

const INITIAL_HEIGHT = 46;

const Container = styled.div`
  font-family: 'Raleway', sans-serif;
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  margin: 50px auto;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 14px;
  transition: min - height 0.4s ease;
  max-height: 90px;
  ${props => props.modified && css`
    max-height: unset;
  `}
  ${props => props.expanded && css`
    .header {
      transform: translateY(10px);
      opacity: 1;
      visibility: visible;
    }
    .actions {
      opacity: 1;
    }
    .comment-field {
      transform: translateY(40px);
    }
  `}
`;

const Header = styled.div`
  transition: opacity 0.4s 0.2s ease;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-40px);
  width: 90%;
`;

const Label = styled.label`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  margin-top: 50px;
  opacity: 0;
  transition: opacity 0.4s 0.2s ease;
`;

const CommentBox = ({ setLoading, language }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [list, setList] = useState([]);

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const handleOnReset = () => {
    setName('');
    setComment('');
  };

  const createToast = type => {
    const id = Math.floor((Math.random() * 100) + 1);
    const toast = {
      id,
      title: type === 'Success' ? 'Success' : 'Error',
      description: type === 'Success' ? 'Successfully Made Comment' : 'Failed To Make Comment',
      backgroundColor: type === 'Success' ? '#5cb85c' : '#d9534f',
      icon: type === 'Success' ? <CheckSVG /> : <ErrorSVG />
    }
    let array = [];
    array.push(...list, toast);
    setList(array);
  };

  const handleSubmitComment = () => {
    const commentObj = {
      comment: comment,
      name: name,
    }

    fetch('https://heyitsmeharv-backend.herokuapp.com/comments/add', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(commentObj)
    }).then(response => {
      if (response.ok) {
        createToast('Success');
        setLoading(true);
        Analytics.event('Comment Success', {
          category: 'Comment',
          action: 'Successfully sent a comment',
          label: 'Submit'
        });
      } else {
        createToast('Fail');
        Analytics.event('Comment Failure', {
          category: 'Contact Me',
          action: 'Failed to send a comment',
          label: 'Submit'
        });
      }
    })
      .catch(error => {
        console.log(`Unable to submit comment: ${error}`);
        Analytics.event('Comment Failure', {
          category: 'Contact Me',
          action: 'Failed to send a comment',
          label: 'Submit'
        });
      });
    handleOnReset();
  }

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  }

  const onChange = (e) => {
    setComment(e.target.value);
  }

  const onClose = () => {
    handleOnReset();
    setIsExpanded(false);
  };

  useDynamicHeightField(textRef, comment);

  return (
    <Container
      className="comment-box"
      ref={containerRef}
      expanded={isExpanded}
      collapsed={!isExpanded}
      modified={comment && comment.length > 0}
      style={{
        minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
      }}
    >
      <Header className="header">
        <CommentInput
          onChange={(e) => setName(e.target.value)}
          placeholder={nameInput(language)}
          value={name}
          name="name"
        />
      </Header>
      <Label htmlFor="comment">What are your thoughts?</Label>
      <CommentTextArea
        ref={textRef}
        onClick={onExpand}
        onFocus={onExpand}
        onChange={onChange}
        className="comment-field"
        placeholder={commentPrompt(language)}
        value={comment}
        name="comment"
        id="comment-field"
      />
      <Actions className="actions">
        <CommentCancelButton className="cancel" onClick={() => onClose()}>
          {cancel(language)}
        </CommentCancelButton>
        <CommentSendButton
          onClick={() => handleSubmitComment()}
          disabled={comment.length === 0 || name.length === 0}
        >
          {submit(language)}
        </CommentSendButton>
      </Actions>
      <Toast toastList={list} />
    </Container>
  );
};

export default CommentBox;