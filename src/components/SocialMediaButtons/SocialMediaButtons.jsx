import styled, { css, keyframes } from "styled-components";
import { motion, AnimatePresence } from 'motion/react';
import { size } from "../../helpers/breakpoints";

import {
  FacebookMSS,
  FacebookMS,
  FacebookMM,
  FacebookML,
  FacebookT,
  FacebookL,
  FacebookLL,
  FacebookD,
  FacebookDL,
  TwitterMSS,
  TwitterMS,
  TwitterMM,
  TwitterML,
  TwitterT,
  TwitterL,
  TwitterLL,
  TwitterD,
  TwitterDL,
  GithubMSS,
  GithubMS,
  GithubMM,
  GithubML,
  GithubT,
  GithubL,
  GithubLL,
  GithubD,
  GithubDL,
  LinkedInMSS,
  LinkedInMS,
  LinkedInMM,
  LinkedInML,
  LinkedInT,
  LinkedInL,
  LinkedInLL,
  LinkedInD,
  LinkedInDL,
} from "../../animations/SocialMediaIcons.js";

export const SocialMediaButton = styled(motion.button)`
  background: none;
  outline: none !important;
  border: none;
  top: 30%;
  left: 49%;
  z-index: -1;
  position: absolute;
  :hover {
    cursor: pointer;
  }
 
  ${props => props.animation === 'Facebook' && css`
    @media only screen and  only screen and (min-width: ${size.mobileSS}) {
      animation-name: ${FacebookMSS}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileS}) {
      animation-name: ${FacebookMS}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileM}) {
      animation-name: ${FacebookMM}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileL}) {
      animation-name: ${FacebookML}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.tablet}) {
      animation-name: ${FacebookT}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptop}) {
      animation-name: ${FacebookL}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptopL}) {
      animation-name: ${FacebookLL}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktop}) {
      animation-name: ${FacebookD}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktopL}) {
      animation-name: ${FacebookDL}; 
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
  `}

  ${props => props.animation === 'LinkedIn' && css`
    @media only screen and (min-width: ${size.mobileSS}) {
      animation-name: ${LinkedInMSS}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileS}) {
      animation-name: ${LinkedInMS}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileM}) {
      animation-name: ${LinkedInMM}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileL}) {
      animation-name: ${LinkedInML}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.tablet}) {
      animation-name: ${LinkedInT}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptop}) {
      animation-name: ${LinkedInL}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptopL}) {
      animation-name: ${LinkedInLL}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktop}) {
      animation-name: ${LinkedInD}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktopL}) {
      animation-name: ${LinkedInDL}; 
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
  `}

  ${props => props.animation === 'Twitter' && css`
    @media only screen and (min-width: ${size.mobileSS}) {
      animation-name: ${TwitterMSS}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileS}) {
      animation-name: ${TwitterMS}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileM}) {
      animation-name: ${TwitterMM}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileL}) {
      animation-name: ${TwitterML}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.tablet}) {
      animation-name: ${TwitterT}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptop}) {
      animation-name: ${TwitterL}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptopL}) {
      animation-name: ${TwitterLL}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktop}) {
      animation-name: ${TwitterD}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktopL}) {
      animation-name: ${TwitterDL}; 
      animation-duration: 1.4s;
      animation-fill-mode: forwards;
    }
  `}

  ${props => props.animation === 'Github' && css`
    @media only screen and (min-width: ${size.mobileSS}) {
      animation-name: ${GithubMSS}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileS}) {
      animation-name: ${GithubMS}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileM}) {
      animation-name: ${GithubMM}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.mobileL}) {
      animation-name: ${GithubML}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.tablet}) {
      animation-name: ${GithubT}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptop}) {
      animation-name: ${GithubL}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.laptopL}) {
      animation-name: ${GithubLL}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktop}) {
      animation-name: ${GithubD}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
    @media only screen and (min-width: ${size.desktopL}) {
      animation-name: ${GithubDL}; 
      animation-duration: 1.6s;
      animation-fill-mode: forwards;
    }
  `}
`;