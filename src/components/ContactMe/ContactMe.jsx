import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";

import Toast from "../Toast/Toast";
import { ContactMeInput, ContactMeTextArea } from "../Input/Input";
import { ContactMeSendButton } from "../Button/Button";

import { CheckSVG, ErrorSVG } from "../../resources/styles/icons";
import { Analytics } from "../../helpers/analytics";
import {
  contactMe,
  contactMeText,
  nameInput,
  emailInput,
  phoneInput,
  companyInput,
  messageInput,
  sendMessageText,
  contactMessageValidationText,
  sendingMessageStatusText,
  messageSentSuccessfullyText,
  unableToSendMessageText,
  errorText,
  successText,
  sentEmailFailureText,
  sentEmailSuccessText,
  requestReferenceText,
} from "../../helpers/i18nText";

/* ── Overlay scrim ─────────────────────────────────── */
const Scrim = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 8999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

/* ── Floating card (shares layoutId with hero button) ─ */
const Card = styled(motion.div)`
  position: fixed;
  z-index: 9000;
  top: 50%;
  left: 50%;
  width: min(640px, 92vw);
  max-height: 90vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.surface || theme.secondary};
  border-radius: 1.4rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
  padding: 4rem;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.secondary} transparent;
`;

/* ── Form elements ─────────────────────────────────── */
const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  cursor: pointer;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.55;
  transition:
    opacity 0.15s,
    background 0.15s;
  font-family: inherit;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.secondary};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.focus || theme.text};
    outline-offset: 2px;
    opacity: 1;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem;
  margin-bottom: 1.6rem;

  @media only screen and (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 0.4rem;
  padding-right: 4rem;
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 1.4rem 0;
  background-color: ${({ theme }) => theme.separator};
`;

const SubText = styled.p`
  font-size: 1.5rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.mutedText || theme.text};
  margin: 0 0 2rem;
`;

const FieldLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

const StatusMessage = styled.p`
  margin: 2rem 0 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ $error, theme }) =>
    $error ? "#b91c1c" : theme.mutedText || theme.text};
`;

/* ── Content fade-in — delayed so morph finishes first ─ */
const contentVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.28 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
};

/* ─────────────────────────────────────────────────────── */

const ContactMe = ({ language, open, setOpen }) => {
  const formRef = useRef(null);
  const closeRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  /* Focus close button when dialog opens */
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => closeRef.current?.focus(), 320);
      return () => clearTimeout(id);
    }
  }, [open]);

  /* Escape key dismissal */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setList([]);
    handleOnReset();
  };

  const handleOnReset = () => {
    setName("");
    setEmail("");
    setTelephone("");
    setCompany("");
    setMessage("");
    setError(false);
    setStatusMessage("");
  };

  const getRequestId = (response, payload) =>
    response.headers.get("x-amzn-requestid") ||
    response.headers.get("x-amzn-requestId") ||
    payload?.requestId ||
    payload?.request_id ||
    "";

  const parseResponseBody = async (response) => {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  };

  const buildStatusMessage = (baseMessage, requestId, detail) => {
    const details = [baseMessage];

    if (detail) {
      details.push(detail);
    }

    if (requestId) {
      details.push(`${requestReferenceText(language)}: ${requestId}`);
    }

    return details.join(" ");
  };

  const createToast = (type) => {
    const toast = {
      id: `${Date.now()}-${Math.random()}`,
      title: type === "Success" ? successText(language) : errorText(language),
      description:
        type === "Success"
          ? sentEmailSuccessText(language)
          : sentEmailFailureText(language),
      backgroundColor: type === "Success" ? "#15803d" : "#b91c1c",
      icon: type === "Success" ? <CheckSVG /> : <ErrorSVG />,
    };
    setList([toast]);
  };

  const handleOnSendEmail = async (event) => {
    event.preventDefault();

    if (!formRef.current?.reportValidity()) {
      setError(true);
      setStatusMessage(contactMessageValidationText(language));
      return;
    }

    setIsSending(true);
    setError(false);
    setStatusMessage(sendingMessageStatusText(language));

    const emailObj = { name, email, company, telephone, message };

    try {
      const response = await fetch(
        import.meta.env.VITE_CONTACT_API_URL ||
          "https://heyitsmeharv-backend.herokuapp.com/email/send",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(emailObj),
        },
      );
      const payload = await parseResponseBody(response);
      const requestId = getRequestId(response, payload);
      const responseDetail = payload?.error || payload?.message || "";

      if (response.ok) {
        createToast("Success");
        handleOnReset();
        setStatusMessage(
          buildStatusMessage(
            messageSentSuccessfullyText(language),
            requestId,
            "",
          ),
        );
        Analytics.event("contact_me_success", {
          category: "contact_me",
          action: "Contact request accepted by backend",
          request_id: requestId,
          backend_status: response.status,
          ses_message_id: payload?.messageId || payload?.message_id,
        });
        console.info("Contact request accepted", {
          requestId,
          payload,
          status: response.status,
        });
        return;
      }

      createToast("Fail");
      setError(true);
      setStatusMessage(
        buildStatusMessage(
          unableToSendMessageText(language),
          requestId,
          responseDetail,
        ),
      );
      Analytics.event("contact_me_failure", {
        category: "contact_me",
        action: "Contact request rejected by backend",
        request_id: requestId,
        backend_status: response.status,
        backend_error: responseDetail,
      });
      console.warn("Contact request rejected", {
        requestId,
        payload,
        status: response.status,
      });
    } catch (sendError) {
      createToast("Fail");
      setError(true);
      setStatusMessage(
        buildStatusMessage(
          unableToSendMessageText(language),
          "",
          sendError instanceof Error ? sendError.message : String(sendError),
        ),
      );
      Analytics.event("contact_me_failure", {
        category: "contact_me",
        action: "Failed to reach contact backend",
        backend_error:
          sendError instanceof Error ? sendError.message : String(sendError),
      });
      console.error("Unable to send email", sendError);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Toast toastList={list} />
      <AnimatePresence>
        {open && (
          <>
            <Scrim
              key="contact-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
            />
            <Card
              key="contact-card"
              layoutId="contact-morph"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              style={{ x: "-50%", y: "-50%" }}
            >
              <CloseButton
                ref={closeRef}
                onClick={handleClose}
                aria-label="Close contact form"
              >
                ✕
              </CloseButton>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <Title id="contact-title">{contactMe(language)}</Title>
                <Separator />
                <SubText>{contactMeText(language)}</SubText>
                <Form
                  ref={formRef}
                  onSubmit={handleOnSendEmail}
                  noValidate={false}
                >
                  <FieldGrid>
                    <Field>
                      <FieldLabel htmlFor="contact-name">
                        {nameInput(language)}
                      </FieldLabel>
                      <ContactMeInput
                        id="contact-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        autoComplete="name"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contact-email">
                        {emailInput(language)}
                      </FieldLabel>
                      <ContactMeInput
                        id="contact-email"
                        error={error}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        autoComplete="email"
                        required
                      />
                    </Field>
                  </FieldGrid>
                  <FieldGrid>
                    <Field>
                      <FieldLabel htmlFor="contact-company">
                        {companyInput(language)}
                      </FieldLabel>
                      <ContactMeInput
                        id="contact-company"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        type="text"
                        autoComplete="organization"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contact-phone">
                        {phoneInput(language)}
                      </FieldLabel>
                      <ContactMeInput
                        id="contact-phone"
                        value={telephone}
                        onChange={(event) => setTelephone(event.target.value)}
                        type="tel"
                        autoComplete="tel"
                      />
                    </Field>
                  </FieldGrid>
                  <Field>
                    <FieldLabel htmlFor="contact-message">
                      {messageInput(language)}
                    </FieldLabel>
                    <ContactMeTextArea
                      id="contact-message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                    />
                  </Field>
                  <StatusMessage
                    role="status"
                    aria-live="polite"
                    $error={error}
                  >
                    {statusMessage}
                  </StatusMessage>
                  <Actions>
                    <ContactMeSendButton
                      disabled={
                        isSending ||
                        email.length === 0 ||
                        name.length === 0 ||
                        message.length === 0
                      }
                    >
                      {isSending
                        ? sendingMessageStatusText(language)
                        : sendMessageText(language)}
                    </ContactMeSendButton>
                  </Actions>
                </Form>
              </motion.div>
            </Card>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactMe;
