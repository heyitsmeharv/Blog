import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { StyledButton } from '../Button/Button';

import Card from '../Card/Card';

// helpers
import { skillsText, skillsListText } from "../../helpers/text";

// icons
import {
  AWSWhiteBackgroundSVG,
  GraphqlSVG,
  ReactjsSVG,
  ExpressSVG,
  JavascriptSVG,
  NodejsSVG,
  HtmlSVG,
  CssSVG,
  MongoDBSVG,
  MySQLSVG,
  TwilioSVG,
  WebpackSVG,
  DockerSVG,
  GitHubSVG,
  GitSVG,
  SassSVG,
  StyledComponentsSVG,
  HerokuSVG,
  CPlusPlusSVG,
  CSharpSVG,
  ElectronJSSVG,
  RaspberryPiSVG,
  JIRASVG,
  BitBucketSVG,
  ConfluenceSVG,
  MaterialUISVG,
  NetlifySVG,
  SocketIOSVG,
  ServerlessSVG,
  TerraformSVG,
  CypressSVG,
  ESLintSVG,
  PrettierSVG
} from '../../resources/styles/icons';

import awscp from '../../resources/images/aws-certified-cloud-practitioner.png';

const Container = styled.section`
  width: 100%;
  max-height: 100%;
  padding: 4rem 0;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.secondary};
  border: 2px solid transparent;
  :hover {
    transition: border .5s ease;
    border: 2px solid ${({ theme }) => theme.text};
  }
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.separator};
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  margin: 30px;

  @media only screen and (max-width: 500px) {
    margin: 30px 0;
  } 
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
  line-height: 25px;
  font-weight: 600;
`;

const Image = styled.img`
  :hover {
    cursor: pointer;
  }
`;

const Skills = ({ language }) => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');
  const skillList = [
    {
      icon: <HtmlSVG />,
      title: "HTML",
      tag: ["all", "webDev"]
    },
    {
      icon: <CssSVG />,
      title: "CSS",
      tag: ["all", "webDev"]
    },
    {
      icon: <JavascriptSVG />,
      title: "Javascript",
      tag: ["all", "language", "webDev"]
    },
    {
      icon: <SassSVG />,
      title: "Sass",
      tag: ["all", "webDev"]
    },
    {
      icon: <StyledComponentsSVG />,
      title: "Styled Components",
      tag: ["all", "webDev"]
    },
    {
      icon: <ReactjsSVG />,
      title: "React",
      tag: ["all", "webDev"]
    },
    {
      icon: <MaterialUISVG />,
      title: "Material UI",
      tag: ["all", "webDev"]
    },
    {
      icon: <NodejsSVG />,
      title: "Node",
      tag: ["all", "language"]
    },
    {
      icon: <CypressSVG />,
      title: "Cypress",
      tag: ["all", "language", "webDev"]
    },
    {
      icon: <ESLintSVG />,
      title: "ESLint",
      tag: ["all", "webDev"]
    },
    {
      icon: <PrettierSVG />,
      title: "Prettier",
      tag: ["all", "webDev"]
    },
    {
      icon: <ElectronJSSVG />,
      title: "Electron",
      tag: ["all", "language", "webDev"]
    },
    {
      icon: <ExpressSVG />,
      title: "Express",
      tag: ["all", "webDev"]
    },
    {
      icon: <CPlusPlusSVG />,
      title: "C++",
      tag: ["all", "language"]
    },
    {
      icon: <CSharpSVG />,
      title: "C#",
      tag: ["all", "language"]
    },
    {
      icon: <AWSWhiteBackgroundSVG />,
      title: "AWS",
      tag: ["all", "misc"]
    },
    {
      icon: <ServerlessSVG />,
      title: "Serverless",
      tag: ["all", "misc"]
    },
    {
      icon: <TerraformSVG />,
      title: "Terraform",
      tag: ["all", "misc"]
    },
    {
      icon: <HerokuSVG />,
      title: "Heroku",
      tag: ["all", "misc"]
    },
    {
      icon: <NetlifySVG />,
      title: "Netlify",
      tag: ["all", "misc"]
    },
    {
      icon: <TwilioSVG />,
      title: "Twilio",
      tag: ["all", "misc"]
    },
    {
      icon: <SocketIOSVG />,
      title: "Socket IO",
      tag: ["all", "webDev"]
    },
    {
      icon: <MongoDBSVG />,
      title: "Mongo DB",
      tag: ["all", "database"]
    },
    {
      icon: <RaspberryPiSVG />,
      title: "Raspberry Pi",
      tag: ["all", "misc"]
    },
    {
      icon: <GraphqlSVG />,
      title: "GraphQL",
      tag: ["all", "database"]
    },
    {
      icon: <WebpackSVG />,
      title: "Webpack",
      tag: ["all", "webDev"]
    },
    {
      icon: <DockerSVG />,
      title: "Docker",
      tag: ["all", "webDev"]
    },
    {
      icon: <MySQLSVG />,
      title: "MySQL",
      tag: ["all", "database"]
    },
    {
      icon: <GitSVG />,
      title: "Git",
      tag: ["all", "misc"]
    },
    {
      icon: <GitHubSVG />,
      title: "GitHub",
      tag: ["all", "misc"]
    },
    {
      icon: <BitBucketSVG />,
      title: "BitBucket",
      tag: ["all", "misc"]
    },
    {
      icon: <JIRASVG />,
      title: "JIRA",
      tag: ["all", "misc"]
    },
    {
      icon: <ConfluenceSVG />,
      title: "Confluence",
      tag: ["all", "misc"]
    },
  ];

  const buttons = {
    "EN": [
      {
        label: 'All',
        onClick: () => setFilter('all')
      },
      {
        label: 'Programming languages',
        onClick: () => setFilter('language'),
      },
      {
        label: 'Web/App Development',
        onClick: () => setFilter('webDev'),
      },
      {
        label: 'Databases',
        onClick: () => setFilter('database'),
      },
      {
        label: 'Misc',
        onClick: () => setFilter('misc'),
      },
    ],
    "ES": [
      {
        label: 'Toda',
        onClick: () => setFilter('all')
      },
      {
        label: 'Lenguajes De Programación',
        onClick: () => setFilter('language'),
      },
      {
        label: 'Desarrollo De Aplicaciones/Internet',
        onClick: () => setFilter('webDev'),
      },
      {
        label: 'Bases De Datos',
        onClick: () => setFilter('database'),
      },
      {
        label: 'Misceláneos',
        onClick: () => setFilter('misc'),
      },
    ]
  };

  useEffect(() => {
    setList(skillList.filter(skill => skill.tag.includes(filter)));
  }, [filter])

  return (
    <Container>
      <Title>{skillsText(language)}</Title>
      <Separator />
      <Text>{skillsListText(language)}</Text>
      <FlexWrapper>
        {buttons[language].map((button, i) => {
          return (
            <div key={i} style={{ margin: "10px" }}>
              <StyledButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={button.onClick}
              >
                {button.label}
              </StyledButton>
            </div>
          )
        })}
      </FlexWrapper>
      <FlexWrapper>
        {list.map((skill, i) => {
          return (
            <Card
              key={i}
              icon={skill.icon}
              title={skill.title}
            />
          )
        })}
      </FlexWrapper>
      <FlexWrapper>
        <a target="_blank" href="https://www.credly.com/badges/445bcb6b-31b2-4c23-8ca4-adf17e871e42">
          <Image width="150px" height="150px" src={awscp} />
        </a>
      </FlexWrapper>
    </Container>
  );
}

export default Skills;