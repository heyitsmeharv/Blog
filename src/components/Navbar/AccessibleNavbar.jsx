import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";

import { StyledNavLink } from "../Button/Button";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.secondary}50;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 4rem);
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 585px) {
    height: 5.5rem;
  }
`;

const navLinkStyles = css`
  font-family: "Raleway", sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.secondary}25;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const AnchorLink = styled.a`
  ${navLinkStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 4.4rem;
  padding: 0.6rem 1.2rem;
`;

const RouterLink = styled(StyledNavLink)`
  ${navLinkStyles}

  &.active {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 2rem;
  background: ${({ theme }) => theme.secondary};
  opacity: 0.5;
  margin: 0 0.2rem;
`;

const ThemeDot = styled.button.attrs({ type: "button" })`
  border: 2px solid ${({ $border }) => $border};
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  background: ${({ $colour }) => $colour};
  cursor: pointer;
  transition: transform 0.15s;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.15);
  }

  &[aria-pressed="true"] {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.text};
  }
`;

const LangButton = styled.button.attrs({ type: "button" })`
  min-width: 4.4rem;
  min-height: 4.4rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  background: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 0 1rem;
  opacity: 0.8;
  transition:
    opacity 0.15s,
    border-color 0.15s,
    background 0.15s;
  line-height: 1;

  &:hover {
    opacity: 1;
    border-color: ${({ theme }) => theme.secondary};
  }

  &[aria-pressed="true"] {
    opacity: 1;
    background: ${({ theme }) => theme.secondary}30;
    border-color: ${({ theme }) => theme.secondary};
  }
`;

const HamburgerBtn = styled.button.attrs({ type: "button" })`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.6rem;

  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

const HamLine = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background: ${({ theme }) => theme.text};
  border-radius: 2px;
  transition:
    transform 0.2s,
    opacity 0.2s;

  &:nth-child(1) {
    transform: ${({ $open }) =>
      $open ? "translateY(7px) rotate(45deg)" : "none"};
  }

  &:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }

  &:nth-child(3) {
    transform: ${({ $open }) =>
      $open ? "translateY(-7px) rotate(-45deg)" : "none"};
  }
`;

const MobileMenu = styled.div`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.secondary}50;
  padding: 0.8rem clamp(1.5rem, 4vw, 4rem) 1.4rem;
  gap: 0.2rem;
  z-index: 99;

  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

const MobileLink = styled(AnchorLink)`
  width: fit-content;
`;

const MobileRouterLink = styled(RouterLink)`
  width: fit-content;
`;

const MobileLangRow = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.secondary}30;
`;

const THEMES = [
  { name: "light", label: "Light theme", colour: "#ffffff", border: "#999999" },
  { name: "dark", label: "Dark theme", colour: "#1b1c22", border: "#555555" },
  { name: "blue", label: "Blue theme", colour: "#0c6e8c", border: "#053546" },
  { name: "red", label: "Red theme", colour: "#6a040f", border: "#240104" },
  { name: "green", label: "Green theme", colour: "#486221", border: "#273506" },
];

const AccessibleNavbar = ({
  currentLanguage,
  currentTheme,
  toggleTheme,
  toggleLanguage,
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const desktopLinks = isHome ? (
    <>
      <AnchorLink href="#home">Home</AnchorLink>
      <AnchorLink href="#about">About</AnchorLink>
      <AnchorLink href="#experience">Experience</AnchorLink>
      <AnchorLink href="#blog">Blog</AnchorLink>
      <AnchorLink href="#projects">Projects</AnchorLink>
      <AnchorLink href="#skills">Skills</AnchorLink>
    </>
  ) : (
    <>
      <RouterLink exact to="/">
        Home
      </RouterLink>
      <RouterLink exact to="/blog">
        Blog
      </RouterLink>
      <RouterLink exact to="/projects">
        Projects
      </RouterLink>
    </>
  );

  const mobileLinks = isHome ? (
    <>
      <MobileLink href="#home" onClick={closeMenu}>
        Home
      </MobileLink>
      <MobileLink href="#about" onClick={closeMenu}>
        About
      </MobileLink>
      <MobileLink href="#experience" onClick={closeMenu}>
        Experience
      </MobileLink>
      <MobileLink href="#blog" onClick={closeMenu}>
        Blog
      </MobileLink>
      <MobileLink href="#projects" onClick={closeMenu}>
        Projects
      </MobileLink>
      <MobileLink href="#skills" onClick={closeMenu}>
        Skills
      </MobileLink>
      <MobileLink href="#github" onClick={closeMenu}>
        GitHub
      </MobileLink>
    </>
  ) : (
    <>
      <MobileRouterLink exact to="/" onClick={closeMenu}>
        Home
      </MobileRouterLink>
      <MobileRouterLink exact to="/blog" onClick={closeMenu}>
        Blog
      </MobileRouterLink>
      <MobileRouterLink exact to="/projects" onClick={closeMenu}>
        Projects
      </MobileRouterLink>
    </>
  );

  return (
    <Nav aria-label="Primary navigation">
      <NavInner>
        <NavLinks>{desktopLinks}</NavLinks>
        <NavControls>
          <LangButton
            onClick={() => toggleLanguage("EN")}
            aria-label="Switch language to English"
            aria-pressed={currentLanguage === "EN"}
            title="English"
          >
            EN
          </LangButton>
          <LangButton
            onClick={() => toggleLanguage("ES")}
            aria-label="Cambiar idioma a español"
            aria-pressed={currentLanguage === "ES"}
            title="Español"
          >
            ES
          </LangButton>
          <Divider aria-hidden="true" />
          {THEMES.map((themeOption) => (
            <ThemeDot
              key={themeOption.name}
              $colour={themeOption.colour}
              $border={themeOption.border}
              onClick={() => toggleTheme(themeOption.name)}
              aria-label={`Switch to ${themeOption.label.toLowerCase()}`}
              aria-pressed={currentTheme === themeOption.name}
              title={themeOption.label}
            />
          ))}
        </NavControls>
        <HamburgerBtn
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <HamLine $open={isMenuOpen} />
          <HamLine $open={isMenuOpen} />
          <HamLine $open={isMenuOpen} />
        </HamburgerBtn>
      </NavInner>
      <MobileMenu id="mobile-navigation" $open={isMenuOpen}>
        {mobileLinks}
        <MobileLangRow>
          <LangButton
            onClick={() => {
              toggleLanguage("EN");
              closeMenu();
            }}
            aria-label="Switch language to English"
            aria-pressed={currentLanguage === "EN"}
            title="English"
          >
            EN
          </LangButton>
          <LangButton
            onClick={() => {
              toggleLanguage("ES");
              closeMenu();
            }}
            aria-label="Cambiar idioma a español"
            aria-pressed={currentLanguage === "ES"}
            title="Español"
          >
            ES
          </LangButton>
        </MobileLangRow>
      </MobileMenu>
    </Nav>
  );
};

export default AccessibleNavbar;
