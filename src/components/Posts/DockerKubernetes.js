import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
import { CodeBlockWithCopy } from "../Code/Code";
import Carousel from "../Carousel/Carousel";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
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
  InlineHighlight,
  IndentedTextList,
  IndentedTextListItem,
} from "../Typography/Typography";

// icons
import { DockerSVG, KubernetesSVG } from "../../resources/styles/icons";

// images
import dockerCliPng from "../../resources/images/blog/DockerKubernetes/docker-cli.png";
import dockerDesktopPng from "../../resources/images/blog/DockerKubernetes/docker-desktop.png";
import alpineShellPng from "../../resources/images/blog/DockerKubernetes/alpine-shell.png";

const dockerDocs = "https://docs.docker.com/";
const dockerInstallation = "https://docs.docker.com/get-started/get-docker/";
const dockerWhatIsContainer = "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/";
const dockerDockerfileRef = "https://docs.docker.com/reference/dockerfile/";
const dockerBestPractices = "https://docs.docker.com/build/building/best-practices/";
const dockerComposeDocs = "https://docs.docker.com/compose/";
const dockerComposeFileRef = "https://docs.docker.com/reference/compose-file/";

const k8sDocs = "https://kubernetes.io/docs/home/";
const k8sOverview = "https://kubernetes.io/docs/concepts/overview/";
const k8sTools = "https://kubernetes.io/docs/tasks/tools/";
const k8sHelloMinikube = "https://kubernetes.io/docs/tutorials/hello-minikube/";
const k8sDeployments = "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/";
const k8sServices = "https://kubernetes.io/docs/concepts/services-networking/service/";
const k8sConfigMaps = "https://kubernetes.io/docs/concepts/configuration/configmap/";
const k8sSecrets = "https://kubernetes.io/docs/concepts/configuration/secret/";
const k8sDebug = "https://kubernetes.io/docs/tasks/debug/";

const playgroundRepo = "https://github.com/heyitsmeharv/docker-k8s-virtual-shell";

const verifyDocker = `docker version`;
const helloContainer = `docker run --rm -it alpine sh`;
const insideContainer = `# inside the container
ls

# What OS/users do I see in here?
cat /etc/os-release
whoami

# Am I on my host machine?
hostname

# What happens if I exit?
exit`;
const imageVsContainerQuickCheck = `docker images    # List images stored locally (your reusable "blueprints")
docker ps        # List running containers only (what's currently alive)
docker ps -a     # List all containers, including stopped/exited ones`;
const buildImage = `docker build -t virtual-shell-api:dev -f docker/Dockerfile .`;
const runImage = `docker run --rm -p 8080:8080 virtual-shell-api:dev`;

const composeUp = `docker compose -f compose/compose.yml up --build`;
const composeDown = `docker compose -f compose/compose.yml down`;

const verifyK8s = `kubectl version --client
kubectl cluster-info`;

const k8sApply = `kubectl apply -f k8s/
kubectl get pods
kubectl get svc`;

const k8sDebugLoop = `kubectl get pods
kubectl describe pod <pod>
kubectl logs <pod>
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get svc,endpoints`;

const playgroundTree = `docker-k8s-virtual-shell/
├─ app/
│  ├─ ui/                
│  └─ api/
├─ docker/
│  ├─ Dockerfile
│  └─ .dockerignore
├─ compose/
│  └─ compose.yml
├─ k8s/
│  ├─ api-deployment.yaml
│  ├─ api-service.yaml
│  ├─ ui-deployment.yaml
│  ├─ ui-service.yaml
│  ├─ configmap.yaml
│  └─ secret.yaml
└─ README.md`;

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const DockerKubernetes = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "introduction-to-docker-kubernetes" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
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
          This is a practical learning path built around one tiny project: a "virtual shell" playground - a small service that
          feels like a terminal you can poke at safely.
        </Paragraph>

        <Paragraph>
          Here is the companion repo if you'd rather dive into the code:{" "}
          <TextLink href={playgroundRepo} target="_blank" rel="noreferrer">
            <InlineHighlight>docker-k8s-virtual-shell</InlineHighlight>
          </TextLink>
        </Paragraph>

        <Paragraph>
          Before we dive into building anything let's go explore the fundamentals.
        </Paragraph>

        <SectionHeading>What is Docker?</SectionHeading>

        <Paragraph>
          Docker is a way to package and run software as <Strong>containers</Strong>. A container is an{" "}
          <Strong>isolated process</Strong> for one part of your app, with its own filesystem view and the exact dependencies it needs.
          That means your React UI, your API, and your database can each run in their own 'boxed' environments without fighting over
          versions.
        </Paragraph>

        <Paragraph>
          Containers are powerful because they're designed to be:
          <TextList>
            <TextListItem><Strong>self-contained</Strong> - everything required to run is in the container</TextListItem>
            <TextListItem><Strong>isolated</Strong> - minimal influence on your host and other containers</TextListItem>
            <TextListItem><Strong>independent</Strong> - remove one container without breaking the others</TextListItem>
            <TextListItem><Strong>portable</Strong> - the same container behaves consistently on your laptop, in CI, or in the cloud</TextListItem>
          </TextList>
        </Paragraph>

        <Paragraph>Let's now look to setup docker on your machine.</Paragraph>

        <SectionHeading>Install, Setup and Configure</SectionHeading>

        <SubSectionHeading>Set up Docker</SubSectionHeading>
        <Paragraph>
          Install Docker using the <TextLink
            href={dockerInstallation}
            target="_blank"
            rel="noreferrer"
          >
            official docs
          </TextLink>, then verify the CLI is available.
        </Paragraph>

        <Banner title="Warning" variant="warning">
          <Paragraph>Please note that I'll be running the docker commands in CMD and PowerShell - The commands won't work in other terminals.</Paragraph>
        </Banner>

        <CodeBlockWithCopy code={verifyDocker} />

        <Carousel
          items={[
            {
              title: "Docker CLI",
              description:
                "Quick sanity check: the CLI can talk to the Docker Engine. If you see both Client and Server, you're ready to run containers.",
              src: dockerCliPng,
              alt: "Terminal showing docker version output",
            },
            {
              title: "Docker Desktop GUI",
              description:
                "Visual confirmation: Docker Desktop is running and managing the local engine. Handy for seeing images, containers, and logs at a glance.",
              src: dockerDesktopPng,
              alt: "Docker Desktop showing the Docker engine running and containers/images list",
            },
          ]}
        />

        <SubSectionHeading>Meet the container</SubSectionHeading>
        <Paragraph>
          Before containerising anything, run an interactive container. As you will see the container is an isolated process with its own filesystem view.
        </Paragraph>

        <Paragraph>
          Run this to start a tiny Linux container and drop into a shell:
        </Paragraph>

        <CodeBlockWithCopy code={helloContainer} />

        <TertiaryHeading>Breaking down the command</TertiaryHeading>

        <TextList>
          <TextListItem>
            <InlineHighlight>docker run</InlineHighlight> - create a new container from an image and start it.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>alpine</InlineHighlight> - the image we're running (a tiny Linux distribution).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>sh</InlineHighlight> - the command to run <Strong>inside</Strong> the container (a shell).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>-i</InlineHighlight> - keep STDIN open so you can type into the container.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>-t</InlineHighlight> - allocate a pseudo-terminal so it behaves like a real interactive shell.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>--rm</InlineHighlight> - when the process exits, delete the container automatically.
          </TextListItem>
        </TextList>

        <Paragraph>After running the command What you should now see is a docker container up and running in the Docker GUI.</Paragraph>

        <Carousel
          items={[
            {
              title: "alpine sh",
              description: "A shell inside a container. This is the moment the container mental model clicks.",
              src: alpineShellPng,
              alt: "Alpine shell running inside a Docker container",
            },
          ]}
        />

        <Paragraph>
          Now let's explore what we're able to do <Strong>inside</Strong> the container. These commands are simple, but the output is the lesson:
        </Paragraph>

        <CodeBlockWithCopy code={insideContainer} />

        <Paragraph>
          What you're seeing: you've started a brand-new process with a minimal filesystem. It feels like a tiny machine because it has
          its own root directory and OS files, but it starts instantly because it's not booting a whole operating system.
        </Paragraph>

        <Paragraph>
          When you type <InlineHighlight>exit</InlineHighlight>, the container stops - and because we used{" "}
          <InlineHighlight>--rm</InlineHighlight>, Docker cleans it up automatically. That's the container lifecycle in one go:
          <Strong> run → interact → stop → disappear</Strong>.
        </Paragraph>

        <SubSectionHeading>Images vs Containers</SubSectionHeading>

        <Paragraph>
          When you typed <InlineHighlight>exit</InlineHighlight>, that shell stopped because the container stopped. That's the first big idea:
          containers are <Strong>temporary</Strong>. They're the running "instance" of something - not the thing itself.
        </Paragraph>

        <Paragraph>
          The "thing itself" is the <Strong>image</Strong>. If a container is a running process, an image is the{" "}
          <Strong>blueprint</Strong> of commands to run when it starts.
        </Paragraph>

        <Paragraph>
          So the relationship is simple:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Image</Strong> = what you <Strong>built</Strong> (a reusable snapshot you can ship)
          </TextListItem>
          <TextListItem>
            <Strong>Container</Strong> = what you <Strong>run</Strong> (a live instance created from an image)
          </TextListItem>
        </TextList>

        <Banner title="Quick Note" variant="info">
          <Paragraph>You'll need to have the alpine container running in a separate
            terminal before running these commands.</Paragraph>
        </Banner>

        <Paragraph>A quick test you can do that will help visualise the difference</Paragraph>

        <CodeBlockWithCopy code={imageVsContainerQuickCheck} />

        <Paragraph>
          Right now we've only been borrowing someone else's image (<InlineHighlight>alpine</InlineHighlight>). Next, we'll create our own:
          we'll write a <Strong>Dockerfile</Strong> so the virtual shell playground has a repeatable home we can build, run, delete, and rebuild anytime.
        </Paragraph>

        <SubSectionHeading>Give the playground a home (your first Dockerfile)</SubSectionHeading>
        <Paragraph>
          Now we give the playground a Dockerfile. The goal is a boring, readable build that produces a reliable image.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "docker/Dockerfile",
              description: "Start minimal. Make it readable before you make it clever.",
              code: `# TODO: Dockerfile here`,
            },
            {
              title: "docker/.dockerignore",
              description: "Keep builds fast and clean by excluding noise.",
              code: `# TODO: .dockerignore here`,
            },
          ]}
        />

        <TertiaryHeading>Build and run</TertiaryHeading>
        <CodeBlockWithCopy code={buildImage} />
        <CodeBlockWithCopy code={runImage} />

        <SubSectionHeading>Make it reachable (ports + env)</SubSectionHeading>
        <Paragraph>
          Publishing ports is the bridge between the container's world and your machine.
          Environment variables keep configuration out of the image.
        </Paragraph>

        <SubSectionHeading>Make it remember (volumes + bind mounts)</SubSectionHeading>
        <Paragraph>
          Bind mounts make the dev loop fast. Volumes keep data alive across container lifecycles.
        </Paragraph>

        <SubSectionHeading>Make it a system (multi-container + Compose)</SubSectionHeading>
        <Paragraph>
          A real app is rarely one container. Compose becomes the "system definition" - services, networking, ports, environment -
          and a single command to run the whole playground.
        </Paragraph>
        <CodeBlockWithCopy code={composeUp} />
        <CodeBlockWithCopy code={composeDown} />

        <Carousel
          items={[
            {
              title: "compose/compose.yml",
              description: "Your local system contract: services + wiring in one place.",
              code: `# TODO: compose.yml here`,
            },
          ]}
        />

        <SubSectionHeading>Make it shippable (best practices)</SubSectionHeading>
        <Paragraph>
          Once it works, we tidy it: smaller builds, fewer surprises, and (optionally) multi-stage builds.
        </Paragraph>

        <SubSectionHeading>Docker wrap-up</SubSectionHeading>
        <Paragraph>
          Docker is now "done": you can rebuild the playground, run it as a container, run it as a system with Compose,
          and ship the image anywhere.
        </Paragraph>

        <SectionHeading>Kubernetes (managing containerized workloads)</SectionHeading>

        <SubSectionHeading>Why Kubernetes exists</SubSectionHeading>
        <Paragraph>
          Kubernetes doesn't replace Docker fundamentals - it builds on them. You still ship images.
          Kubernetes manages running them declaratively: scheduling, desired state, and stable networking.
        </Paragraph>

        <SubSectionHeading>Set up a local cluster + kubectl</SubSectionHeading>
        <Paragraph>Install the tools and verify cluster access.</Paragraph>
        <CodeBlockWithCopy code={verifyK8s} />

        <SubSectionHeading>Deploy the playground (Deployment)</SubSectionHeading>
        <Paragraph>
          We describe the playground as a Deployment and let Kubernetes converge reality to match.
        </Paragraph>
        <Carousel
          items={[
            {
              title: "k8s/deployment.yaml",
              description: "The playground, declared as desired state.",
              code: `# TODO: deployment.yaml here`,
            },
          ]}
        />

        <SubSectionHeading>Expose the playground (Service)</SubSectionHeading>
        <Paragraph>
          Pods come and go - Services provide stable access.
        </Paragraph>
        <Carousel
          items={[
            {
              title: "k8s/service.yaml",
              description: "Stable access to a moving set of Pods.",
              code: `# TODO: service.yaml here`,
            },
          ]}
        />

        <TertiaryHeading>Apply and observe</TertiaryHeading>
        <CodeBlockWithCopy code={k8sApply} />

        <SubSectionHeading>Configure it properly (ConfigMaps + Secrets)</SubSectionHeading>
        <Paragraph>
          Keep configuration out of images. Use ConfigMaps for non-sensitive config and Secrets for sensitive values.
        </Paragraph>

        <Carousel
          items={[
            { title: "k8s/configmap.yaml", description: "Non-sensitive configuration.", code: `# TODO` },
            { title: "k8s/secret.yaml", description: "Sensitive configuration.", code: `# TODO` },
          ]}
        />

        <SubSectionHeading>The debugging loop</SubSectionHeading>
        <Paragraph>
          Kubernetes becomes manageable when you have a repeatable loop: inspect resources, describe failures, read logs, and check events.
        </Paragraph>
        <CodeBlockWithCopy code={k8sDebugLoop} />

        <SectionHeading>References (official docs)</SectionHeading>

        <TextList>
          <TextListItem><TextLink href={dockerDocs} target="_blank" rel="noreferrer">Docker Docs</TextLink></TextListItem>
          <TextListItem><TextLink href={k8sDocs} target="_blank" rel="noreferrer">Kubernetes Docs</TextLink></TextListItem>
        </TextList>

        <SubSectionHeading>Repo layout</SubSectionHeading>
        <CodeBlockWithCopy code={playgroundTree} />
      </PostContainer>
    </PageWrapper>
  );
};

export default DockerKubernetes;
