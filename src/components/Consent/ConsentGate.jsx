import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Analytics } from "../../helpers/analytics";

const Container = styled.div`
  position: fixed;
  inset: auto 1rem 1rem 1rem;
  max-width: 680px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(20, 20, 20, 0.95);
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  z-index: 9999;
  backdrop-filter: blur(8px);
`;

const Title = styled.strong`
  display: block;
  font-weight: 700;
`;

const Text = styled.p`
  opacity: 0.9;
  margin: 0.5rem 0 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Button = styled.button.attrs({ type: "button" })`
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.text};
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const PrimaryButton = styled(Button)`
  background: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.text};
`;

const LinkButton = styled.button.attrs({ type: "button" })`
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;

function CookieBanner({ onAccept, onDecline }) {
  const titleId = "cookie-banner-title";
  const descriptionId = "cookie-banner-description";

  return React.createElement(
    Container,
    {
      role: "dialog",
      "aria-modal": false,
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
    },
    React.createElement(Title, { id: titleId }, "Cookies & analytics"),
    React.createElement(
      Text,
      { id: descriptionId },
      null,
      "I use Google Analytics to understand usage. Accept to enable analytics. You can change this anytime.",
    ),
    React.createElement(
      Row,
      null,
      React.createElement(
        Button,
        { onClick: onDecline, "aria-label": "Decline analytics" },
        "Decline",
      ),
      React.createElement(
        PrimaryButton,
        {
          onClick: () => {
            Analytics.start();
            onAccept();
          },
          "aria-label": "Accept analytics",
        },
        "Accept",
      ),
    ),
  );
}

export default function ConsentGate({ children }) {
  const [consent, setConsent] = useState(() => {
    try {
      return localStorage.getItem("consent");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (consent === "accepted" && !window.__consentApplied) {
      Analytics.start();
      window.__consentApplied = true;
    }
  }, [consent]);

  if (!consent) {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(CookieBanner, {
        onAccept: () => {
          try {
            localStorage.setItem("consent", "accepted");
          } catch {}
          setConsent("accepted");
        },
        onDecline: () => {
          try {
            localStorage.setItem("consent", "declined");
          } catch {}
          setConsent("declined");
        },
      }),
      children,
    );
  }

  return children;
}

export function ManageCookies() {
  const [granted, setGranted] = useState(() => {
    try {
      return localStorage.getItem("consent") === "accepted";
    } catch {
      return false;
    }
  });

  return React.createElement(
    LinkButton,
    {
      onClick: () => {
        if (granted) {
          Analytics.stop();
          try {
            localStorage.setItem("consent", "declined");
          } catch {}
          setGranted(false);
        } else {
          Analytics.start();
          try {
            localStorage.setItem("consent", "accepted");
          } catch {}
          setGranted(true);
        }
      },
      "aria-label": "Manage cookie preferences",
    },
    granted ? "Disable analytics" : "Enable analytics",
  );
}
