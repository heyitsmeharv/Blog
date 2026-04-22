import React from "react";
import styled from "styled-components";

import SlideInBottom from "../../animations/SlideInBottom";
import { skillsText, skillsListText, certsText } from "../../helpers/i18nText";
import awscp from "../../resources/images/aws-certified-cloud-practitioner.png";
import awssaa from "../../resources/images/aws-certified-solutions-architect-associate.png";

import {
  AWSWhiteBackgroundSVG,
  GraphqlSVG,
  ReactjsSVG,
  ExpressSVG,
  JavascriptSVG,
  TypeScriptSVG,
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
  PrettierSVG,
  BashSVG,
  AzureDevOpsSVG,
} from "../../resources/styles/icons";

const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
  background: ${({ theme }) => theme.secondary}18;
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

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

const Separator = styled.div`
  width: 4rem;
  height: 3px;
  background: ${({ theme }) => theme.text};
  margin-bottom: 2.5rem;
  border-radius: 2px;
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mutedText || theme.secondary};
  font-weight: 600;
  margin-bottom: 3.5rem;
`;

const LevelSection = styled.div`
  margin-bottom: 3.2rem;
`;

const LevelHeader = styled.div`
  margin-bottom: 1.4rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => `${theme.secondary}30`};
`;

const LevelLabel = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.3rem;
`;

const LevelDesc = styled.p`
  font-size: 1.25rem;
  margin: 0;
  color: ${({ theme }) => theme.mutedText || theme.text};
  opacity: 0.85;
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 2.4rem;
`;

const SkillItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem 0;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;

  svg {
    width: 18px !important;
    height: 18px !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const CertRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
`;

const CertImage = styled.img`
  transition: opacity 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
`;

const levels = [
  {
    key: "proficient",
    label: { EN: "Proficient", ES: "Dominio" },
    desc: {
      EN: "Confident taking production work",
      ES: "Confianza en proyectos nuevos o en producción",
    },
  },
  {
    key: "comfortable",
    label: { EN: "Comfortable", ES: "Cómodo" },
    desc: {
      EN: "Have shipped it - familiar enough to be productive quickly",
      ES: "Lo he usado en producción - lo retomo rápido",
    },
  },
  {
    key: "familiar",
    label: { EN: "Familiar", ES: "Familiarizado" },
    desc: {
      EN: "Learned and explored - understand the concepts, not my primary stack",
      ES: "Explorado y aprendido - entiendo los conceptos, no es mi stack principal",
    },
  },
];

const skillList = [
  { icon: <AWSWhiteBackgroundSVG />, title: "AWS", level: "proficient" },
  { icon: <TerraformSVG />, title: "Terraform", level: "proficient" },
  { icon: <JavascriptSVG />, title: "JavaScript", level: "proficient" },
  { icon: <NodejsSVG />, title: "Node.js", level: "proficient" },
  { icon: <ReactjsSVG />, title: "React.js", level: "proficient" },
  { icon: <GitHubSVG />, title: "GitHub", level: "proficient" },
  { icon: <AzureDevOpsSVG />, title: "Azure DevOps", level: "proficient" },
  { icon: <BitBucketSVG />, title: "BitBucket", level: "proficient" },
  { icon: <JIRASVG />, title: "JIRA", level: "proficient" },
  { icon: <ConfluenceSVG />, title: "Confluence", level: "proficient" },
  { icon: <GitSVG />, title: "Git", level: "proficient" },

  { icon: <DockerSVG />, title: "Docker", level: "comfortable" },
  { icon: <BashSVG />, title: "Bash", level: "comfortable" },
  { icon: <WebpackSVG />, title: "Webpack", level: "comfortable" },
  { icon: <MySQLSVG />, title: "MySQL", level: "comfortable" },
  { icon: <TwilioSVG />, title: "Twilio", level: "comfortable" },

  { icon: <CPlusPlusSVG />, title: "C++", level: "familiar" },
  { icon: <CSharpSVG />, title: "C#", level: "familiar" },
  { icon: <TypeScriptSVG />, title: "TypeScript", level: "familiar" },
  { icon: <ServerlessSVG />, title: "Serverless", level: "familiar" },
  { icon: <GraphqlSVG />, title: "GraphQL", level: "familiar" },
  { icon: <MongoDBSVG />, title: "MongoDB", level: "familiar" },
];

const Skills = ({ language }) => {
  return (
    <Container id="skills">
      <Inner>
        <Title>{skillsText(language)}</Title>
        <Separator />
        <Subtitle>{skillsListText(language)}</Subtitle>

        {levels.map((level) => (
          <LevelSection key={level.key}>
            <LevelHeader>
              <LevelLabel>{level.label[language]}</LevelLabel>
              <LevelDesc>{level.desc[language]}</LevelDesc>
            </LevelHeader>
            <SkillGrid>
              {skillList
                .filter((s) => s.level === level.key)
                .map((skill) => (
                  <SkillItem key={skill.title}>
                    <IconWrapper>{skill.icon}</IconWrapper>
                    {skill.title}
                  </SkillItem>
                ))}
            </SkillGrid>
          </LevelSection>
        ))}

        <Subtitle>{certsText(language)}</Subtitle>

        <CertRow>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.credly.com/badges/445bcb6b-31b2-4c23-8ca4-adf17e871e42"
          >
            <CertImage
              width="120px"
              height="120px"
              src={awscp}
              alt="AWS Certified Cloud Practitioner"
            />
          </a>
          {/* <a
          // target="_blank"
          // rel="noopener noreferrer"
          // href="https://www.credly.com/badges/445bcb6b-31b2-4c23-8ca4-adf17e871e42"
          >
            <CertImage
              width="120px"
              height="120px"
              src={awssaa}
              alt="AWS Certified Solutions Architect - Associate"
            />
          </a> */}
        </CertRow>
      </Inner>
    </Container>
  );
};

export default Skills;
