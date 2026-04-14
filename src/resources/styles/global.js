import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    line-height: 1.7;
  }

  body,
  #root {
    min-height: 100vh;
  }

  a,
  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  img {
    max-width: 100%;
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus || theme.text};
    outline-offset: 3px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
