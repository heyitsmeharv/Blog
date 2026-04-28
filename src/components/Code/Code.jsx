import React from "react";
import styled from "styled-components";
import { CopyButton } from "../Button/Button";

const CodeContainer = styled.pre`
  position: relative;
  font-family: "Consolas", "Monaco", "Courier New", monospace;
  font-size: clamp(1.4rem, 1.6vw, 1.7rem);
  background: #292929;
  color: ${({ theme }) => theme.buttonText};
  word-wrap: break-word;
  padding: 1.6rem 2.1rem 1.5rem;
  border-radius: 1.2rem;
  overflow-x: auto;
  line-height: ${({ $compact }) => ($compact ? 1.5 : 2.4)};
  margin: 1.8rem 0 2.4rem;
`;

const CopyButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
`;

export const CodeBlock = ({ children }) => (
  <CodeContainer>{children}</CodeContainer>
);

export const CodeBlockWithCopy = ({ code, compact }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  };

  return (
    <CodeContainer $compact={compact}>
      <CopyButtonWrapper>
        <CopyButton onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </CopyButton>
      </CopyButtonWrapper>
      {code}
    </CodeContainer>
  );
};
