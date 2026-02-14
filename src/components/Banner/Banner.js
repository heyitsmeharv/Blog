import React from "react";
import styled, { css } from "styled-components";

import { Paragraph } from "../Typography/Typography";
import { WarningSVG, InfoSVG } from "../../resources/styles/icons";

const variants = {
  info: css`
    background: rgba(60, 140, 255, 0.10);
    border-color: rgba(60, 140, 255, 0.35);
    color: rgba(60, 140, 255);
  `,
  warning: css`
    background: rgba(255, 180, 0, 0.12);
    border-color: rgba(255, 180, 0, 0.45);
    color: rgba(255, 180, 0);
  `,
};

const accents = {
  info: "rgba(60, 140, 255, 0.85)",
  warning: "rgba(255, 180, 0, 0.95)",
};

const Wrap = styled.aside`
  margin: 5rem 0;
  padding: 1.4rem 1.6rem;
  border-radius: 0.5rem;

  border: 2px solid ${({ theme }) => theme.secondary};
  box-shadow:
    0 10px 26px rgba(0, 0, 0, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.12);

  position: relative;
  overflow: hidden;

  ${({ $variant }) => variants[$variant] || variants.info}

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ $variant }) => accents[$variant] || accents.info};
  }
`;

const HeaderLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const Icon = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ $variant }) => accents[$variant]};

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    display: block;
  }

  & svg * {
    fill: currentColor !important;
    stroke: currentColor !important;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.25;
`;

const Body = styled.div`
  margin-top: 0.7rem;

  padding-left: calc(2.2rem + 0.9rem);

  & ${Paragraph} {
    margin: 0.6rem 0 0;
  }

  & ${Paragraph}:first-child {
    margin-top: 0;
  }
`;

const getIcon = (variant) => {
  if (variant === "warning") return <WarningSVG />;
  return <InfoSVG />;
};

const Banner = ({ title = "Note", variant = "info", children }) => {
  return (
    <Wrap $variant={variant} role="note" aria-label={title}>
      <HeaderLine>
        <Icon aria-hidden="true">{getIcon(variant)}</Icon>
        <Title>{title}</Title>
      </HeaderLine>

      <Body>{children}</Body>
    </Wrap>
  );
};

export default Banner;
