import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// helpers
import { Analytics } from "../helpers/analytics";

// components
import Pagination from "../components/Pagination/Pagination";

// icons
import { DockerSVG, StyledClose } from '../resources/styles/icons';
import { Search } from '@styled-icons/ionicons-solid/Search'
import {
  JavascriptSVG,
  ReactjsSVG,
  AWSWhiteBackgroundSVG,
  AWSIAMSVG,
  AWSOrganisationsSVG,
  AWSControlTowerSVG,
  AWSEC2SVG,
  AWSRDSSVG,
  AWSRoute53SVG,
  AWSS3SVG,
  AWSSnowSVG,
  AWSFSXSVG,
  AWSStorageGatewaySVG,
  AWSTransferFamilySVG,
  AWSDataSyncSVG,
  AWSCloudfrontSVG,
  AWSSQSSVG,
  AWSSNSSVG,
  AWSECSSVG,
  AWSEKSSVG,
  AWSFargateSVG,
  AWSVPCSVG,
  AWSKinesisSVG,
  AWSAthenaSVG,
  AWSRedshiftSVG,
  AWSOpenSearchSVG,
  AWSEMRSVG,
  AWSQuickSightSVG,
  AWSGlueSVG,
  AWSLakeFormationSVG,
  AWSMSKSVG,
  AWSLambdaSVG,
  AWSAPIGatewaySVG,
  AWSStepFunctionsSVG,
  AWSRegoknitionSVG,
  AWSPollySVG,
  AWSLexSVG,
  AWSComprehendSVG,
  AWSSageMakerSVG,
  AWSCloudWatchSVG,
  AWSCloudTrailSVG,
  AWSConfigSVG,
  AWSKMSSVG,
  AWSSSMSVG,
  AWSSecretsManagerSVG,
  AWSCertificateManagerSVG,
  AWSShieldSVG,
  AWSFirewallSVG,
  AWSWAFSVG,
  AWSInspectorSVG,
  AWSMacieSVG,
  BashSVG,
  DevOpsSVG,
  GitHubSVG,
  KubernetesSVG,
  TerraformSVG,
} from '../resources/styles/icons';

const SearchBarWrapper = styled.div`
  display: flex;
  position: relative;
  padding: 1rem 4rem;
`;

const StyledSearchBar = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 45px;
  font-size: 1.5rem;
`;

const StyledSearchIcon = styled(Search)`
  position: absolute;
  align-self: center;
  color: ${({ theme }) => theme.icon};
  width: 2.5rem;
  padding: 0 8px;
`;

const StyledCloseIcon = styled(StyledClose)`
  color: ${({ theme }) => theme.icon};
`;

const StyledCloseButton = styled.button`
  position: absolute;
  right: 40px;
  height: 50px;
  width: 60px;
  outline: none;
  border: none;
  background: none;
  :hover {
    cursor: pointer;
  }
`;

const StyledPillButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPillButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: ${props => props.colour}; 
  text-align: center;
  font-size: 1.5rem;
  margin: 10px;
  transition: border-color 0.5s ease;
  border: 2px solid transparent;
  :hover {
    cursor: pointer;
    border-color:  ${({ theme }) => theme.text};
  }

  ${props => props.active && css`
    color: white;
    font-weight: bold;
  `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  background-color: #f8f9fa;
  color: #343a40;
`;

const Message = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.primary}; 
  color: ${({ theme }) => theme.text}; 
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary}; 
  }
`;


/* COOL TAG COLOURS */
// #64CBF6
// #8B191D
// #23262E
// #84994F

export default function Blog() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterButtons, setFilterButtons] = useState([
    {
      name: "AWS",
      colour: "#FF9900",
      active: false,
    },
    {
      name: "JavaScript",
      colour: "#F4BF36",
      active: false,
    },
    {
      name: "React",
      colour: "#64CBF6",
      active: false,
    },
    {
      name: "DevOps",
      colour: "#8B191D",
      active: false,
    },
  ]);
  const [blogPosts, setBlogPosts] = useState([
    // {
    //   title: 'The Start',
    //   readingTime: 'less than 1 minute',
    //   type: '',
    //   date: '05/04/2023',
    //   tags: [{ name: 'Misc', background: '#23262E' }],
    //   intro: `For a long time I've wanted to write a blog about technologies I'm interested in.
    //         The purpose of this blog is just to document my personal journey learning cool tech,
    //         if only to cement my own understanding and potentially help people with similar interests...`,
    //   navigate: 'the-start',
    //   published: true
    // },
    {
      title: 'JavaScript Arrays',
      readingTime: 'approx 10 minutes',
      type: 'Theory',
      date: '12/04/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `Do you ever find yourself forgetting what helper methods would be best to manipulate your data? 
        In this post, I would like to go through the different helper functions and the use cases for manipulating your data.
        But before we get into that... 
      `,
      navigate: 'javascript-arrays',
      published: true
    },
    {
      title: 'JavaScript Objects',
      readingTime: 'approx 5 minutes',
      type: 'Theory',
      date: '04/05/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `After writing a blog post about arrays, which you can find here. Naturally it feels like the next post needs to be about JavaScript Objects. 
      Similar to my last post, I'll be keeping a similar format; that being explaining what objects are and how we can use them. Simple enough? Let's get it...`,
      navigate: 'javascript-objects',
      published: true
    },
    {
      title: 'AWS IAM',
      readingTime: 'approx 8 minutes',
      type: 'Study',
      date: '26/10/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSIAMSVG /> }, { name: 'Organisations', background: '#FF9900', icon: <AWSOrganisationsSVG /> }, { name: 'Control Tower', background: '#FF9900', icon: <AWSControlTowerSVG /> }],
      intro: `This is the first of my AWS series blog posts where I'll be going through the Identity and Access Management Service, also known as IAM. I'm hoping 
      this will serve at least somewhat of a refresher or a quick reference guide for those familiar with the IAM service; if not getting to grips with the basics...`,
      navigate: 'aws-identity-access-management',
      published: true
    },
    {
      title: 'AWS EC2',
      readingTime: 'approx 25 minutes',
      type: 'Study',
      date: '02/11/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSEC2SVG /> }],
      intro: `In this blog post we'll be going through the Elastic Compute Cloud service, also known as EC2 which can be defined as an infrastructure as a Service (IaaS). 
      In short EC2 is a virtual service in the AWS cloud. Why would you need this? Well, any time you need to compute a task this service will be handy...`,
      navigate: 'aws-elastic-compute-cloud',
      published: true
    },
    {
      title: 'AWS Databases',
      readingTime: 'approx 20 minutes',
      type: 'Study',
      date: '20/12/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'RDS', background: '#FF9900', icon: <AWSRDSSVG /> }],
      intro: `This service allows you to create a database in the cloud. You can choose from the following: Microsoft SQL Server, MySQL, Postgres, MariaDB, Oracle,
      This service is managed by AWS which means you won't be able to SSH into the instance but you do benefit from a list of services such as...`,
      navigate: 'aws-databases',
      published: true
    },
    {
      title: 'AWS Route53',
      readingTime: 'approx 16 minutes',
      type: 'Study',
      date: '24/05/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Route53', background: '#FF9900', icon: <AWSRoute53SVG /> }],
      intro: `Amazon Route 53 is a scalable and highly available Domain Name System (DNS). It is designed to route end-user requests to internet applications hosted on AWS infrastructure,
      as well as external resources. Overall, Amazon Route 53 is a robust solution for DNS management...`,
      navigate: 'aws-route53',
      published: true
    },
    {
      title: 'AWS S3',
      readingTime: 'approx 25 mins',
      type: 'Study',
      date: '28/05/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'S3', background: '#FF9900', icon: <AWSS3SVG /> }, { name: 'Snow', background: '#FF9900', icon: <AWSSnowSVG /> }, { name: 'FSX', background: '#FF9900', icon: <AWSFSXSVG /> }, { name: 'Storage Gateway', background: '#FF9900', icon: <AWSStorageGatewaySVG /> }, { name: 'Transfer Family', background: '#FF9900', icon: <AWSTransferFamilySVG /> }, { name: 'Data Sync', background: '#FF9900', icon: <AWSDataSyncSVG /> }],
      intro: `Amazon Simple Storage Service (Amazon S3) is a highly scalable, durable, and secure object storage service. Amazon S3 is widely used across industries for its reliability,
      scalability, and security, making it a foundational service for storing and managing data in the cloud...`,
      navigate: 'aws-s3',
      published: true
    },
    {
      title: 'AWS CloudFront',
      readingTime: 'approx 7 mins',
      type: 'Study',
      date: '24/07/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'CloudFront', background: '#FF9900', icon: <AWSCloudfrontSVG /> }],
      intro: `Amazon CloudFront is a content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds. 
      CloudFront integrates with other AWS services to give developers and businesses...`,
      navigate: 'aws-cloudfront',
      published: true
    },
    {
      title: 'AWS SQS',
      readingTime: 'approx 5 mins',
      type: 'Study',
      date: '05/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Simple Queue Service', background: '#FF9900', icon: <AWSSQSSVG /> }],
      intro: `Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service provided by Amazon Web Services (AWS). It enables the decoupling and scaling of microservices, 
      distributed systems, and serverless applications. When we start deploying multiple applications, they will...`,
      navigate: 'aws-sqs',
      published: true
    },
    {
      title: 'AWS SNS',
      readingTime: 'approx 4 mins',
      type: 'Study',
      date: '06/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Simple Notification Service', background: '#FF9900', icon: <AWSSNSSVG /> }],
      intro: `Amazon Simple Notification Service (Amazon SNS) is a fully managed messaging service provided by Amazon Web Services (AWS) designed to send messages to a large number of subscribers or other services. 
      What if you wanted to send one message to many endpoints? Instead of having a direct integration with each endpoint/service...`,
      navigate: 'aws-sns',
      published: true
    },
    {
      title: 'AWS Kinesis',
      readingTime: 'approx 6 mins',
      type: 'Study',
      date: '28/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Kinesis', background: '#FF9900', icon: <AWSKinesisSVG /> }],
      intro: `Amazon Kinesis is designed to handle real-time data streaming and processing. It allows you to collect, process, and analyze large streams of data in real-time, making it ideal for use cases that require 
      immediate insights or actions based on incoming data. Here's an overview of the main components and features of Amazon Kinesis...`,
      navigate: 'aws-kinesis',
      published: true
    },
    {
      title: 'AWS Containers',
      readingTime: 'approx 10 mins',
      type: 'Study',
      date: '06/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Elastic Container Service', background: '#FF9900', icon: <AWSECSSVG /> }, { name: 'Elastic Kubernetes Service', background: '#FF9900', icon: <AWSEKSSVG /> }, { name: 'Fargate', background: '#FF9900', icon: <AWSFargateSVG /> }],
      intro: `Docker is an open-source platform designed to automate the deployment, scaling, and management of applications within lightweight, portable containers. Containers package an application with all its dependencies 
      (libraries, binaries, etc.), ensuring that it runs consistently across different environments. Apps are packed in containers that can be run on any OS...`,
      navigate: 'aws-containers',
      published: true
    },
    {
      title: 'AWS VPC',
      readingTime: 'approx 30 mins',
      type: 'Study',
      date: '11/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Virtual Private Cloud', background: '#FF9900', icon: <AWSVPCSVG /> }],
      intro: `A Virtual Private Cloud (VPC) is a logically isolated section of the AWS cloud where you can launch AWS resources, such as EC2 instances, within a virtual network that you define. A VPC allows you to 
      customize your network environment, including selecting your own IP address range, creating subnets, configuring route tables, and setting up gateways...`,
      navigate: 'aws-vpc',
      published: true
    },
    {
      title: 'AWS Data and Analytics',
      readingTime: 'approx 8 mins',
      type: 'Study',
      date: '04/09/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Athena', background: '#FF9900', icon: <AWSAthenaSVG /> }, { name: 'Redshift', background: '#FF9900', icon: <AWSRedshiftSVG /> }, { name: 'Open Search', background: '#FF9900', icon: <AWSOpenSearchSVG /> }, { name: 'EMR', background: '#FF9900', icon: <AWSEMRSVG /> }, { name: 'QuickSight', background: '#FF9900', icon: <AWSQuickSightSVG /> }, { name: 'Glue', background: '#FF9900', icon: <AWSGlueSVG /> }, { name: 'LakeFormation', background: '#FF9900', icon: <AWSLakeFormationSVG /> }, { name: 'MSK', background: '#FF9900', icon: <AWSMSKSVG /> }],
      intro: `AWS Athena is a serverless interactive query service provided by Amazon Web Services that allows you to analyze data directly in Amazon S3 using standard SQL. It is designed for simplicity and cost-efficiency, 
      making it a popular choice for data analytics. Athena supports formats including CSV, JSON, ORC, Avro and Parquet...`,
      navigate: 'aws-data-analytics',
      published: true
    },
    {
      title: 'AWS Serverless',
      readingTime: 'approx 6 mins',
      type: 'Study',
      date: '12/01/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Lambda', background: '#FF9900', icon: <AWSLambdaSVG /> }, { name: 'API Gateway', background: '#FF9900', icon: <AWSAPIGatewaySVG /> }, { name: 'Step Functions', background: '#FF9900', icon: <AWSStepFunctionsSVG /> }],
      intro: `Before we explore any AWS services that are classed as serverless, let's first outline what constitutes as 'Serverless'. Serverless was a term that was pioneered by AWS Lambda but now includes anything that's managed: databases, messaging, storage, etc. Serverless
      doesn't mean there are no servers, it means you don't have to manage, provision, or see them...`,
      navigate: 'aws-serverless',
      published: true
    },
    {
      title: 'AWS Machine Learning',
      readingTime: 'approx 5 mins',
      type: 'Study',
      date: '15/01/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Rekognition', background: '#FF9900', icon: <AWSRegoknitionSVG /> }, { name: 'Polly', background: '#FF9900', icon: <AWSPollySVG /> }, { name: 'Lex', background: '#FF9900', icon: <AWSLexSVG /> }, { name: 'Comprehend', background: '#FF9900', icon: <AWSComprehendSVG /> }, { name: 'SageMaker', background: '#FF9900', icon: <AWSSageMakerSVG /> }],
      intro: `
      Amazon Rekognition is a cloud-based image and video analysis service that makes it easy to add advanced computer vision capabilities to your applications. Amazon Rekognition includes a simple, easy-to-use API that can quickly analyze 
      any image or video file that’s stored in Amazon S3...`,
      navigate: 'aws-machine-learning',
      published: true
    },
    {
      title: 'AWS Monitoring & Audit',
      readingTime: 'approx 8 mins',
      type: 'Study',
      date: '17/01/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'CloudWatch', background: '#FF9900', icon: <AWSCloudWatchSVG /> }, { name: 'CloudTrail', background: '#FF9900', icon: <AWSCloudTrailSVG /> }, { name: 'Config', background: '#FF9900', icon: <AWSConfigSVG /> }],
      intro: `Amazon CloudWatch is a monitoring and observability service provided by AWS that collects and tracks metrics, monitors logs, and generates alerts for your applications and infrastructure. 
      It enables you to gain actionable insights into system performance, optimize resource utilization, and troubleshoot operational issues in real time...`,
      navigate: 'aws-monitoring-audit',
      published: true
    },
    {
      title: 'AWS Security & Encryption',
      readingTime: 'approx 10 mins',
      type: 'Study',
      date: '03/02/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'KMS', background: '#FF9900', icon: <AWSKMSSVG /> }, { name: 'SSM', background: '#FF9900', icon: <AWSSSMSVG /> }, { name: 'Secrets Manager', background: '#FF9900', icon: <AWSSecretsManagerSVG /> }, { name: 'ACM', background: '#FF9900', icon: <AWSCertificateManagerSVG /> }, { name: 'Sheild', background: '#FF9900', icon: <AWSShieldSVG /> }, { name: 'Firewall', background: '#FF9900', icon: <AWSFirewallSVG /> }, { name: 'WAF', background: '#FF9900', icon: <AWSWAFSVG /> }, { name: 'Inspector', background: '#FF9900', icon: <AWSInspectorSVG /> }, { name: 'Macie', background: '#FF9900', icon: <AWSMacieSVG /> }],
      intro: `Encryption is necessary to protect sensitive information being sent or received over a network from being hijacked or leaked. The information (data)
      is encrypted before sending and decrypting after receiving...`,
      navigate: 'aws-security-encryption',
      published: true
    },
    {
      title: 'React.js Text Based Adventure Game',
      readingTime: 'N/A',
      type: 'Practical',
      date: '07/05/2023',
      tags: [{ name: 'React', background: '#64CBF6', icon: <ReactjsSVG /> }, { name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `I've been contemplating on whether or not to do a separate blog post to explain what the React.js framework is but I want to move away from my last posts and get stuck in with building something!
      If you're completely new to React I would recommend having a gander at their documentation...`,
      navigate: 'react-text-based-adventure',
      published: false
    },
    {
      title: 'Getting Started with Bash Scripting',
      readingTime: 'approx 45 mins',
      type: 'Practical',
      date: '09/10/2025',
      tags: [{ name: 'DevOps', background: '#8B191D', icon: <DevOpsSVG /> }, { name: 'Bash', background: '#000', icon: <BashSVG /> }],
      intro: `When you first start working in the command line, it can feel like stepping into a different world - one where you're talking directly to your computer instead of clicking buttons. 
      It's intimidating at first, but once you realise how much power sits behind a few keystrokes it's addictive. In this post...`,
      navigate: 'getting-started-with-bash-scripting',
      published: true
    },
    {
      title: 'GitHub CI/CD',
      readingTime: 'approx 10 mins',
      type: 'Practical',
      date: '10/12/2025',
      tags: [{ name: 'DevOps' }, { name: 'GitHub', background: '#000', icon: <GitHubSVG /> }],
      intro: `GitHub Actions has quietly become one of the most powerful tools in a modern developer's toolkit. It's where your tests run, your Docker images build, your infrastructure deploys, and 
      your app quietly rolls out to production while you're making coffee...`,
      navigate: 'github-ci-cd',
      published: true
    },
    {
      title: 'Introduction to Docker and Kubernetes',
      readingTime: 'N/A',
      type: 'Practical',
      date: '10/12/2025',
      tags: [{ name: 'DevOps' }, { name: 'Docker', background: '#D3ECEC', icon: <DockerSVG /> }],
      intro: `Docker and Kubernetes can sometimes feel intimidating - a world full of clusters, orchestrators, containers, pods, and YAML files. But when you peel back the layers, the story they tell is 
      actually quite simple: build your software once, run it consistently everywhere, and scale it effortlessly...`,
      navigate: 'intro-to-docker-kubernetes',
      published: false
    },
    {
      title: 'Infrastructure as Code (IaC) with Terraform',
      readingTime: 'N/A',
      type: 'Practical',
      date: '03/01/2026',
      tags: [{ name: 'Terraform', background: '#2E71E5', icon: <TerraformSVG /> }, { name: 'DevOps' }],
      intro: `In this post, we're going to build a Terraform template repo and work through the core workflow (init, plan, apply). We'll cover how to structure a project sensibly, and how to take the 
      same setup from local development into CI and multiple environments....`,
      navigate: 'infrastructure-as-code-with-terraform',
      published: false
    }
  ]);

  const defaultArr = [
    // {
    //   title: 'The Start',
    //   readingTime: 'less than 1 minute',
    //   type: '',
    //   date: '05/04/2023',
    //   tags: [{ name: 'Misc', background: '#23262E' }],
    //   intro: `For a long time I've wanted to write a blog about technologies I'm interested in.
    //         The purpose of this blog is just to document my personal journey learning cool tech,
    //         if only to cement my own understanding and potentially help people with similar interests...`,
    //   navigate: 'the-start',
    //   published: true
    // },
    {
      title: 'JavaScript Arrays',
      readingTime: 'approx 10 minutes',
      type: 'Theory',
      date: '12/04/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `Do you ever find yourself forgetting what helper methods would be best to manipulate your data? 
      In this post, I would like to go through the different helper functions and the use cases for manipulating your data.
      But before we get into that...
    `,
      navigate: 'javascript-arrays',
      published: true
    },
    {
      title: 'JavaScript Objects',
      readingTime: 'approx 5 minutes',
      type: 'Theory',
      date: '04/05/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `After writing a blog post about arrays, which you can find here. Naturally it feels like the next post needs to be about JavaScript Objects. 
      Similar to my last post, I'll be keeping a similar format; that being explaining what objects are and how we can use them. Simple enough? Let's get it...`,
      navigate: 'javascript-objects',
      published: true
    },
    {
      title: 'AWS IAM',
      readingTime: 'approx 8 minutes',
      type: 'Study',
      date: '26/10/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSIAMSVG /> }, { name: 'Organisations', background: '#FF9900', icon: <AWSOrganisationsSVG /> }, { name: 'Control Tower', background: '#FF9900', icon: <AWSControlTowerSVG /> }],
      intro: `This is the first of my AWS series blog posts where I'll be going through the Identity and Access Management Service, also known as IAM. I'm hoping 
      this will serve at least somewhat of a refresher or a quick reference guide for those familiar with the IAM service; if not getting to grips with the basics...`,
      navigate: 'aws-identity-access-management',
      published: true
    },
    {
      title: 'AWS EC2',
      readingTime: 'approx 25 minutes',
      type: 'Study',
      date: '02/11/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSEC2SVG /> }],
      intro: `In this blog post we'll be going through the Elastic Compute Cloud service, also known as EC2 which can be defined as an infrastructure as a Service (IaaS). 
      In short EC2 is a virtual service in the AWS cloud. Why would you need this? Well, any time you need to compute a task this service will be handy...`,
      navigate: 'aws-elastic-compute-cloud',
      published: true
    },
    {
      title: 'AWS Databases',
      readingTime: 'approx 20 minutes',
      type: 'Study',
      date: '20/12/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'RDS', background: '#FF9900', icon: <AWSRDSSVG /> }],
      intro: `This service allows you to create a database in the cloud. You can choose from the following: Microsoft SQL Server, MySQL, Postgres, MariaDB, Oracle,
      This service is managed by AWS which means you won't be able to SSH into the instance but you do benefit from a list of services such as...`,
      navigate: 'aws-databases',
      published: true
    },
    {
      title: 'AWS Route53',
      readingTime: 'approx 16 minutes',
      type: 'Study',
      date: '24/05/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Route53', background: '#FF9900', icon: <AWSRoute53SVG /> }],
      intro: `Amazon Route 53 is a scalable and highly available Domain Name System (DNS). It is designed to route end-user requests to internet applications hosted on AWS infrastructure,
      as well as external resources. Overall, Amazon Route 53 is a robust solution for DNS management...`,
      navigate: 'aws-route53',
      published: true
    },
    {
      title: 'AWS S3',
      readingTime: 'approx 25 mins',
      type: 'Study',
      date: '28/05/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'S3', background: '#FF9900', icon: <AWSS3SVG /> }, { name: 'Snow', background: '#FF9900', icon: <AWSSnowSVG /> }, { name: 'FSX', background: '#FF9900', icon: <AWSFSXSVG /> }, { name: 'Storage Gateway', background: '#FF9900', icon: <AWSStorageGatewaySVG /> }, { name: 'Transfer Family', background: '#FF9900', icon: <AWSTransferFamilySVG /> }, { name: 'Data Sync', background: '#FF9900', icon: <AWSDataSyncSVG /> }],
      intro: `Amazon Simple Storage Service (Amazon S3) is a highly scalable, durable, and secure object storage service. Amazon S3 is widely used across industries for its reliability,
      scalability, and security, making it a foundational service for storing and managing data in the cloud...`,
      navigate: 'aws-s3',
      published: true
    },
    {
      title: 'AWS CloudFront',
      readingTime: 'approx 7 mins',
      type: 'Study',
      date: '24/07/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'CloudFront', background: '#FF9900', icon: <AWSCloudfrontSVG /> }],
      intro: `Amazon CloudFront is a content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds. 
      CloudFront integrates with other AWS services to give developers and businesses...`,
      navigate: 'aws-cloudfront',
      published: true
    },
    {
      title: 'AWS SQS',
      readingTime: 'approx 5 mins',
      type: 'Study',
      date: '05/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Simple Queue Service', background: '#FF9900', icon: <AWSSQSSVG /> }],
      intro: `Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service provided by Amazon Web Services (AWS). It enables the decoupling and scaling of microservices, 
      distributed systems, and serverless applications. When we start deploying multiple applications, they will...`,
      navigate: 'aws-sqs',
      published: true
    },
    {
      title: 'AWS SNS',
      readingTime: 'approx 4 mins',
      type: 'Study',
      date: '06/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Simple Notification Service', background: '#FF9900', icon: <AWSSNSSVG /> }],
      intro: `Amazon Simple Notification Service (Amazon SNS) is a fully managed messaging service provided by Amazon Web Services (AWS) designed to send messages to a large number of subscribers or other services. 
      What if you wanted to send one message to many endpoints? Instead of having a direct integration with each endpoint/service...`,
      navigate: 'aws-sns',
      published: true
    },
    {
      title: 'AWS Kinesis',
      readingTime: 'approx 6 mins',
      type: 'Study',
      date: '28/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Kinesis', background: '#FF9900', icon: <AWSKinesisSVG /> }],
      intro: `Amazon Kinesis is designed to handle real-time data streaming and processing. It allows you to collect, process, and analyze large streams of data in real-time, making it ideal for use cases that require 
      immediate insights or actions based on incoming data. Here's an overview of the main components and features of Amazon Kinesis...`,
      navigate: 'aws-kinesis',
      published: true
    },
    {
      title: 'AWS Containers',
      readingTime: 'approx 10 mins',
      type: 'Study',
      date: '06/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Elastic Container Service', background: '#FF9900', icon: <AWSECSSVG /> }, { name: 'Elastic Kubernetes Service', background: '#FF9900', icon: <AWSEKSSVG /> }, { name: 'Fargate', background: '#FF9900', icon: <AWSFargateSVG /> }],
      intro: `Docker is an open-source platform designed to automate the deployment, scaling, and management of applications within lightweight, portable containers. Containers package an application with all its dependencies 
      (libraries, binaries, etc.), ensuring that it runs consistently across different environments. Apps are packed in containers that can be run on any OS...`,
      navigate: 'aws-containers',
      published: true
    },
    {
      title: 'AWS VPC',
      readingTime: 'approx 30 mins',
      type: 'Study',
      date: '11/08/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Virtual Private Cloud', background: '#FF9900', icon: <AWSVPCSVG /> }],
      intro: `A Virtual Private Cloud (VPC) is a logically isolated section of the AWS cloud where you can launch AWS resources, such as EC2 instances, within a virtual network that you define. A VPC allows you to 
      customize your network environment, including selecting your own IP address range, creating subnets, configuring route tables, and setting up gateways...`,
      navigate: 'aws-vpc',
      published: true
    },
    {
      title: 'AWS Data and Analytics',
      readingTime: 'approx 8 mins',
      type: 'Study',
      date: '04/09/2024',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Athena', background: '#FF9900', icon: <AWSAthenaSVG /> }, { name: 'Redshift', background: '#FF9900', icon: <AWSRedshiftSVG /> }, { name: 'Open Search', background: '#FF9900', icon: <AWSOpenSearchSVG /> }, { name: 'EMR', background: '#FF9900', icon: <AWSEMRSVG /> }, { name: 'QuickSight', background: '#FF9900', icon: <AWSQuickSightSVG /> }, { name: 'Glue', background: '#FF9900', icon: <AWSGlueSVG /> }, { name: 'LakeFormation', background: '#FF9900', icon: <AWSLakeFormationSVG /> }, { name: 'MSK', background: '#FF9900', icon: <AWSMSKSVG /> }],
      intro: `AWS Athena is a serverless interactive query service provided by Amazon Web Services that allows you to analyze data directly in Amazon S3 using standard SQL. It is designed for simplicity and cost-efficiency, 
      making it a popular choice for data analytics. Athena supports formats including CSV, JSON, ORC, Avro and Parquet...`,
      navigate: 'aws-data-analytics',
      published: true
    },
    {
      title: 'AWS Serverless',
      readingTime: 'approx 6 mins',
      type: 'Study',
      date: '12/01/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Lambda', background: '#FF9900', icon: <AWSLambdaSVG /> }, { name: 'API Gateway', background: '#FF9900', icon: <AWSAPIGatewaySVG /> }, { name: 'Step Functions', background: '#FF9900', icon: <AWSStepFunctionsSVG /> }],
      intro: `Before we explore any AWS services that are classed as serverless, let's first outline what constitutes as 'Serverless'. Serverless was a term that was pioneered by AWS Lambda but now includes anything that's managed: databases, messaging, storage, etc. Serverless
      doesn't mean there are no servers, it means you don't have to manage, provision, or see them...`,
      navigate: 'aws-serverless',
      published: true
    },
    {
      title: 'AWS Machine Learning',
      readingTime: 'approx 5 mins',
      type: 'Study',
      date: '15/01/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'Rekognition', background: '#FF9900', icon: <AWSRegoknitionSVG /> }, { name: 'Polly', background: '#FF9900', icon: <AWSPollySVG /> }, { name: 'Lex', background: '#FF9900', icon: <AWSLexSVG /> }, { name: 'Comprehend', background: '#FF9900', icon: <AWSComprehendSVG /> }, { name: 'SageMaker', background: '#FF9900', icon: <AWSSageMakerSVG /> }],
      intro: `
      Amazon Rekognition is a cloud-based image and video analysis service that makes it easy to add advanced computer vision capabilities to your applications. Amazon Rekognition includes a simple, easy-to-use API that can quickly analyze 
      any image or video file that’s stored in Amazon S3...`,
      navigate: 'aws-machine-learning',
      published: true
    },
    {
      title: 'AWS Monitoring & Audit',
      readingTime: 'approx 8 mins',
      type: 'Study',
      date: '17/01/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'CloudWatch', background: '#FF9900', icon: <AWSCloudWatchSVG /> }, { name: 'CloudTrail', background: '#FF9900', icon: <AWSCloudTrailSVG /> }, { name: 'Config', background: '#FF9900', icon: <AWSConfigSVG /> }],
      intro: `Amazon CloudWatch is a monitoring and observability service provided by AWS that collects and tracks metrics, monitors logs, and generates alerts for your applications and infrastructure. 
      It enables you to gain actionable insights into system performance, optimize resource utilization, and troubleshoot operational issues in real time...`,
      navigate: 'aws-monitoring-audit',
      published: true
    },
    {
      title: 'AWS Security & Encryption',
      readingTime: 'approx 10 mins',
      type: 'Study',
      date: '03/02/2025',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSWhiteBackgroundSVG /> }, { name: 'KMS', background: '#FF9900', icon: <AWSKMSSVG /> }, { name: 'SSM', background: '#FF9900', icon: <AWSSSMSVG /> }, { name: 'Secrets Manager', background: '#FF9900', icon: <AWSSecretsManagerSVG /> }, { name: 'ACM', background: '#FF9900', icon: <AWSCertificateManagerSVG /> }, { name: 'Sheild', background: '#FF9900', icon: <AWSShieldSVG /> }, { name: 'Firewall', background: '#FF9900', icon: <AWSFirewallSVG /> }, { name: 'WAF', background: '#FF9900', icon: <AWSWAFSVG /> }, { name: 'Inspector', background: '#FF9900', icon: <AWSInspectorSVG /> }, { name: 'Macie', background: '#FF9900', icon: <AWSMacieSVG /> }],
      intro: `Encryption is necessary to protect sensitive information being sent or received over a network from being hijacked or leaked. The information (data)
      is encrypted before sending and decrypting after receiving...`,
      navigate: 'aws-security-encryption',
      published: true
    },
    {
      title: 'React.js Text Based Adventure Game',
      readingTime: 'N/A',
      type: 'Practical',
      date: '07/05/2023',
      tags: [{ name: 'React', background: '#64CBF6', icon: <ReactjsSVG /> }, { name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `I've been contemplating on whether or not to do a separate blog post to explain what the React.js framework is but I want to move away from my last posts and get stuck in with building something!
      If you're completely new to React I would recommend having a gander at their documentation...`,
      navigate: 'react-text-based-adventure',
      published: false
    },
    {
      title: 'Getting Started with Bash Scripting',
      readingTime: 'approx 45 mins',
      type: 'Practical',
      date: '09/10/2025',
      tags: [{ name: 'DevOps', background: '#8B191D', icon: <DevOpsSVG /> }, { name: 'Bash', background: '#000', icon: <BashSVG /> }],
      intro: `When you first start working in the command line, it can feel like stepping into a different world - one where you're talking directly to your computer instead of clicking buttons. 
      It's intimidating at first, but once you realise how much power sits behind a few keystrokes it's addictive. In this post...`,
      navigate: 'getting-started-with-bash-scripting',
      published: true
    },
    {
      title: 'GitHub CI/CD',
      readingTime: 'approx 10 mins',
      type: 'Practical',
      date: '10/12/2025',
      tags: [{ name: 'DevOps' }, { name: 'GitHub', background: '#000', icon: <GitHubSVG /> }],
      intro: `GitHub Actions has quietly become one of the most powerful tools in a modern developer's toolkit. It's where your tests run, your Docker images build, your infrastructure deploys, and 
      your app quietly rolls out to production while you're making coffee...`,
      navigate: 'github-ci-cd',
      published: true
    },
    {
      title: 'Introduction to Docker and Kubernetes',
      readingTime: 'N/A',
      type: 'Practical',
      date: '10/12/2025',
      tags: [{ name: 'DevOps' }, { name: 'Docker', background: '#D3ECEC', icon: <DockerSVG /> }, { name: 'Kubernetes', background: '#326DE6', icon: <KubernetesSVG /> }],
      intro: `Docker and Kubernetes can sometimes feel intimidating - a world full of clusters, orchestrators, containers, pods, and YAML files. But when you peel back the layers, the story they tell is 
      actually quite simple: build your software once, run it consistently everywhere, and scale it effortlessly...`,
      navigate: 'intro-to-docker-kubernetes',
      published: false
    },
    {
      title: 'Infrastructure as Code (IaC) with Terraform',
      readingTime: 'N/A',
      type: 'Practical',
      date: '03/01/2026',
      tags: [{ name: 'Terraform', background: '#2E71E5', icon: <TerraformSVG /> }, { name: 'DevOps' }],
      intro: `In this post, we're going to build a Terraform template repo and work through the core workflow (init, plan, apply). We'll cover how to structure a project sensibly, and how to take the 
      same setup from local development into CI and multiple environments....`,
      navigate: 'infrastructure-as-code-with-terraform',
      published: false
    }
  ];

  useEffect(() => {
    Analytics.event('blog', { slug: 'post-selection' });
  }, []);

  useEffect(() => {
    if (search !== '') {
      setBlogPosts(blogPosts.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.type.toLowerCase().includes(search.toLowerCase())));
      if (blogPosts.length === 0) {
        setIsEmpty(true)
      }
    } else {
      setIsEmpty(false)
      setBlogPosts(defaultArr);
    }
  }, [search]);

  const handlePillButtonClick = button => {
    setCurrentPage(1);
    const newFilterButtons = [...filterButtons];
    const index = newFilterButtons.indexOf(button);
    newFilterButtons[index].active = !newFilterButtons[index].active;
    setFilterButtons(newFilterButtons);

    const filterActive = filterButtons.some(x => x.active === true);

    const arr = [];

    if (filterActive) {
      defaultArr.map(post => {
        post.tags.map(tag => {
          filterButtons.map(filterButton => {
            if (filterButton.active) {
              if (tag.name === filterButton.name) {
                if (!arr.includes(post)) {
                  arr.push(post);
                }
              }
            }
          })
        })
      })
      setBlogPosts(arr);
    } else {
      setBlogPosts(defaultArr);
    }
  };

  return (
    <>
      <SearchBarWrapper>
        <StyledSearchIcon />
        <StyledSearchBar placeholder="Search" type="text" onChange={e => setSearch(e.target.value)} value={search} />
        <StyledCloseButton onClick={() => setSearch('')}> <StyledCloseIcon /></StyledCloseButton>
      </SearchBarWrapper>
      <StyledPillButtonWrapper>
        {filterButtons.map((button, key) => {
          return (
            <StyledPillButton
              key={key}
              colour={button.colour}
              active={button.active}
              onClick={() => handlePillButtonClick(button)}
            >
              {button.name}
            </StyledPillButton>
          );
        })}
      </StyledPillButtonWrapper>
      {!isEmpty ?
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={6} items={blogPosts} />
        : <Container>
          <Message>0 Results Found</Message>
          <Description>Sorry, but there's no match for your search.</Description>
          <Button onClick={() => setSearch('')}>Clear</Button>
        </Container>
      }
    </>
  );
}