import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const focusRing = css`
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus || theme.text};
    outline-offset: 3px;
  }
`;

const baseButton = css`
  font-family: "Raleway", sans-serif;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }

  ${focusRing}
`;

export const StyledButton = styled(motion.button).attrs({ type: "button" })`
  ${baseButton}
  color: ${({ theme }) => theme.text};
`;

export const StyledNavButton = styled(motion.div)`
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 2rem;
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

export const StyledNavLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 4.4rem;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};

  ${focusRing}
`;

export const DownloadCVButton = styled(motion.button).attrs({ type: "button" })`
  ${baseButton}
  width: 20rem;
  height: 5rem;
  margin-top: 3rem;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  border: 2px solid ${({ theme }) => theme.background || theme.primary};
  border-radius: 2px;
  color: ${({ theme }) => theme.text};

  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }

  &:focus-visible {
    text-decoration: underline;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const ContactMeButton = styled(motion.button).attrs({ type: "button" })`
  ${baseButton}
  width: 20rem;
  margin-top: 3rem;
  margin-right: 3rem;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.primary};

  &:focus-visible {
    text-decoration: underline;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const ContactMeSendButton = styled(motion.button).attrs({
  type: "submit",
})`
  ${baseButton}
  height: 50px;
  min-width: 180px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.buttonColour};
  border-radius: 2px;
  color: ${({ theme }) => theme.buttonText};
  display: inline-block;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 44px;
  margin: 30px 14px;
  border: 2px solid ${({ theme }) => theme.accent};

  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.accent};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;

      &:hover {
        background: #cccccc;
        color: #666666;
      }
    `}
`;

export const CommentSendButton = styled(motion.button).attrs({
  type: "submit",
})`
  ${baseButton}
  padding: 0 20px;
  background-color: ${({ theme }) => theme.buttonColour};
  border-radius: 2px;
  color: ${({ theme }) => theme.buttonText};
  display: inline-block;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 44px;
  border: 2px solid ${({ theme }) => theme.primary};

  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.accent};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;

      &:hover {
        background: #cccccc;
        color: #666666;
      }
    `}
`;

export const CommentCancelButton = styled(motion.button).attrs({
  type: "button",
})`
  ${baseButton}
  padding: 0 20px;
  border-radius: 2px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 44px;
`;

export const ToastCloseButton = styled.button.attrs({ type: "button" })`
  ${baseButton}
  width: 25px;
  height: 25px;
  color: white;
  margin-left: auto;
`;

export const CopyButton = styled.button.attrs({ type: "button" })`
  ${baseButton}
  position: absolute;
  right: 0;
  margin: 0;
  padding: 1rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  font-weight: 800;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
  }
`;
