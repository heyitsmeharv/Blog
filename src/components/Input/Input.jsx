import styled, { css } from 'styled-components';

export const ContactMeInput = styled.input`
  font-family: 'Raleway', sans-serif;
  width: 25%;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border: 2px solid ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.inputText};
  border-radius: 3px;
  ::placeholder {
    opacity: 0.5;
  }
  ${props => props.error && css`
    border: 2px solid red;
  `}
`;

export const ContactMeTextArea = styled.textarea`
  font-family: 'Raleway', sans-serif;
  width: 53%;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border: 2px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.inputText};
  border-radius: 3px;
  ::placeholder {
    opacity: 0.5;
  }
`;

export const CommentInput = styled.input`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  width: 50%;
  font-size: 18px;
  padding: 10px;
  border: none;
  color: ${({ theme }) => theme.inputText};
  border-radius: 3px;
  ::placeholder {
    opacity: 0.5;
  }
`;

export const CommentTextArea = styled.textarea`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  border: none;
  resize: none;
  color: ${({ theme }) => theme.inputText};
  transition: transform 0.4s ease;;
  font-size: 18px;
  padding: 10px;
  width: 100%;
  outline: none;
  min-height: 60px;
  transform: translateY(-32px);
  line-height: 1;
  ::placeholder {
    opacity: 0.5;
  }
`;