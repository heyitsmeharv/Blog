import React from "react";
import styled from "styled-components";

// components
import { ContactMeButton, DownloadCVButton } from "../Button/Button";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// images
import ProfileImg from "../../resources/images/Profile.jpg";

// helpers
import { Analytics } from "../../helpers/analytics";
import { introductionText, contactMe, curriculumVitaeButtonText } from "../../helpers/text";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const IntroWrapper = styled.div`
  animation: ${SlideInBottom} 0.5s forwards;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  border-radius: 30%;
  width: 30rem;
  margin: 0 4rem;
  @media only screen and (max-width: 600px) {
    width: 30rem;
  }
  @media only screen and (max-width: 375px) {
    width: 25rem;
  }
`;

const Intro = styled.h1`
  color: ${({ theme }) => theme.background};
  animation: ${SlideInBottom} 0.5s forwards;
  display: flex;
  align-items: center;
  height: fit-content;
  border-radius: 35px;
  font-size: 4rem;
  line-height: 1.5;
  letter-spacing: 3.2px;
  font-weight: 600;
  width: 100%;
  @media only screen and (max-width: 600px) {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 5%;
  }
`;

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.text};
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }
`;

const Introduction = ({ language, open, setOpen }) => {
  return (
    <Container>
      <ProfileImage src={ProfileImg} />
      <IntroWrapper>
        <Intro>
          {introductionText(language)}
        </Intro>
        <ButtonWrapper>
          <ContactMeButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
          >
            {contactMe(language)}
          </ContactMeButton>
          <DownloadCVButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <StyledAnchor
              target="_blank"
              rel="noopener noreferrer"
              href="https://heyitsmeharv.s3.eu-west-2.amazonaws.com/AH_CV.pdf"
              onClick={() =>
                Analytics.event("file_download", {
                  link_url: "https://heyitsmeharv.s3.eu-west-2.amazonaws.com/AH_CV.pdf",
                  file_name: "AH_CV.pdf",
                  file_extension: "pdf",
                  link_label: "Curriculum Vitae",
                })
              }
            >
              {curriculumVitaeButtonText(language)}
            </StyledAnchor>
          </DownloadCVButton>
        </ButtonWrapper>
      </IntroWrapper >
    </Container >
  );
};

export default Introduction;
