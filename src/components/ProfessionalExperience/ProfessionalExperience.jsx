import React from "react";
import styled from "styled-components";

import SlideInBottom from "../../animations/SlideInBottom";
import { experienceText } from "../../helpers/text";

const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
  animation: ${SlideInBottom} 0.5s forwards;

  @media only screen and (max-width: 900px) {
    padding: 5rem 0;
  }

  @media only screen and (max-width: 600px) {
    padding: 4rem 0;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 5rem);
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
`;

const ViewCV = styled.a`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  opacity: 0.65;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Separator = styled.div`
  width: 4rem;
  height: 3px;
  background: ${({ theme }) => theme.text};
  margin-bottom: 4rem;
  border-radius: 2px;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-left: 2px solid ${({ theme }) => theme.secondary}50;
  padding-left: 3.5rem;
  margin-left: 0.8rem;
`;

const TimelineItem = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -4.25rem;
    top: 0.5rem;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.text};
    border: 3px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.secondary};
  }
`;

const JobHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`;

const JobMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CompanyName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
`;

const RoleTitle = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  font-weight: 600;
`;

const SubMeta = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
`;

const Period = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  white-space: nowrap;
  padding-top: 0.4rem;
  font-weight: 500;
`;

const BulletList = styled.ul`
  margin-top: 1.6rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const BulletItem = styled.li`
  font-size: 1.5rem;
  line-height: 1.7;
  padding-left: 1.8rem;
  position: relative;
  color: ${({ theme }) => theme.text};

  &::before {
    content: "–";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.secondary};
  }
`;

const ProfessionalExperience = ({ language }) => {
  const items = {
    EN: [
      {
        company: "Davies Group",
        role: "AWS Cloud Engineer (Full-Time)",
        period: "Sep 2022 - Present",
        location: "Oxford, UK",
        bullets: [
          "Built, developed and supported different CI/CD solutions including GitHub Workflows, AWS CodePipeline and CodeDeploy.",
          "Architected and developed internal tools to automate application specific tasks using Terraform, AWS EventBridge and DynamoDB",
          "Converted multiple applications and services from EC2 to ECS.",
          "Implemented application monitoring for applications through AWS CloudWatch (Rum, Synthetics, X-Ray).",
          "Standardised content delivery processes with semantic versioning.",
        ],
      },
      {
        company: "ContactPartners",
        role: "Senior Development Manager (Full-Time)",
        period: "Jan 2021 - Sep 2022",
        location: "Oxford, UK",
        bullets: [
          "Led the development of multiple solutions such as: Internal tool that encompasses chat functionality (Facebook Messenger/WhatsApp/SMS/Email/Phone). Client application which measures cross functional performance with the ability to compare against other teams/organisations",
          "Managed JIRA Service Desks, Kanban Boards and Ceremonies.",
          "Proactively communicate and collaborate with external and internal stakeholders.",
          "Assisted with the delivery of customer solutions from conception through to implementation and beyond.",
          "Assisted with the design, creation, and delivery of reports on the various products and services provided to clients.",
          "Elicited intelligence regarding clients' strategy, future plans and leverage sales opportunities from this knowledge.",
          "Collaborated with dozens of cross-functional clients (policy/content, design, QA)",
        ],
      },
    ],
    ES: [
      {
        company: "Nombre de la Empresa",
        role: "Ingeniero de Software Senior",
        period: "Ene 2022 – Presente",
        location: "Oxford, Reino Unido",
        bullets: [
          "Lideré el desarrollo de aplicaciones React de cara al cliente.",
          "Diseñé herramientas internas usando AWS Lambda, DynamoDB y S3.",
          "Mentoricé desarrolladores junior y facilité ceremonias de sprint.",
        ],
      },
      {
        company: "Nombre de la Empresa",
        role: "Ingeniero de Software",
        period: "Jun 2019 – Dic 2021",
        location: "Oxford, Reino Unido",
        bullets: [
          "Desarrollé y mantuve soluciones CRM para clientes empresariales.",
          "Integré canales de chat en tiempo real (WhatsApp, Facebook Messenger, SMS) mediante Twilio.",
          "Colaboré con equipos multifuncionales en diseño, QA y producto.",
        ],
      },
    ],
  };

  return (
    <Container id="experience">
      <Inner>
        <Header>
          <Title>{experienceText(language)}</Title>
          <ViewCV
            href="https://heyitsmeharv.s3.eu-west-2.amazonaws.com/AH_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {language === "ES" ? "Ver CV →" : "View CV →"}
          </ViewCV>
        </Header>
        <Separator />
        <Timeline>
          {items[language].map((item, i) => (
            <TimelineItem key={i}>
              <JobHeader>
                <JobMeta>
                  <CompanyName>{item.company}</CompanyName>
                  <RoleTitle>{item.role}</RoleTitle>
                  <SubMeta>{item.location}</SubMeta>
                </JobMeta>
                <Period>{item.period}</Period>
              </JobHeader>
              <BulletList>
                {item.bullets.map((bullet, j) => (
                  <BulletItem key={j}>{bullet}</BulletItem>
                ))}
              </BulletList>
            </TimelineItem>
          ))}
        </Timeline>
      </Inner>
    </Container>
  );
};

export default ProfessionalExperience;
