import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Handshake, Cogs } from "@styled-icons/fa-solid";
import { PeopleCommunity } from "@styled-icons/fluentui-system-filled/PeopleCommunity";
import { ListCheck } from "@styled-icons/bootstrap/ListCheck";

// helpers
import { experienceText } from "../../helpers/text";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import Card from "./Card";

const Container = styled.section`
  width: 100%;
  max-height: 100%;
  padding: 4rem 0;
  background: ${({ theme }) => theme.background};
  animation: ${SlideInBottom} 0.5s forwards;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  margin: 30px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.separator};
`;

const StyledHandShake = styled(Handshake)`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  padding: 20px;
  width: 80px;
  height: 80px;
`;
const StyledCogs = styled(Cogs)`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  padding: 20px;
  width: 80px;
  height: 80px;
`;
const StyledPeopleCommunity = styled(PeopleCommunity)`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  padding: 20px;
  width: 80px;
  height: 80px;
`;
const StyledListCheck = styled(ListCheck)`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  padding: 20px;
  width: 80px;
  height: 80px;
`;

const ProfessionalExperience = ({ language }) => {
  const items = {
    EN: [
      {
        icon: <StyledHandShake />,
        title: "Client Focus",
        text: `Proactively communicated and collaborated with external and internal stakeholders.
        Assisted with the delivery of customer solutions from conception through to implementation and beyond.
        Elicited intelligence regarding clients’ strategy and future plans and leverage sales opportunities from
        this knowledge.
        Collaborated with the design, creation and delivery of reports on the various products and services
        provided to clients.`,
      },
      {
        icon: <StyledCogs />,
        title: "Problem Solving",
        text: `Built internal tools and applications to solve operational problems using AWS, including 
        automated testing systems and end-to-end validation tooling. Experienced in designing practical 
        solutions with React and AWS to improve reliability, visibility, and team efficiency.`,
      },
      {
        icon: <StyledPeopleCommunity />,
        title: "Team Work",
        text: `Collaborated with dozens of cross-functional clients (policy/content, design, QA).
        I have worked in large and small teams developing and maintaining multiple CRM solutions.`,
      },
      {
        icon: <StyledListCheck />,
        title: "Management",
        text: `Managed JIRA Service Desks and Kanban Boards.
        Led development of a new internal tool that encompasses chat functionality (Facebook
        Messenger/ WhatsApp/SMS/Email/Phone). Held sprint ceremonies including reviews, refinements and planning meetings.`,
      },
    ],
    ES: [
      {
        icon: <StyledHandShake />,
        title: "Enfoque En El Cliente",
        text: `He comunicado y colaborado proactivamente con las partes interesadas externas e internas.
        Asistido con la entrega de soluciones al cliente desde la concepción hasta la implementación y más allá.
        Obtuvo inteligencia sobre la estrategia de los clientes y los planes futuros y aprovechó las oportunidades de ventas de
        este conocimiento.
        Colaboró ​​con el diseño, creación y entrega de informes sobre los diversos productos y servicios.
        proporcionado a los clientes.`,
      },
      {
        icon: <StyledCogs />,
        title: "Resolución De Problemas",
        text: `Desarrollé herramientas y aplicaciones internas para resolver problemas operativos con AWS, incluyendo sistemas 
        de pruebas automatizadas y herramientas de validación integral. Tengo experiencia en el diseño de soluciones prácticas 
        con React y AWS para mejorar la confiabilidad, la visibilidad y la eficiencia del equipo.`,
      },
      {
        icon: <StyledPeopleCommunity />,
        title: "Trabajo En Equipo",
        text: `He colaborado con decenas de clientes multidisciplinares (políticas/contenido, diseño, control de calidad). 
        He trabajado en equipos grandes y pequeños desarrollando y manteniendo diversas soluciones CRM.`,
      },
      {
        icon: <StyledListCheck />,
        title: "Gestión",
        text: `Manejo de Mesas de Servicio JIRA y Tableros Kanban.
        Dirigió el desarrollo de una nueva herramienta interna que abarca la funcionalidad de chat (Facebook
        Messenger/WhatsApp/SMS/Correo electrónico/Teléfono). Revisiones de sprint, refinamientos y reuniones de planificación.`,
      },
    ],
  };

  return (
    <Container>
      <Title>{experienceText(language)}</Title>
      <Separator />
      <FlexWrapper>
        {items[language].map((item, i) => {
          return (
            <Card
              key={i}
              title={item.title}
              icon={item.icon}
              text={item.text}
            />
          );
        })}
      </FlexWrapper>
    </Container>
  );
};

export default ProfessionalExperience;
