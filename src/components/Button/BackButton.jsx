import React from "react";
import styled from "styled-components";
import { ChevronBackCircle } from "@styled-icons/ionicons-solid/ChevronBackCircle";
import { StyledNavButton, StyledNavLink } from "./Button";

const StyledBackIcon = styled(ChevronBackCircle)`
  color: ${({ theme }) => theme.secondary};
  width: 3.4rem;
  height: 3.4rem;
  transition: color 0.5s ease;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.text};
  }
`;

const BackButton = () => (
  <StyledNavButton>
    <StyledNavLink exact to="/blog">
      <StyledBackIcon />
    </StyledNavLink>
  </StyledNavButton>
);

export default BackButton;