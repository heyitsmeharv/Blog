import React, { useContext } from "react";
import styled from "styled-components";

// context
import { LanguageContext } from "../../context/languageContext";

// components
import { StyledNavButton, StyledNavLink } from '../Button/Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin-top: -60px;
  @media only screen and (max-width: 585px) {
    padding: 2rem 0rem;
    margin-top: 0px;
  }
`;

const Navbar = () => {
  const language = useContext(LanguageContext);
  const items = {
    "EN": [
      { name: "Home", nav: '', isActive: null },
      { name: "Blog", nav: '/blog', isActive: window.location.href.indexOf("blog") !== -1 },
      { name: "Projects", nav: '/projects', isActive: window.location.href.indexOf("projects") !== -1 }
    ],
    "ES": [
      { name: "Casa", nav: '', isActive: null },
      { name: "Blog", nav: '/blog', isActive: window.location.href.indexOf("blog") !== -1 },
      { name: "Proyectos", nav: '/projects', isActive: window.location.href.indexOf("projects") !== -1 }
    ]
  };

  return (
    <Wrapper>
      {items[language].map((item, index) => {
        return (
          <StyledNavButton
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            isActive={item.isActive}
          >
            <StyledNavLink
              exact to={item.nav}>
              {item.name}
            </StyledNavLink>
          </StyledNavButton>
        )
      })}
      {/* <StyledNavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <StyledNavLink
          exact to='/'>
          Home
        </StyledNavLink>
      </StyledNavButton>
      <StyledNavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        isActive={window.location.href.indexOf("blog") !== -1}
      >
        <StyledNavLink
          exact to='/blog'>
          Blog
        </StyledNavLink>
      </StyledNavButton>
      <StyledNavButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        isActive={window.location.href.indexOf("projects") !== -1}
      >
        <StyledNavLink
          exact to='/projects'>
          Projects
        </StyledNavLink>
      </StyledNavButton> */}
    </Wrapper>
  );
};

export default Navbar;
