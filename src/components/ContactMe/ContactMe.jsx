import React, { useState } from 'react';
import styled from 'styled-components';

// components
import Toast from '../Toast/Toast';
import { ContactMeInput, ContactMeTextArea } from "../Input/Input";
import { ContactMeSendButton } from "../Button/Button";

//icons
import { CheckSVG } from '../../resources/styles/icons';
import { ErrorSVG } from '../../resources/styles/icons';

// helpers
import { Analytics } from "../../helpers/analytics";
import { contactMe, contactMeText, nameInput, emailInput, phoneInput, companyInput, messageInput, sendMessageText } from "../../helpers/text";


const Container = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.secondary};
  max-height: ${props => props.open ? "100%" : "0"};
  padding: ${props => props.open ? "4rem 0;" : "0"};
  margin: ${props => props.open ? "4rem 0;" : "0"};
  transition: all 0.3s ease-out;
  overflow: hidden;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`;

const Text = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  line-height: 25px;
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.separator};
`;

const ContactMe = ({ language, open }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);

  const handleOnReset = () => {
    setName('');
    setEmail('');
    setTelephone('');
    setCompany('');
    setMessage('');
    setError(false);
  };

  const createToast = type => {
    const id = Math.floor((Math.random() * 100) + 1);
    const toast = {
      id,
      title: type === 'Success' ? 'Success' : 'Error',
      description: type === 'Success' ? 'Successfully Sent Email' : 'Failed To Send Email',
      backgroundColor: type === 'Success' ? '#5cb85c' : '#d9534f',
      icon: type === 'Success' ? <CheckSVG /> : <ErrorSVG />
    }
    let array = [];
    array.push(...list, toast);
    setList(array);
  };

  const handleOnSendEmail = () => {
    const emailObj = {
      name,
      email,
      company,
      telephone,
      message,
    }
    fetch('https://heyitsmeharv-backend.herokuapp.com/email/send', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: "POST",
      body: JSON.stringify(emailObj)
    }).then(response => {
      if (response.ok) {
        createToast('Success');
        handleOnReset();
        Analytics.event('Contact Me Success', {
          category: 'Contact Me',
          action: 'Successfully sent an email',
          label: 'Send Message'
        });
      } else {
        createToast('Fail');
        setError(true);
        Analytics.event('Contact Me Failure', {
          category: 'Contact Me',
          action: 'Failed to send an email',
          label: 'Send Message'
        });
      }
    }).catch(error => {
      createToast('Fail');
      setError(true);
      Analytics.event('Contact Me Failure', {
        category: 'Contact Me',
        action: 'Failed to send an email',
        label: 'Send Message'
      });
      console.log(`Unable to send email: ${error}`);
    });
  }

  return (
    <Container open={open}>
      <Title>{contactMe(language)}</Title>
      <Separator />
      <Text>{contactMeText(language)}</Text>
      <FlexWrapper>
        <ContactMeInput value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder={nameInput(language)} />
        <ContactMeInput error={error} value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder={emailInput(language)} />
      </FlexWrapper>
      <FlexWrapper>
        <ContactMeInput value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder={companyInput(language)} />
        <ContactMeInput value={telephone} onChange={(e) => setTelephone(e.target.value)} type="text" placeholder={phoneInput(language)} />
      </FlexWrapper>
      <FlexWrapper>
        <ContactMeTextArea value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder={messageInput(language)} />
      </FlexWrapper>
      <FlexWrapper>
        <ContactMeSendButton disabled={email.length === 0 || name.length === 0 || message.length === 0} onClick={handleOnSendEmail}>
          {sendMessageText(language)}
        </ContactMeSendButton>
      </FlexWrapper>
      <Toast toastList={list} />
    </Container >
  )
}

export default ContactMe;