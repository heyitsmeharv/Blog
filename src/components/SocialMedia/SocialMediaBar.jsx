import React from "react";
import styled from "styled-components";

import { StyledButton } from '../Button/Button';

// icons
import {
  StyledFacebookCircle,
  StyledLinkedinSquare,
  StyledTwitter,
  StyledGithub,
} from "../../resources/styles/icons";

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  @media only screen and (max-width: 375px) {
    padding: 2rem 0rem;
  }
`;

const socialMediaButtons = [
  { icon: <StyledGithub />, link: "https://github.com/heyitsmeharv" },
  { icon: <StyledLinkedinSquare />, link: "https://www.linkedin.com/in/heyitsmeharv/" }
];

const SocialMediaBar = () => {
  return (
    <Wrapper>
      {socialMediaButtons.map((button, key) => {
        return (
          <StyledButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={key}>
            <a target='_blank' href={button.link}>
              {button.icon}
            </a>
          </StyledButton>
        );
      })}
    </Wrapper>
  );
};

export default SocialMediaBar;
