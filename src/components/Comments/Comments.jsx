import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import hdate from "human-date";

import CommentBox from './CommentBox';

import Loader from '../Loader/Loader';

// helpers
import { comment, commentText } from "../../helpers/text";

const Container = styled.section`
  width: 100%;
  max-height: 100%;
  background: ${({ theme }) => theme.primary};
`;

const CommentList = styled.div`
  width: 100%;
  max-height: 100%;
  padding: 4rem 0;
  background: ${({ theme }) => theme.secondary};
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.separator};
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.direction};
  align-items: baseline;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-family: 'Raleway';
  font-weight: 600;
  text-align: center;
`;

const Text = styled.p`
  font-family: 'Raleway';
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  line-height: 25px;
  font-weight: 600;
`;

const Comment = styled.div`
  display: flex;
  background: ${({ theme }) => theme.primary};
  border: 2px solid white;
  max-width: 400px;
  margin: 50px auto;
  box-shadow: 0 0 8px rgb(0 0 0 / 20%);
  padding: 14px;
`;

const Message = styled.div`
  font-family: 'Raleway';
  font-weight: 600;
  font-size: 20px;
  padding: 10px 0px;
  margin-bottom: 5px;
`;

const Author = styled.p`
  font-family: 'Raleway';
  font-weight: 600;
  font-size: 18px; 
  margin-right: auto;
`;

const Timestamp = styled.p`
  font-family: 'Raleway';
  font-weight: 600;
  font-size: 18px; 
`;

const Comments = ({ language }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://heyitsmeharv-backend.herokuapp.com/comments/')
      .then(response => {
        return response.json();
      }).then(comment => {
        setComments(comment);
        setLoading(false);
      })
      .catch(error => {
        console.log(`Unable to get comments: ${error}`)
      })
  }, [loading]);

  return (
    <Container>
      <Title>{comment(language)}</Title>
      <Separator />
      <Text>{commentText(language)}</Text>
      <CommentBox setLoading={setLoading} language={language} />
      {comments.length !== 0 ?
        <CommentList>
          {comments.map((item, i) => {
            const nameCapitalized = item.name.charAt(0).toUpperCase() + item.name.slice(1)
            const timestamp = hdate.prettyPrint(item.createdAt);
            return (
              <Comment key={i}>
                <FlexWrapper direction="column">
                  <FlexWrapper direction="row">
                    <Author>{nameCapitalized}</Author>
                    <Timestamp>{timestamp}</Timestamp>
                  </FlexWrapper>
                  <Message>{item.comment}</Message>
                </FlexWrapper>
              </Comment>
            )
          })}
        </CommentList>
        : // <div style={{ height: "100px" }}><Loader /></div>}
        null}
    </Container>
  );
}

export default Comments;