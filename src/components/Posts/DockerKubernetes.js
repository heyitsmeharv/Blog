import React, { useEffect } from 'react';
import styled from 'styled-components';

// helpers
import { Analytics } from '../../helpers/analytics';

// animations
import SlideInBottom from '../../animations/SlideInBottom';

// components
import BackButton from '../Button/BackButton';
import { CodeBlockWithCopy } from '../Code/Code';

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from '../BlogLayout/BlogLayout';

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  InlineHighlight,
  Strong,
  TextLink,
} from '../Typography/Typography';

// icons
import { DockerSVG, KubernetesSVG } from '../../resources/styles/icons';

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const dockerRunExample = `docker run hello-world`;

const simpleNodeDockerfile = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "server.js"]`;

const dockerComposeExample = `services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/app

  db:
    image: postgres:16
    environment:
      - POSTGRES_PASSWORD=password`;

const kubernetesDeployment = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:
        app: demo
    spec:
      containers:
        - name: demo
          image: demo-image:latest
          ports:
            - containerPort: 8080`;

const kubernetesService = `apiVersion: v1
kind: Service
metadata:
  name: demo-service
spec:
  selector:
    app: demo
  ports:
    - port: 80
      targetPort: 8080
  type: NodePort`;

const DockerKubernetes = () => {
  useEffect(() => {
    Analytics.event('blog_opened', { slug: 'introduction-to-docker-kubernetes' });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>Introduction to Docker & Kubernetes</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <DockerSVG />
            </HeaderIcon>
            <HeaderIcon>
              <KubernetesSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          Docker and Kubernetes can sometimes feel intimidating - a world full of clusters,
          orchestrators, containers, pods, and YAML files. But when you peel back the layers,
          the story they tell is actually quite simple: build your software once, run it
          consistently everywhere, and scale it effortlessly.
        </Paragraph>

        <Paragraph>
          In this post, I'm going to walk you through a full learning journey that follows the
          natural progression of how developers actually use Docker and Kubernetes today.
          Rather than memorising commands, the goal is to help you understand <Strong>why</Strong>
          each tool exists, <Strong>when</Strong> you'd use it, and <Strong>how</Strong> it all fits
          together in a real workflow.
        </Paragraph>

        <SectionHeading>Introduction to Containers</SectionHeading>

        <Paragraph>
          Before touching Kubernetes, YAML files, or cluster dashboards, it's important to
          understand the foundation everything is built on: containers. A container is simply
          a packaged environment containing your application and everything it needs to run.
          No more “works on my machine” - because the machine is inside the container.
        </Paragraph>

        <Paragraph>
          Docker makes this easy. Your first step is running the classic{' '}
          <InlineHighlight>hello-world</InlineHighlight> container:
        </Paragraph>

        <CodeBlockWithCopy code={dockerRunExample} />

        <Paragraph>
          This command downloads an extremely small image from Docker Hub and runs it inside
          a container. If it prints a cheery welcome message, you're officially up and running.
        </Paragraph>

        <SectionHeading>Docker Fundamentals</SectionHeading>

        <Paragraph>
          Containers are built from <Strong>images</Strong>, which are constructed using a
          <Strong>Dockerfile</Strong>. Think of a Dockerfile as a set of instructions for
          assembling your application's runtime environment. Creating one is often the first
          “aha” moment because you see how predictable your environment can become.
        </Paragraph>

        <Paragraph>
          Here's a simple Dockerfile that runs a Node.js API:
        </Paragraph>

        <CodeBlockWithCopy code={simpleNodeDockerfile} />

        <Paragraph>
          Once built, you can run it anywhere - your laptop, a server, or inside Kubernetes.
          This is the magic of containers: consistency.
        </Paragraph>

        <SectionHeading>Building Dockerfiles Like a Pro</SectionHeading>

        <Paragraph>
          After the basics, things get much more interesting. You'll quickly discover
          multi-stage builds, which let you compile your code in one environment and run it
          in another. This dramatically reduces image sizes and improves security.
        </Paragraph>

        <Paragraph>
          Another essential optimisation technique is using a{' '}
          <InlineHighlight>.dockerignore</InlineHighlight> file. This tells Docker which files
          to skip copying into your image - keeping your builds fast and clean.
        </Paragraph>

        <Paragraph>
          These techniques help transform your Dockerfiles from “it works” to
          “production-ready”.
        </Paragraph>

        <SectionHeading>Docker Compose for Multi-Service Apps</SectionHeading>

        <Paragraph>
          Modern applications are rarely just one service. Even a simple project often has a
          frontend, backend, and a database. Managing all these containers manually would be
          a chore - which is why Docker Compose exists.
        </Paragraph>

        <Paragraph>
          Compose lets you describe all your services in a single YAML file so you can bring
          your entire application up with a single command:
        </Paragraph>

        <CodeBlockWithCopy code={dockerComposeExample} />

        <Paragraph>
          This makes local development significantly easier. You can spin up all services,
          automatically link them, and restart them individually as you code.
        </Paragraph>

        <SectionHeading>Docker Networking & Volumes Deep Dive</SectionHeading>

        <Paragraph>
          Once you get comfortable with Compose, you'll naturally start asking questions like:
          “how do these containers talk to each other?” and “how is my database data persisting?”
          This is where Docker's networking and volume system becomes important.
        </Paragraph>

        <Paragraph>
          Docker creates isolated networks so containers can communicate using simple DNS names.
          It also lets you persist data using volumes so your database doesn't reset every time
          the container restarts. This is often the moment where Docker really starts to feel
          like a professional tool rather than a toy.
        </Paragraph>

        <SectionHeading>Kubernetes Basics</SectionHeading>

        <Paragraph>
          Once your application grows or needs to run across multiple machines, a single Docker
          host isn't enough. That's when Kubernetes comes in. At its core, Kubernetes is an
          orchestrator - it decides where your containers should run, monitors them, restarts
          them if needed, and scales them based on demand.
        </Paragraph>

        <Paragraph>
          A Kubernetes application usually starts with a <Strong>Deployment</Strong> and a{' '}
          <Strong>Service</Strong>. Here's a minimal example:
        </Paragraph>

        <CodeBlockWithCopy code={kubernetesDeployment} />
        <CodeBlockWithCopy code={kubernetesService} />

        <Paragraph>
          These two manifests describe “run two copies of my app and expose it on a stable
          network address”. Kubernetes handles the rest.
        </Paragraph>

        <SectionHeading>Kubernetes Architecture Explained</SectionHeading>

        <Paragraph>
          Kubernetes can feel complicated until you see the architecture. A cluster has a
          <Strong>control plane</Strong> (API server, scheduler, etc.) and <Strong>worker
            nodes</Strong> (machines that run your containers). Once you see how these pieces fit
          together, everything becomes much more intuitive.
        </Paragraph>

        <Paragraph>
          This section is all about building that mental map so future concepts fall into place.
        </Paragraph>

        <SectionHeading>Hands-On with Minikube & kubectl</SectionHeading>

        <Paragraph>
          With the fundamentals covered, it's time to drive Kubernetes yourself. Minikube creates
          a small Kubernetes cluster on your machine. Using <InlineHighlight>kubectl</InlineHighlight>,
          the Kubernetes command-line tool, you'll deploy apps, inspect pods, check logs, and scale
          deployments up and down.
        </Paragraph>

        <Paragraph>
          This hands-on practice builds your confidence before touching cloud-managed clusters like EKS.
        </Paragraph>

        <SectionHeading>Advanced Kubernetes</SectionHeading>

        <Paragraph>
          Once you're comfortable with Deployments and Services, Kubernetes opens up an entire
          world of operational features: ConfigMaps for configuration, Secrets for sensitive data,
          Ingress for routing, and readines/liveness probes to ensure Kubernetes correctly monitors
          your applications.
        </Paragraph>

        <Paragraph>
          These features are what make Kubernetes production-grade. They help you design resilient,
          stable, and secure applications.
        </Paragraph>

        <SectionHeading>Kubernetes on the Cloud (EKS)</SectionHeading>

        <Paragraph>
          Running Kubernetes locally is great for learning, but the real power comes when deploying
          to a managed cloud service like AWS EKS. This removes the complexity of maintaining your
          own control plane and lets you focus purely on your application.
        </Paragraph>

        <Paragraph>
          You'll create an EKS cluster, push Docker images to ECR, and deploy your app using the
          same Kubernetes manifests from earlier - proving how portable Kubernetes really is.
        </Paragraph>

        <SectionHeading>CI/CD with GitHub Actions</SectionHeading>

        <Paragraph>
          Deploying your app manually works once or twice - but automation is the real goal. Using
          GitHub Actions, you'll build Docker images on every push, publish them to ECR, and then
          apply your Kubernetes manifests directly from the pipeline.
        </Paragraph>

        <Paragraph>
          This gives you a zero-click deployment workflow. Push code → ship to production.
        </Paragraph>

        <SectionHeading>Monitoring, Logging & Scaling</SectionHeading>

        <Paragraph>
          The final piece of the puzzle is understanding how your application behaves in production.
          You'll use Kubernetes' metrics server to autoscale pods, inspect logs using{' '}
          <InlineHighlight>kubectl logs</InlineHighlight>, and observe how Kubernetes responds to
          changing loads.
        </Paragraph>

        <Paragraph>
          This is where everything “clicks” and Kubernetes starts to feel like a real operational
          platform rather than a collection of YAML files.
        </Paragraph>

        <SectionHeading>Capstone Project - Bringing It All Together</SectionHeading>

        <Paragraph>
          The final project ties everything together by deploying a complete full-stack
          application to Kubernetes:
        </Paragraph>

        <Paragraph>
          <Strong>Frontend:</Strong> React (Vite) <br />
          <Strong>Backend:</Strong> Express or FastAPI <br />
          <Strong>Database:</Strong> Postgres <br />
          <Strong>CI/CD:</Strong> GitHub Actions <br />
          <Strong>Registry:</Strong> ECR <br />
          <Strong>Ingress:</Strong> NGINX with TLS <br />
          <Strong>Cluster:</Strong> AWS EKS
        </Paragraph>

        <Paragraph>
          By the end, you'll have deployed a real cloud-native application - the same way modern
          engineering teams do it every day.
        </Paragraph>

      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default DockerKubernetes;
