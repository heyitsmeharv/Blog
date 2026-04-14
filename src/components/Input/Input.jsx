import styled, { css } from "styled-components";

const fieldStyles = css`
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  padding: 10px;
  border-radius: 3px;
  color: ${({ theme }) => theme.inputText};
  background: ${({ theme }) => theme.inputBackground || "#fff"};

  &::placeholder {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus || theme.text};
    outline-offset: 2px;
  }
`;

export const ContactMeInput = styled.input`
  ${fieldStyles}
  width: 100%;
  margin: 0;
  border: 2px solid ${({ theme }) => theme.accent};

  ${({ error }) =>
    error &&
    css`
      border-color: #b91c1c;
    `}
`;

export const ContactMeTextArea = styled.textarea`
  ${fieldStyles}
  width: 100%;
  margin: 0;
  min-height: 18rem;
  resize: vertical;
  border: 2px solid ${({ theme }) => theme.accent};
`;

export const CommentInput = styled.input`
  ${fieldStyles}
  font-weight: 600;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.secondary};
`;

export const CommentTextArea = styled.textarea`
  ${fieldStyles}
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.secondary};
  resize: vertical;
  transition: transform 0.4s ease;
  width: 100%;
  min-height: 60px;
  transform: translateY(-32px);
  line-height: 1.4;
`;
