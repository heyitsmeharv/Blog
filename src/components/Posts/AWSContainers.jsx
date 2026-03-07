import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSECSSVG, AWSEKSSVG, AWSFargateSVG } from "../../resources/styles/icons";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
  PostImage,
} from "../BlogLayout/BlogLayout";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  TertiaryHeading,
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem,
  IndentedTextList,
  IndentedTextListItem,
} from "../Typography/Typography";

// components
import BackButton from "../Button/BackButton";

// images
import Docker from "../../resources/images/blog/AWSContainers/containers_docker.jpeg";
import EC2LaunchType from "../../resources/images/blog/AWSContainers/containers_ecs_ec2_launch_type.jpeg";
import FargateLaunchType from "../../resources/images/blog/AWSContainers/containers_ecs_fargate_launch_type.jpeg";
import ECSIAMRoles from "../../resources/images/blog/AWSContainers/containers_ecs_iam_roles.jpeg";
import ECSLoadBalancers from "../../resources/images/blog/AWSContainers/containers_ecs_load_balancers.jpeg";
import ECSEFS from "../../resources/images/blog/AWSContainers/containers_ecs_efs.jpeg";
import ECSScaling from "../../resources/images/blog/AWSContainers/containers_ecs_scaling.jpeg";
import ECR from "../../resources/images/blog/AWSContainers/containers_ecr.jpeg";
import EKS from "../../resources/images/blog/AWSContainers/containers_eks.jpeg";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSContainers = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-containers" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>AWS Containers (ECS, EKS, Fargate)</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSECSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSEKSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSFargateSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into containers on AWS, including Amazon ECS (Elastic Container
          Service), Amazon EKS (Elastic Kubernetes Service) and AWS Fargate.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#what-is-docker">What is Docker?</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ecs">Amazon ECS (Elastic Container Service)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#iam-roles-for-ecs">IAM Roles for ECS</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#load-balancers-integration">
              ECS Load Balancers Integration
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ecs-data-volumes">ECS - Data Volumes (EFS)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#auto-scaling">ECS Service Auto Scaling</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ecr">Amazon ECR (Elastic Container Registry)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#eks">Amazon EKS (Elastic Kubernetes Service)</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="what-is-docker">What is Docker?</SectionHeading>
        <Paragraph>
          Docker is an open-source platform designed to automate the deployment, scaling, and management of
          applications within lightweight, portable containers. Containers package an application with all
          its dependencies (libraries, binaries, etc.), ensuring that it runs consistently across different
          environments. Apps are packed in containers that can be run on any OS.
        </Paragraph>

        <PostImage src={Docker} alt="Docker containers high-level overview" />

        <SubSectionHeading>Images</SubSectionHeading>
        <Paragraph>
          A Docker image is a read-only template used to create containers. It contains the application
          code, libraries, and other dependencies needed to run the application. Images are built from a
          set of instructions defined in a Dockerfile.
        </Paragraph>

        <SubSectionHeading>Dockerfile</SubSectionHeading>
        <Paragraph>
          A Dockerfile is a text file that contains a series of commands that Docker uses to build an
          image. It specifies the base image to use, the application code, environment variables, and other
          configurations.
        </Paragraph>

        <SubSectionHeading>Docker Hub</SubSectionHeading>
        <Paragraph>
          Docker Hub is a cloud-based registry service that allows you to find and share container images
          with others. You can pull images from Docker Hub or push your custom images for others to use.
        </Paragraph>

        <SubSectionHeading>Docker Engine</SubSectionHeading>
        <Paragraph>
          Docker Engine is the runtime that runs and manages containers on a host machine. It can be
          thought of as the core of Docker, responsible for creating, running, and managing containers.
        </Paragraph>

        <SubSectionHeading>Volumes</SubSectionHeading>
        <Paragraph>
          Volumes are used to persist data generated by and used by Docker containers. They allow data to
          be stored outside the container so it can be shared between containers or remain available even
          if a container is deleted.
        </Paragraph>

        <SubSectionHeading>Networking</SubSectionHeading>
        <Paragraph>
          Docker provides various networking options to connect containers to each other and to the outside
          world. This includes bridge networks, overlay networks, and host networks, among others.
        </Paragraph>

        <SectionHeading id="ecs">Amazon ECS</SectionHeading>
        <Paragraph>
          Amazon ECS (Elastic Container Service) is a fully managed container orchestration service. It
          allows you to run and manage Docker containers on a cluster of Amazon EC2 instances or using AWS
          Fargate, a serverless compute engine. ECS is designed to simplify the deployment, management, and
          scaling of containerized applications.
        </Paragraph>

        <SubSectionHeading>Cluster</SubSectionHeading>
        <Paragraph>
          A cluster is a logical grouping of EC2 instances or Fargate tasks where your containers are
          deployed and managed. ECS can manage the cluster for you, including provisioning and scaling the
          underlying infrastructure.
        </Paragraph>

        <SubSectionHeading>Task Definition</SubSectionHeading>
        <Paragraph>
          A task definition is a blueprint for your application. It defines the Docker containers that
          should be run as part of a task, specifying details such as the Docker image, CPU and memory
          requirements, networking information, and environment variables.
        </Paragraph>

        <SubSectionHeading>Task</SubSectionHeading>
        <Paragraph>
          A task is an instance of a task definition. When you run a task, ECS launches the containers
          defined in the task definition on your cluster.
        </Paragraph>

        <SubSectionHeading>Service</SubSectionHeading>
        <Paragraph>
          A service in ECS is used to ensure that a specified number of tasks are running continuously.
          Services can automatically scale tasks based on demand and replace failed tasks to maintain the
          desired number of running instances.
        </Paragraph>

        <SubSectionHeading>Launch Types</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>EC2 Launch Type</Strong>: You manage the EC2 instances that make up your cluster. ECS
            schedules and runs containers on these instances.
          </TextListItem>
          <TextListItem>
            <Strong>Fargate Launch Type</Strong>: Fargate is a serverless compute engine that allows you to
            run containers without managing the underlying infrastructure. You define your task and Fargate
            handles provisioning and scaling the compute resources.
          </TextListItem>
        </TextList>

        <TertiaryHeading>EC2 Launch Type</TertiaryHeading>
        <Paragraph>
          For the EC2 launch type you must provision and maintain the infrastructure (EC2 instances). Each
          EC2 instance must run the ECS agent to register into the ECS cluster.
        </Paragraph>

        <PostImage src={EC2LaunchType} alt="ECS EC2 launch type architecture" />

        <TertiaryHeading>Fargate Launch Type</TertiaryHeading>
        <Paragraph>
          With the Fargate launch type you do not provision the infrastructure (no EC2 instances to
          manage). The ECS tasks are run for you based on the CPU / RAM you specify in the task
          definition.
        </Paragraph>

        <PostImage src={FargateLaunchType} alt="ECS Fargate launch type architecture" />

        <SectionHeading id="iam-roles-for-ecs">IAM Roles for ECS</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>EC2 Instance Profile (EC2 Launch Type only):</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>Used by the ECS Agent.</IndentedTextListItem>
          <IndentedTextListItem>Makes API calls to the ECS service.</IndentedTextListItem>
          <IndentedTextListItem>Sends container logs to CloudWatch Logs.</IndentedTextListItem>
          <IndentedTextListItem>Pulls Docker images from ECR.</IndentedTextListItem>
          <IndentedTextListItem>
            References sensitive data in Secrets Manager or SSM Parameter Store.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>ECS Task Role:</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>Allows each task to have a specific role.</IndentedTextListItem>
          <IndentedTextListItem>
            You can use different roles for different ECS services you run.
          </IndentedTextListItem>
          <IndentedTextListItem>Task role is defined in the task definition.</IndentedTextListItem>
        </IndentedTextList>

        <PostImage src={ECSIAMRoles} alt="IAM roles for ECS tasks and instances" />

        <SectionHeading id="load-balancers-integration">
          ECS Load Balancers Integration
        </SectionHeading>

        <Paragraph>
          Load balancers can be used with both ECS launch types. By putting a load balancer in front of your
          tasks, you can expose each task as an HTTP/HTTPS endpoint.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Application Load Balancer (ALB)</Strong>: Supported and works for most use cases.
          </TextListItem>
          <TextListItem>
            <Strong>Network Load Balancer (NLB)</Strong>: Recommended for high-throughput, high-performance
            use cases, or when pairing with AWS PrivateLink.
          </TextListItem>
        </TextList>

        <PostImage src={ECSLoadBalancers} alt="ECS integration with load balancers" />

        <SectionHeading id="ecs-data-volumes">ECS - Data Volumes (EFS)</SectionHeading>

        <Paragraph>
          What happens if you want to persist data on the container? For this you can mount an Amazon EFS
          (Elastic File System) file system onto ECS tasks to share data. Tasks running in any AZ can share
          the same data from the EFS file system.
        </Paragraph>

        <PostImage src={ECSEFS} alt="ECS tasks mounting shared EFS file system" />

        <SectionHeading id="auto-scaling">ECS Service Auto Scaling</SectionHeading>

        <Paragraph>
          You can automatically increase or decrease the desired number of ECS tasks. ECS Service Auto
          Scaling uses <Strong>AWS Application Auto Scaling</Strong>.
        </Paragraph>

        <TextList>
          <TextListItem>ECS Service Average CPU Utilization.</TextListItem>
          <TextListItem>ECS Service Average Memory Utilization - scales on RAM.</TextListItem>
          <TextListItem>ALB Request Count Per Target - metric from the ALB.</TextListItem>
        </TextList>

        <Paragraph>You can also configure different types of scaling policies:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Target Tracking</Strong>: Scale based on a target value for a specific CloudWatch
            metric.
          </TextListItem>
          <TextListItem>
            <Strong>Step Scaling</Strong>: Scale based on CloudWatch alarms with defined step adjustments.
          </TextListItem>
          <TextListItem>
            <Strong>Scheduled Scaling</Strong>: Scale based on a specified date / time (predictable
            changes).
          </TextListItem>
        </TextList>

        <PostImage src={ECSScaling} alt="ECS service auto scaling example" />

        <SectionHeading id="ecr">Amazon ECR (Elastic Container Registry)</SectionHeading>

        <Paragraph>
          Amazon ECR is a fully managed container registry used to store and manage Docker images. You can
          choose to store private or public images. ECR supports image vulnerability scanning, versioning,
          image tags and image lifecycle policies.
        </Paragraph>

        <PostImage src={ECR} alt="Amazon ECR registry overview" />

        <SectionHeading id="eks">Amazon EKS (Elastic Kubernetes Service)</SectionHeading>

        <Paragraph>
          Amazon Elastic Kubernetes Service (Amazon EKS) is a fully managed service that allows you to run
          Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control
          plane or nodes. Kubernetes is an open-source system for automating the deployment, scaling, and
          management of containerized applications, and Amazon EKS simplifies this process by handling much
          of the operational complexity.
        </Paragraph>

        <SubSectionHeading>Managed Control Plane</SubSectionHeading>
        <Paragraph>
          Amazon EKS provides a highly available and secure Kubernetes control plane, which includes the API
          server, etcd (the key-value store), and other core control plane components. AWS manages these
          components, including scaling, patching, and upgrades.
        </Paragraph>

        <SubSectionHeading>Worker Nodes</SubSectionHeading>
        <TextList>
          <TextListItem>
            The worker nodes are the EC2 instances (or Fargate nodes) that run your Kubernetes pods (the
            smallest deployable units in Kubernetes). While you manage the worker nodes, EKS can help
            simplify their setup and scaling.
          </TextListItem>
          <TextListItem>
            EKS also integrates with AWS Fargate, allowing you to run Kubernetes pods without managing the
            underlying EC2 instances.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Cluster Autoscaling</SubSectionHeading>
        <Paragraph>
          EKS supports the Kubernetes Cluster Autoscaler, which automatically adjusts the number of nodes in
          your cluster based on the resource requirements of your workloads.
        </Paragraph>

        <PostImage src={EKS} alt="Amazon EKS high-level architecture" />

        <SubSectionHeading>Node Types</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Managed Node Groups:</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>Creates and manages nodes (EC2 instances) for you.</IndentedTextListItem>
          <IndentedTextListItem>Nodes are part of an Auto Scaling Group managed by EKS.</IndentedTextListItem>
          <IndentedTextListItem>Supports On-Demand or Spot Instances.</IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Self-Managed Nodes:</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Nodes are created by you, registered to the EKS cluster, and managed by an Auto Scaling Group.
          </IndentedTextListItem>
          <IndentedTextListItem>You can use pre-built EKS-Optimised AMIs.</IndentedTextListItem>
          <IndentedTextListItem>Supports On-Demand or Spot Instances.</IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>AWS Fargate:</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>No node maintenance required; no EC2 instances to manage.</IndentedTextListItem>
          <IndentedTextListItem>
            You define pod CPU/memory and Fargate provisions the underlying capacity.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading id="references">References</SubSectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.docker.com/get-started/overview/"
              target="_blank"
              rel="noreferrer"
            >
              Docker - Get Started Overview
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon ECS - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon ECR - What Is Amazon Elastic Container Registry?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EKS - What Is Amazon EKS?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-efs.html"
              target="_blank"
              rel="noreferrer"
            >
              Using Amazon EFS file systems with Amazon ECS
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-autoscaling.html"
              target="_blank"
              rel="noreferrer"
            >
              Service Auto Scaling for Amazon ECS
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSContainers;
