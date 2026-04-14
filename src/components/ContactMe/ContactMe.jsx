import React, { useRef, useState } from "react";
import styled from "styled-components";

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
} from "../../helpers/text";

const Container = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.surface || theme.secondary};
  max-height: ${({ open }) => (open ? "100%" : "0")};
  padding: ${({ open }) => (open ? "4rem 0" : "0")};
  margin: ${({ open }) => (open ? "4rem 0" : "0")};
  transition: all 0.3s ease-out;
  overflow: hidden;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`;

const Form = styled.form`
  max-width: 84rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem;
  margin-bottom: 1.6rem;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Title = styled.h2`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const Text = styled.p`
  font-size: 18px;
  text-align: center;
  margin: 30px auto;
  line-height: 25px;
  max-width: 60rem;
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.separator};
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
  min-height: 2.4rem;
  margin: 0;
  text-align: center;
  font-size: 1.4rem;
  color: ${({ $error, theme }) =>
    $error ? "#b91c1c" : theme.mutedText || theme.text};
`;

const ContactMe = ({ language, open }) => {
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleOnReset = () => {
    setName("");
    setEmail("");
    setTelephone("");
    setCompany("");
    setMessage("");
    setError(false);
  };

  const createToast = (type) => {
    const toast = {
      id: `${Date.now()}-${Math.random()}`,
      title: type === "Success" ? "Success" : "Error",
      description:
        type === "Success"
          ? "Successfully sent email."
          : "Failed to send email.",
      backgroundColor: type === "Success" ? "#15803d" : "#b91c1c",
      icon: type === "Success" ? <CheckSVG /> : <ErrorSVG />,
    };

    setList((currentList) => [...currentList, toast]);
  };

  const handleOnSendEmail = async (event) => {
    event.preventDefault();

    if (!formRef.current?.reportValidity()) {
      setError(true);
      setStatusMessage("Please complete the required fields before sending.");
      return;
    }

    setIsSending(true);
    setError(false);
    setStatusMessage("Sending message...");

    const emailObj = {
      name,
      email,
      company,
      telephone,
      message,
    };

    try {
      const response = await fetch(
        "https://heyitsmeharv-backend.herokuapp.com/email/send",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          method: "POST",
          body: JSON.stringify(emailObj),
        },
      );

      if (response.ok) {
        createToast("Success");
        handleOnReset();
        setStatusMessage("Message sent successfully.");
        Analytics.event("Contact Me Success", {
          category: "Contact Me",
          action: "Successfully sent an email",
          label: "Send Message",
        });
        return;
      }

      createToast("Fail");
      setError(true);
      setStatusMessage("Unable to send your message right now.");
      Analytics.event("Contact Me Failure", {
        category: "Contact Me",
        action: "Failed to send an email",
        label: "Send Message",
      });
    } catch (sendError) {
      createToast("Fail");
      setError(true);
      setStatusMessage("Unable to send your message right now.");
      Analytics.event("Contact Me Failure", {
        category: "Contact Me",
        action: "Failed to send an email",
        label: "Send Message",
      });
      console.log(`Unable to send email: ${sendError}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container
      id="contact"
      open={open}
      aria-labelledby="contact-title"
      aria-hidden={!open}
    >
      <Form ref={formRef} onSubmit={handleOnSendEmail} noValidate={false}>
        <Title id="contact-title">{contactMe(language)}</Title>
        <Separator />
        <Text>{contactMeText(language)}</Text>
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
        <StatusMessage role="status" aria-live="polite" $error={error}>
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
            {isSending ? "Sending..." : sendMessageText(language)}
          </ContactMeSendButton>
        </Actions>
      </Form>
      <Toast toastList={list} />
    </Container>
  );
};

export default ContactMe;
