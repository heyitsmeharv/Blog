import React from "react";
import styled, { keyframes } from "styled-components";

import { Github } from "@styled-icons/boxicons-logos/Github";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";

import SlideInBottom from "../../animations/SlideInBottom";
import ProfileImg from "../../resources/images/Profile.jpg";
import {
  contactMe,
  githubProfileLabel,
  linkedinProfileLabel,
  locationText,
  openToWorkText,
  roleTitleText,
} from "../../helpers/i18nText";
import { ContactMeButton } from "../Button/Button";

const HeroSection = styled.section`
  width: 100%;
  padding: 7rem 0;
  animation: ${SlideInBottom} 0.5s forwards;

  @media only screen and (max-width: 900px) {
    padding: 5rem 0;
  }

  @media only screen and (max-width: 600px) {
    padding: 4rem 0;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 5rem);
  display: flex;
  align-items: center;
  gap: 5rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 3rem;
  }
`;

const ProfileImage = styled.img`
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  @media only screen and (max-width: 768px) {
    width: 16rem;
    height: 16rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  }

  50% {
    box-shadow: 0 0 0 16px rgba(16, 185, 129, 0);
  }
`;

const OpenToWorkBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #d1fae5;
  color: #065f46;
  border-radius: 999px;
  padding: 0.5rem 1.4rem;
  font-size: 1.3rem;
  font-weight: 700;
  width: fit-content;
  letter-spacing: 0.2px;
  animation: ${pulse} 2s ease-in-out infinite;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    background: #10b981;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  @media only screen and (max-width: 768px) {
    align-self: center;
  }
`;

const Name = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;

  @media only screen and (max-width: 768px) {
    font-size: 3.6rem;
  }

  @media only screen and (max-width: 400px) {
    font-size: 3rem;
  }
`;

const RoleTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
`;

const Location = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  max-width: 54ch;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.text};
  }
`;

const GithubIcon = styled(Github)`
  width: 2rem;
  height: 2rem;
`;

const LinkedInIcon = styled(LinkedinSquare)`
  width: 2rem;
  height: 2rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 0.5rem;

  @media only screen and (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const HeroContactButton = styled(ContactMeButton)`
  margin-top: 0;
  margin-right: 0;
  height: 5rem;
  border-radius: 4px;
  padding: 0 2.4rem;
`;

const AccessibleIntroduction = ({ language, open, setOpen }) => {
  return (
    <HeroSection id="home">
      <Inner>
        <ProfileImage src={ProfileImg} alt="Adam Harvey" />
        <InfoWrapper>
          <OpenToWorkBadge>{openToWorkText(language)}</OpenToWorkBadge>
          <Name>Adam Harvey</Name>
          <RoleTitle>{roleTitleText(language)}</RoleTitle>
          <Location>{locationText(language)}</Location>
          <SocialRow>
            <SocialIconLink
              href="https://github.com/heyitsmeharv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={githubProfileLabel(language)}
              title="GitHub"
            >
              <GithubIcon />
            </SocialIconLink>
            <SocialIconLink
              href="https://www.linkedin.com/in/heyitsmeharv/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkedinProfileLabel(language)}
              title="LinkedIn"
            >
              <LinkedInIcon />
            </SocialIconLink>
          </SocialRow>
          <ActionRow>
            {!open && (
              <HeroContactButton
                layoutId="contact-morph"
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpen(true)}
              >
                {contactMe(language)}
              </HeroContactButton>
            )}
          </ActionRow>
        </InfoWrapper>
      </Inner>
    </HeroSection>
  );
};

export default AccessibleIntroduction;
