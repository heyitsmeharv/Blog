import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from 'motion/react';

export const StyledButton = styled(motion.button)`
  color: ${({ theme }) => theme.text};
  font-family: 'Raleway', sans-serif;
  background: none;
  outline: none !important;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

export const StyledNavButton = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  background: none;
  outline: none !important;
  border: none;
  margin: 0 2rem;
  text-decoration: ${props => props.isActive ? 'underline' : 'none'};
  :hover {
    cursor: pointer;
  }

  ${props => props.disabled && css`
    cursor: not-allowed;
    pointer-events: none;
  `}
`;

export const StyledNavLink = styled(NavLink)` 
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

export const DownloadCVButton = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
  width: 20rem;
  height: 5rem;
  margin-top: 3rem;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  border: 2px solid;
  border-color: ${({ theme }) => theme.background};
  border-radius: 2px;
  background: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }
  :focus {
    text-decoration: underline;
  }
  @media only screen and (max-width: 375px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const ContactMeButton = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
  width: 20rem;
  margin-top: 3rem;
  margin-right: 3rem;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.primary};
  :focus {
    text-decoration: underline;
  }
  @media only screen and (max-width: 375px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const ContactMeSendButton = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
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
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.accent};
  }
  ${props => props.disabled && css`
    cursor: not-allowed;
    pointer-events: none;
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    :hover {
      background: #cccccc;
      color: #666666;
    }
  `}
`;

export const CommentSendButton = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
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
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.accent};
  }
  ${props => props.disabled && css`
    cursor: not-allowed;
    pointer-events: none;
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    :hover {
      background: #cccccc;
      color: #666666;
    }
  `}
`;

export const CommentCancelButton = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
  padding: 0 20px;
  border-radius: 2px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 44px;
  background: none;
  outline: none !important;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

export const ToastCloseButton = styled.button`
  font-family: 'Raleway', sans-serif;
  width: 25px;
  height: 25px;
  color: white;
  background: none;
  outline: none;
  border: none;
  margin-left: auto;
`;

export const CopyButton = styled.button`
  position: absolute;
  right: 0;
  margin: 0;
  padding: 1rem;
  border-radius: 2rem;
  font-family: 'Raleway', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
  }
`;